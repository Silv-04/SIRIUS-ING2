package upec.episen.sirius.episaine_back.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import upec.episen.sirius.episaine_back.models.Recipe;

/**
 * Repository interface for accessing the Recipe table in the database.
 */
@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
}
