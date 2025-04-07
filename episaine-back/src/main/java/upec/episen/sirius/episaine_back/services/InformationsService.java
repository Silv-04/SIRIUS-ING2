package upec.episen.sirius.episaine_back.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import upec.episen.sirius.episaine_back.models.Informations;
import upec.episen.sirius.episaine_back.repositories.InformationsRepository;

@Service
public class InformationsService {

    @Autowired
    private InformationsRepository informationsRepository;

    /**
     * @param informations : given informations
     * @return Informations : return the informations and save the informations in the database
     */
    public Informations saveInformations(Informations informations) {
        return informationsRepository.save(informations); 
    }

    /** 
     * @return List<Informations> : return all informations
     */
    public List<Informations> findAllInformations() {
        return informationsRepository.findAll();
    }

    
    /** 
     * @param page : given a page number
     * @param size : given a number of informations per page
     * @return Page<Informations> : return a page of informations
     */
    public Page<Informations> findInformations(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return informationsRepository.findAll(pageable);
    }

    /** 
     * @param id : given a customer id
     * @return Informations : return his informations
     */
    public Informations findByIdCustomer(Integer id) {
        Optional<Informations> informations = informationsRepository.findByCustomerId(id);
        return informations.orElse(null);
    }

    /** 
     * @param id : given an information id
     * @return boolean : return true if the informations have been deleted
     */
    public boolean deleteInformations(Integer id) {
        Optional<Informations> informations = informationsRepository.findById(id);
        if (informations.isPresent()) {
            informationsRepository.delete(informations.get());
            return true;
        }
        return false;
    }

    /** 
     * @param informations : given informations
     * @return boolean : return true if the informations have been updated
     */
    public boolean updateInformations(Informations informations) {
        Optional<Informations> informationsOptional = informationsRepository.findById(informations.getInformation_id());
        if (informationsOptional.isPresent()) {
            informationsRepository.save(informations);
            return true;
        }
        return false;
    }
}