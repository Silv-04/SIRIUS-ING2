package upec.episen.sirius.episaine_back.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import upec.episen.sirius.episaine_back.models.CustomerProgress;

public interface CustomerProgressRepository extends JpaRepository<CustomerProgress, Integer> {
    @Query(value="SELECT p FROM CustomerProgress p WHERE p.customer.customer_id = :customerId")
    Optional<CustomerProgress> findByCustomerCustomerId(@Param("customerId") Integer customerId);
}