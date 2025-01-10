package upec.episen.sirius.episaine_back.informations.controllers;

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

import upec.episen.sirius.episaine_back.informations.models.Informations;
import upec.episen.sirius.episaine_back.informations.services.InformationsService;

@CrossOrigin
@RestController
@RequestMapping("/informations")
public class InformationsController {

    @Autowired
    private InformationsService informationsService;

    @PostMapping("/add")
    public String addInformations(@RequestBody Informations informations) { 
        informationsService.saveInformations(informations);
        return "Informations added successfully";
    }

    @GetMapping("/get/all")
    public List<Informations> getAllInformations() {
        return informationsService.findAllInformations();
    }

    @GetMapping("/get")
    public Page<Informations> getPage(
        @RequestParam int page,
        @RequestParam int size) {
        return informationsService.findInformations(page, size);
    }

    @GetMapping("/get/{id}")
    public Informations getInformationsByCustomerId(@PathVariable Integer id) {
        return informationsService.findByIdCustomer(id);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteInformations(@PathVariable Integer id) {
        boolean isRemoved = informationsService.deleteInformations(id);
        if (isRemoved) {
            return "Informations deleted successfully";
        }
        return "Informations not found";
    }

    @PostMapping("/update")
    public String updateInformations(@RequestBody Informations informations) {
        boolean isUpdated = informationsService.updateInformations(informations);
        if (isUpdated) {
            return "Informations updated successfully";
        }
        return "Informations not found";
    }
}
