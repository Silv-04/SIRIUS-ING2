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

import upec.episen.sirius.episaine_back.models.Informations;
import upec.episen.sirius.episaine_back.services.InformationsService;

@CrossOrigin
@RestController
@RequestMapping("/informations")
public class InformationsController {

    @Autowired
    private InformationsService informationsService;

    
    /** 
     * @param informations : given informations
     * @return String : return a log message
     */
    @PostMapping("/add")
    public String addInformations(@RequestBody Informations informations) { 
        informationsService.saveInformations(informations);
        return "Informations added successfully";
    }

    
    /** 
     * @return List<Informations> : return all informations from the database
     */
    @GetMapping("/get/all")
    public List<Informations> getAllInformations() {
        return informationsService.findAllInformations();
    }

    
    /** 
     * @param page : given a page
     * @param size : given a size
     * @return Page<Informations> : return a page of informations
     */
    @GetMapping("/get")
    public Page<Informations> getPage(
        @RequestParam int page,
        @RequestParam int size) {
        return informationsService.findInformations(page, size);
    }

    
    
    /** 
     * @param id : given an id
     * @return Informations : return the informations from the given id
     */
    @GetMapping("/get/{id}")
    public Informations getInformationsByCustomerId(@PathVariable Integer id) {
        return informationsService.findByIdCustomer(id);
    }

    
    /** 
     * @param id : given an id
     * @return String : return a log message whether the informations is deleted or not
     */
    @DeleteMapping("/delete/{id}")
    public String deleteInformations(@PathVariable Integer id) {
        boolean isRemoved = informationsService.deleteInformations(id);
        if (isRemoved) {
            return "Informations deleted successfully";
        }
        return "Informations not found";
    }

    
    
    /** 
     * @param informations : given informations
     * @return String : return a log message whether the informations is updated or not
     */
    @PostMapping("/update")
    public String updateInformations(@RequestBody Informations informations) {
        boolean isUpdated = informationsService.updateInformations(informations);
        if (isUpdated) {
            return "Informations updated successfully";
        }
        return "Informations not found";
    }
}
