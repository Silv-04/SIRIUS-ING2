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

    
    /** 
     * @param customer : given a customer
     * @return int : return the customer id and save the customer in the database
     */
    public int saveCustomer(Customer customer) {
        Customer savedCustomer = customerRepository.save(customer);
        return savedCustomer.getCustomer_id();
    }
    
    
    /** 
     * @return List<Customer> : return all customers
     */
    public List<Customer> findAllCustomers() {
        return customerRepository.findAll();
    }

    
    /** 
     * @param page : given a page number
     * @param size : given a number of customers per page
     * @return Page<Customer> : return a page of customers
     */
    public Page<Customer> findCustomers(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return customerRepository.findAll(pageable);
    }

    
    /** 
     * @param id : given a customer id
     * @return Customer : return a customer
     */
    public Customer findByIdCustomer(Integer id) {
        Optional<Customer> customer = customerRepository.findById(id);
        return customer.orElse(null);
    }

    
    /** 
     * @param id : given a customer id
     * @return boolean : return true if the customer has been deleted, false otherwise
     */
    public boolean deleteCustomer(Integer id) {
        Optional<Customer> customer = customerRepository.findById(id);
        if (customer.isPresent()) {
            customerRepository.delete(customer.get());
            return true;
        }
        return false;
    }
}
