package upec.episen.sirius.episaine_back.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import upec.episen.sirius.episaine_back.models.KPICustomer;

import java.util.List;

@Repository
public interface KPICustomerRepository extends JpaRepository<KPICustomer, Long> {

    // Compter le nombre de femmes
    @Query("SELECT COUNT(c) FROM KPICustomer c WHERE c.gender = 'Female'")
    long countByGenderFemale();

    // Compter le nombre d'hommes
    @Query("SELECT COUNT(c) FROM KPICustomer c WHERE c.gender = 'Male'")
    long countByGenderMale();

    // Compter le nombre total de clients
    @Query("SELECT COUNT(c) FROM KPICustomer c")
    long countTotalCustomers();

    // Requête native SQL pour la répartition par âge
    @Query(value = "SELECT " +
            "CASE " +
            "    WHEN EXTRACT(YEAR FROM AGE(current_date, customer_birthdate)) BETWEEN 18 AND 25 THEN '18-25' " +
            "    WHEN EXTRACT(YEAR FROM AGE(current_date, customer_birthdate)) BETWEEN 26 AND 35 THEN '26-35' " +
            "    WHEN EXTRACT(YEAR FROM AGE(current_date, customer_birthdate)) BETWEEN 36 AND 45 THEN '36-45' " +
            "    WHEN EXTRACT(YEAR FROM AGE(current_date, customer_birthdate)) BETWEEN 46 AND 55 THEN '46-55' " +
            "    WHEN EXTRACT(YEAR FROM AGE(current_date, customer_birthdate)) >= 56 THEN '56+' " +
            "END AS age_group, " +
            "COUNT(*) AS count " +
            "FROM customer " +
            "GROUP BY age_group", nativeQuery = true)
    List<Object[]> getAgeDistribution();

    // Requête pour compter les clients par genre
    long countByGender(String gender);
}
