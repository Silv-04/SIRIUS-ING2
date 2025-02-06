package upec.episen.sirius.episaine_back.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import upec.episen.sirius.episaine_back.models.Information;
import upec.episen.sirius.episaine_back.repositories.InformationRepository;

import java.util.List;

@Service
public class InformationService {
    @Autowired
    private InformationRepository informationRepository;

    public List<Information> getAllInformations() {
        return informationRepository.findAll();
    }
}
