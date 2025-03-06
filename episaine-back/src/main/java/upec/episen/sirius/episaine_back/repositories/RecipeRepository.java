package upec.episen.sirius.episaine_back.repositories;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestParam;

import upec.episen.sirius.episaine_back.models.Recipe;

/**
 * Repository interface for accessing the Recipe table in the database.
 */
@Repository
public interface RecipeRepository extends JpaRepository<Recipe, Long> {
        @Query(value = "SELECT * FROM recipes WHERE (dietary_regime = :regime or :regime IS NULL)" +
                        "AND (:minCalories IS NULL or calorie_count > :minCalories)" +
                        "AND (:maxCalories IS NULL or calorie_count < :maxCalories)", nativeQuery = true)
        List<Recipe> findRecipesWithFilterAndOrder(
                        @RequestParam("regime") String regime,
                        @RequestParam("minCalories") Integer minCalories,
                        @RequestParam("maxCalories") Integer maxCalories,
                        Sort sort);

        @Query(value = "SELECT * FROM recipes WHERE (dietary_regime = :regime or :regime IS NULL)" +
                        "AND (:minCalories IS NULL or calorie_count > :minCalories)" +
                        "AND (:maxCalories IS NULL or calorie_count < :maxCalories)", nativeQuery = true)
        List<Recipe> findRecipesWithFilter(
                        @RequestParam("regime") String regime,
                        @RequestParam("minCalories") Integer minCalories,
                        @RequestParam("maxCalories") Integer maxCalories);
}
