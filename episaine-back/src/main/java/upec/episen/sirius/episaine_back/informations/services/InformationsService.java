package upec.episen.sirius.episaine_back.informations.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import upec.episen.sirius.episaine_back.informations.models.Informations;
import upec.episen.sirius.episaine_back.informations.repositories.InformationsRepository;

@Service
public class InformationsService {

    @Autowired
    private InformationsRepository informationsRepository;

    public Informations saveInformations(Informations informations) {
        return informationsRepository.save(informations); 
    }
    
    public List<Informations> findAllInformations() {
        return informationsRepository.findAll();
    }

    public Page<Informations> findInformations(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return informationsRepository.findAll(pageable);
    }

    public Informations findByIdCustomer(Integer id) {
        Optional<Informations> informations = informationsRepository.findByCustomerId(id);
        return informations.orElse(null);
    }

    public boolean deleteInformations(Integer id) {
        Optional<Informations> informations = informationsRepository.findById(id);
        if (informations.isPresent()) {
            informationsRepository.delete(informations.get());
            return true;
        }
        return false;
    }

    public boolean updateInformations(Informations informations) {
        Optional<Informations> informationsOptional = informationsRepository.findById(informations.getInformation_id());
        if (informationsOptional.isPresent()) {
            informationsRepository.save(informations);
            return true;
        }
        return false;
    }
}
