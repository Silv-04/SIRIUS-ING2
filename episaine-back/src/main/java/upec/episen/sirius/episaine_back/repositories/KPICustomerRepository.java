package upec.episen.sirius.episaine_back.repositories;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import upec.episen.sirius.episaine_back.models.KPICustomer;
import java.util.List;

@Repository
public interface KPICustomerRepository extends JpaRepository<KPICustomer, Long> {

    // Count the number of women
    @Query("SELECT COUNT(c) FROM KPICustomer c WHERE c.gender = 'Female'")
    long countByGenderFemale();

    // Count the number of men
    @Query("SELECT COUNT(c) FROM KPICustomer c WHERE c.gender = 'Male'")
    long countByGenderMale();

    // Count the total number of customers
    @Query("SELECT COUNT(c) FROM KPICustomer c")
    long countTotalCustomers();

    // for age distribution
    @Query(value = "SELECT " +
            "CASE " +
            "    WHEN EXTRACT(YEAR FROM AGE(current_date, customer_birthdate)) BETWEEN 18 AND 25 THEN '18-25' " +
            "    WHEN EXTRACT(YEAR FROM AGE(current_date, customer_birthdate)) BETWEEN 26 AND 35 THEN '26-35' " +
            "    WHEN EXTRACT(YEAR FROM AGE(current_date, customer_birthdate)) BETWEEN 36 AND 45 THEN '36-45' " +
            "    WHEN EXTRACT(YEAR FROM AGE(current_date, customer_birthdate)) BETWEEN 46 AND 55 THEN '46-55' " +
            "    WHEN EXTRACT(YEAR FROM AGE(current_date, customer_birthdate)) BETWEEN 56 AND 64 THEN '56-64' " +
            "    ELSE '+65' " +
            "END AS age_group, " +
            "COUNT(*) AS count " +
            "FROM customer " +
            "WHERE customer_birthdate IS NOT NULL " +
            "GROUP BY age_group", nativeQuery = true)
    List<Object[]> getAgeDistribution();

    // Monthly distribution by gender
    @Query(value = "SELECT " +
            "TO_CHAR(date_creation, 'YYYY-MM') AS month, " +
            "gender, " +
            "COUNT(*) AS count " +
            "FROM customer " +
            "GROUP BY month, gender " +
            "ORDER BY month, gender", nativeQuery = true)
    List<Object[]> getMonthlyDistribution();
}
