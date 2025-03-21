package upec.episen.sirius.episaine_back.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import upec.episen.sirius.episaine_back.models.Informations;

public interface InformationsRepository extends JpaRepository<Informations, Integer> {
    public Informations save(Informations informations);

    public List<Informations> findAll();

    public Optional<Informations> findById(Integer id);

    public void delete(Informations informations);

    @Query(value="SELECT * FROM informations WHERE fk_customer_id = :value LIMIT 1", nativeQuery = true)
    public Optional<Informations> findByCustomerId(@Param("value") Integer value);
}