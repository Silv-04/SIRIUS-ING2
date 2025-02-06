package upec.episen.sirius.episaine_back.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import upec.episen.sirius.episaine_back.models.Information;
import upec.episen.sirius.episaine_back.services.InformationService;

@CrossOrigin
@RestController
@RequestMapping("/customer")
public class CustomerController {

    private final InformationService informationService;

    public CustomerController(InformationService informationService) {
        this.informationService = informationService;
    }

    @GetMapping("/informations")
    public List<Information> getAllInformations() {
        return informationService.getAllInformations();
    }
}
