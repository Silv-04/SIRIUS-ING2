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

    @PostMapping("/add")
    public String addCustomer(@RequestBody Customer customer) {
        customerService.saveCustomer(customer);
        return "Customer added successfully";
    }

    @GetMapping("/get/{id}")
    public Customer getCustomerById(@PathVariable Integer id) {
        return customerService.findByIdCustomer(id);
    }

    @GetMapping("/get/all")
    public List<Customer> getAllCustomers() {
        return customerService.findAllCustomers();
    }

    @GetMapping("/get")
    @OrderBy
    public Page<Customer> getPage(
        @RequestParam int page,
        @RequestParam int size) {
        return customerService.findCustomers(page, size);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteCustomer(@PathVariable Integer id) {
        boolean isRemoved = customerService.deleteCustomer(id);
        if (isRemoved) {
            return "Customer deleted successfully";
        }
        return "Customer not found";
    }

    @PostMapping("/update")
    public String updateCustomer(@RequestBody Customer customer) {
        boolean isUpdated = customerService.updateCustomer(customer);
        if (isUpdated) {
            return "Customer updated successfully";
        }
        return "Customer not found";
    }
}
