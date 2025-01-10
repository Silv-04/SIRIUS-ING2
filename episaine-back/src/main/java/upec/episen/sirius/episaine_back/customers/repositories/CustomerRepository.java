package upec.episen.sirius.episaine_back.customers.repositories;

import upec.episen.sirius.episaine_back.customers.models.Customer;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
    
}
