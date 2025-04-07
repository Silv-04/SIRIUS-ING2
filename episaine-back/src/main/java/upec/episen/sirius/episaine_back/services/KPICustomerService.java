package upec.episen.sirius.episaine_back.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.commons.math3.ml.clustering.CentroidCluster;

import upec.episen.sirius.episaine_back.repositories.KPICustomerRepository;

import org.apache.commons.math3.ml.clustering.DoublePoint;
import org.apache.commons.math3.ml.clustering.KMeansPlusPlusClusterer;

import org.apache.commons.math3.linear.*;

import java.util.*;

/**
 * Service to provide key indicators (KPIs) on customers.
 *
 * Combines counting and demographic analysis operations.
 * */

@Service
public class KPICustomerService {

    @Autowired
    private KPICustomerRepository kpiCustomerRepository;

    /**
     * Count the number of female customers.
     *
     * @return the number of women
     */

    public long getFemaleCount() {
        return kpiCustomerRepository.countByGenderFemale();
    }

    /**
     * Count the number of customers (male).
     *
     * @return the number of men
     */

    public long getMaleCount() {
        return kpiCustomerRepository.countByGenderMale();
    }

    /**
     * Counts the total number of registered customers.
     *
     * @return the total number of customers
     */

    public long getTotalCount() {
        return kpiCustomerRepository.countTotalCustomers();
    }

    /**
     * Retrieves the number of customers by gender:
     * Women, Men and Total.
     *
     * @return a map with the keys "Females", "Males" and "Total"
     */
    public Map<String, Long> getGenderCounts() {
        Map<String, Long> genderCounts = new HashMap<>();
        genderCounts.put("Females", getFemaleCount());
        genderCounts.put("Males", getMaleCount());
        genderCounts.put("Total", getTotalCount());
        return genderCounts;
    }

    /**
     * Calculates the distribution of customers according to age groups.
     *
     * @return a map containing each age group as a key and the number of customers as a value
     */

    public Map<String, Long> getAgeDistribution() {
        List<Object[]> results = kpiCustomerRepository.getStatsByAgeGroup();
        Map<String, Long> ageDistribution = new HashMap<>();
        for (Object[] result : results) {
            String ageGroup = (String) result[0];
            Long count = ((Number) result[1]).longValue();
            ageDistribution.put(ageGroup, count);
        }
        return ageDistribution;
    }

    /**
     * Calculates the monthly distribution of customers by gender.
     *
     * @return a list of maps containing the month, genre and number of registrations
     */

    public List<Map<String, Object>> getMonthlyDistribution() {

        /**
         *
         * Get the last 6 months in "YYYY-MM" format
         *
         * */

        List<String> last6Months = new ArrayList<>();
        Calendar cal = Calendar.getInstance();

        for (int i = 0; i < 6; i++) {
            String month = String.format("%d-%02d", cal.get(Calendar.YEAR), cal.get(Calendar.MONTH) + 1);
            last6Months.add(month);
            cal.add(Calendar.MONTH, -1);
        }

        /**
         *
         * Retrieve all results
         *
         * */

        List<Object[]> results = kpiCustomerRepository.getStatsByAgeGroup();

        /**
         *
         * Filter to keep only recent months
         *
         * */

        return results.stream()
                .filter(result -> last6Months.contains(result[0]))
                .map(result -> {
                    Map<String, Object> data = new HashMap<>();
                    data.put("month", result[0]);
                    data.put("gender", result[1]);
                    data.put("count", ((Number) result[2]).longValue());
                    return data;
                })
                .toList();
    }

    public List<Map<String, Object>> getStatsByAgeGroup() {
        List<Object[]> rawStats = kpiCustomerRepository.getStatsByAgeGroup();
        List<Map<String, Object>> stats = new ArrayList<>();

        for (Object[] row : rawStats) {
            String ageGroup = (String) row[0];
            double avgWeight = row[1] != null ? ((Number) row[1]).doubleValue() : 0;
            double avgHeight = row[2] != null ? ((Number) row[2]).doubleValue() : 0;

            double imc = 0;
            if (avgHeight > 0) {
                imc = avgWeight / Math.pow(avgHeight / 100.0, 2);
            }

            Map<String, Object> stat = new HashMap<>();
            stat.put("ageGroup", ageGroup);
            stat.put("averageWeight", avgWeight);
            stat.put("averageHeight", avgHeight);
            stat.put("imc", imc);

            stats.add(stat);
        }

        return stats;
    }

    /**
     * Effectuer l'ACM sur toutes les tranches d'âge et les données calculées (IMC, poids, taille).
     * @return les résultats de l'ACM sous forme de liste.
     */

    public List<Map<String, Object>> getAcmResults() {
        List<Map<String, Object>> stats = getStatsByAgeGroup();

        double[][] matrixData = new double[stats.size()][3];
        for (int i = 0; i < stats.size(); i++) {
            Map<String, Object> stat = stats.get(i);
            matrixData[i][0] = ((Number) stat.get("imc")).doubleValue();
            matrixData[i][1] = ((Number) stat.get("averageWeight")).doubleValue();
            matrixData[i][2] = ((Number) stat.get("averageHeight")).doubleValue();
        }

        RealMatrix matrix = new Array2DRowRealMatrix(matrixData);
        SingularValueDecomposition svd = new SingularValueDecomposition(matrix);
        RealMatrix U = svd.getU();
        RealMatrix V = svd.getV();

        List<Map<String, Object>> acmResults = new ArrayList<>();

        for (int i = 0; i < U.getRowDimension(); i++) {
            Map<String, Object> row = new HashMap<>();
            row.put("ageGroup", stats.get(i).get("ageGroup"));
            row.put("U", U.getRow(i));
            acmResults.add(row);
        }

        Map<String, Object> vData = new HashMap<>();
        double[][] vMatrixData = V.getData();
        vData.put("V", vMatrixData);
        acmResults.add(vData);

        return acmResults;
    }

    /**
     * Perform FCM (Fuzzy C-Means) on BMI, Weight and Height data.
     * @return FCM results in list form.
     */

    public List<Map<String, Object>> getFcmResults() {
        /**
         * Retrieve statistics containing average weight and height per age group
         */
        List<Map<String, Object>> stats = getStatsByAgeGroup();
        List<DoublePoint> points = new ArrayList<>();

        /**
         * Convert each valid weight/height pair into a DoublePoint for clustering
         */
        for (Map<String, Object> stat : stats) {
            Object weightObj = stat.get("averageWeight");
            Object heightObj = stat.get("averageHeight");

            /**
             * Only process if both values are numeric
             */

            if (weightObj instanceof Number && heightObj instanceof Number) {
                double avgWeight = ((Number) weightObj).doubleValue();
                double avgHeight = ((Number) heightObj).doubleValue();

                /**
                 * Create a 2D point [weight, height] and add it to the list
                 */
                points.add(new DoublePoint(new double[]{avgWeight, avgHeight}));
            }
        }
        /**
         * Return an empty result if no valid points were found
         */
        if (points.isEmpty()) {
            return Collections.emptyList();
        }

        /**
         * Initialize the KMeans++ clusterer with 3 clusters and 1000 maximum iterations
         */

        KMeansPlusPlusClusterer<DoublePoint> clusterer = new KMeansPlusPlusClusterer<>(3, 1000);

        /**
         *  Perform the clustering algorithm on the list of data points
         */

        List<CentroidCluster<DoublePoint>> clusters = clusterer.cluster(points);


        List<Map<String, Object>> fcmResults = new ArrayList<>();
        int clusterId = 1;

        /**
         * Iterate over each cluster to extract cluster center and assigned points
         */

        for (CentroidCluster<DoublePoint> cluster : clusters) {
            Map<String, Object> clusterData = new HashMap<>();
            clusterData.put("clusterId", clusterId++);
            clusterData.put("center", cluster.getCenter().getPoint());

            /**
             * Extract the coordinates of all points belonging to this cluster
             */

            List<double[]> clusterPoints = cluster.getPoints().stream()
                    .map(DoublePoint::getPoint)
                    .toList();
            clusterData.put("points", clusterPoints);

            fcmResults.add(clusterData);
        }

        /**
         * Return the list of clusters with their IDs, centers, and data points
         */

        return fcmResults;
    }
}