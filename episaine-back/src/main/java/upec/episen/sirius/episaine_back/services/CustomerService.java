package upec.episen.sirius.episaine_back.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import upec.episen.sirius.episaine_back.models.Customer;
import upec.episen.sirius.episaine_back.repositories.CustomerRepository;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public int saveCustomer(Customer customer) {
        Customer savedCustomer = customerRepository.save(customer);
        return savedCustomer.getCustomer_id(); 
    }
    
    public List<Customer> findAllCustomers() {
        return customerRepository.findAll();
    }

    public Page<Customer> findCustomers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return customerRepository.findAll(pageable);
    }

    public Customer findByIdCustomer(Integer id) {
        Optional<Customer> customer = customerRepository.findById(id);
        return customer.orElse(null);
    }

    public boolean deleteCustomer(Integer id) {
        Optional<Customer> customer = customerRepository.findById(id);
        if (customer.isPresent()) {
            customerRepository.delete(customer.get());
            return true;
        }
        return false;
    }
}
