package upec.episen.sirius.episaine_back.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import upec.episen.sirius.episaine_back.models.Product;
import java.util.List;

/**
 * Repository interface for accessing the Product table in the database.
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    /**
     * Finds a list of products by their main group name.
     * @param nomGroupe The name of the main food group.
     * @return A list of products belonging to the specified group.
     */
    List<Product> findByNomGroupe(String nomGroupe);
}
