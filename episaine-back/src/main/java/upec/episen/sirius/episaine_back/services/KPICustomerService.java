package upec.episen.sirius.episaine_back.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import upec.episen.sirius.episaine_back.repositories.KPICustomerRepository;

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



}