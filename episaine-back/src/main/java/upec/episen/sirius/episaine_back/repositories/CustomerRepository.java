package upec.episen.sirius.episaine_back.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import upec.episen.sirius.episaine_back.models.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    
}
