package upec.episen.sirius.episaine_back.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.persistence.OrderBy;
import upec.episen.sirius.episaine_back.models.Customer;
import upec.episen.sirius.episaine_back.services.CustomerService;

@CrossOrigin
@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    
    /** 
     * @param customer : given a customer
     * @return int : return the id of the customer
     */
    @PostMapping("/add")
    public int addCustomer(@RequestBody Customer customer) {
        return customerService.saveCustomer(customer);
    }

    
    /** 
     * @param id given an id
     * @return Customer return the customer with the given id
     */
    @GetMapping("/get/{id}")
    public Customer getCustomerById(@PathVariable Integer id) {
        return customerService.findByIdCustomer(id);
    }

    
    /** 
     * @return List<Customer> return all customers
     */
    @GetMapping("/get/all")
    public List<Customer> getAllCustomers() {
        return customerService.findAllCustomers();
    }

    
    /** 
     * @param page : given a page
     * @param size : given a size
     * @return Page<Customer> : return a page of customers with the given page and size
     */
    @GetMapping("/get")
    @OrderBy
    public Page<Customer> getPage(
        @RequestParam int page,
        @RequestParam int size) {
        return customerService.findCustomers(page, size);
    }

    
    
    /** 
     * @param id : given an id
     * @return String : return a log message whether the customer is deleted or not
     */
    @DeleteMapping("/delete/{id}")
    public String deleteCustomer(@PathVariable Integer id) {
        boolean isRemoved = customerService.deleteCustomer(id);
        if (isRemoved) {
            return "Customer deleted successfully";
        }
        return "Customer not found";
    }


}