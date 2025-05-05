package upec.episen.sirius.episaine_back.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import upec.episen.sirius.episaine_back.dto.CustomerProgressDTO;
import upec.episen.sirius.episaine_back.models.CustomerProgress;
import upec.episen.sirius.episaine_back.services.CustomerProgressService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@CrossOrigin
@RestController
@RequestMapping("/customerProgress")
public class CustomerProgressController {
    
    @Autowired
    private CustomerProgressService customerProgressService;

    
    /** 
     * @param customerProgressDTO
     * @return int return the id of the customer's progress
     */
    @PostMapping("/add")
    public int addCustomerProgress(@RequestBody CustomerProgressDTO customerProgressDTO) {
        return customerProgressService.saveCustomerProgress(customerProgressDTO);
    }
    
    
    /** 
     * @param id given an id
     * @return CustomerProgress return the customer's progress
     */
    @GetMapping("/get/{id}")
    public CustomerProgress getCustomerProgressById(@PathVariable Integer id) {
        return customerProgressService.findByIdCustomerProgress(id);
    }

    
    /** 
     * @param customerProgressDTO
     * @return String
     */
    @PostMapping("/update")
    public String updateCustomerProgress(@RequestBody CustomerProgressDTO customerProgressDTO) {
        boolean updated = customerProgressService.updateCustomerProgress(customerProgressDTO);
        if (updated) {
            return "Customer progress updated successfully";
        } else {
            return "Customer progress not found";
        }
    }
}
