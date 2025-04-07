package upec.episen.sirius.episaine_back.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import upec.episen.sirius.episaine_back.models.KPICustomer;
import java.util.List;

/**
 * Repository interface for accessing KPI-related customer data.
 * Provides methods to retrieve gender statistics, age group averages, and
 * monthly distribution of customer creation, all used for analytical purposes.
 */
@Repository
public interface KPICustomerRepository extends JpaRepository<KPICustomer, Long> {

    /**
     * Counts the number of customers who identify as female.
     *
     * @return the total number of female customers
     */

    @Query("SELECT COUNT(c) FROM KPICustomer c WHERE c.gender = 'Female'")
    long countByGenderFemale();

    /**
     * Counts the number of customers who identify as male.
     *
     * @return the total number of male customers
     */

    @Query("SELECT COUNT(c) FROM KPICustomer c WHERE c.gender = 'Male'")
    long countByGenderMale();

    /**
     * Counts the total number of customers in the database.
     *
     * @return the total number of customers
     */

    @Query("SELECT COUNT(c) FROM KPICustomer c")
    long countTotalCustomers();

    /**
     * Retrieves average weight and height statistics grouped by predefined age groups.
     * @return a list of objects where each object represents:
     *         [ageGroup (String), avgWeight (Double), avgHeight (Double)]
     */
    @Query(value = "SELECT " +
            "CASE " +
            "    WHEN EXTRACT(YEAR FROM AGE(current_date, c.customer_birthdate)) BETWEEN 18 AND 25 THEN '18-25' " +
            "    WHEN EXTRACT(YEAR FROM AGE(current_date, c.customer_birthdate)) BETWEEN 26 AND 35 THEN '26-35' " +
            "    WHEN EXTRACT(YEAR FROM AGE(current_date, c.customer_birthdate)) BETWEEN 36 AND 45 THEN '36-45' " +
            "    WHEN EXTRACT(YEAR FROM AGE(current_date, c.customer_birthdate)) BETWEEN 46 AND 55 THEN '46-55' " +
            "    WHEN EXTRACT(YEAR FROM AGE(current_date, c.customer_birthdate)) BETWEEN 56 AND 64 THEN '56-64' " +
            "    ELSE '+65' " +
            "END AS age_group, " +
            "AVG(i.weight) AS avg_weight, " +
            "AVG(i.height) AS avg_height " +
            "FROM customer c " +
            "JOIN informations i ON i.fk_customer_id = c.customer_id " +
            "WHERE c.customer_birthdate IS NOT NULL " +
            "AND i.weight IS NOT NULL AND i.height IS NOT NULL " +
            "GROUP BY age_group", nativeQuery = true)
    List<Object[]> getStatsByAgeGroup();

    /**
     * Retrieves the monthly distribution of customer registrations grouped by gender.
     *
     * @return a list of objects where each object represents:
     *         [month (String, format 'YYYY-MM'), gender (String), count (Long)]
     */
    @Query(value = "SELECT " +
            "TO_CHAR(date_creation, 'YYYY-MM') AS month, " +
            "gender, " +
            "COUNT(*) AS count " +
            "FROM customer " +
            "GROUP BY month, gender " +
            "ORDER BY month, gender", nativeQuery = true)
    List<Object[]> getMonthlyDistribution();
}
