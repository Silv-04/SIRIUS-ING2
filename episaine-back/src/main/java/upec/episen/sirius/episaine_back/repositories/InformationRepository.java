package upec.episen.sirius.episaine_back.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import upec.episen.sirius.episaine_back.models.Information;
import java.util.List;

@Repository
public interface InformationRepository extends JpaRepository<Information, Integer> {
    List<Information> findByCustomer_CustomerId(Integer customerId);
}
