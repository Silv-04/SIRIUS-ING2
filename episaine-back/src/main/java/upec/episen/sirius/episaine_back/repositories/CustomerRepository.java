package upec.episen.sirius.episaine_back.repositories;

import upec.episen.sirius.episaine_back.models.Customer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    
}
