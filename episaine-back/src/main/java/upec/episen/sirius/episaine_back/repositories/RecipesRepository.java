package upec.episen.sirius.episaine_back.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.bind.annotation.RequestParam;

import upec.episen.sirius.episaine_back.models.Recipes;

public interface RecipesRepository extends JpaRepository<Recipes, Integer> {

    @Query(value="SELECT * FROM recipes WHERE dietary_regime = :regime " + 
    "AND (:minCalories IS NULL or calorie_count > :minCalories)" + 
    "AND (:maxCalories IS NULL or calorie_count < :maxCalories)" + 
    "AND (:category IS NULL or category = :category)", nativeQuery = true)
    List<Recipes> findRecipesWithFilter(
        @RequestParam("regime") String regime,
        @RequestParam("minCalories") Integer minCalories,
        @RequestParam("maxCalories") Integer maxCalories,
        @RequestParam("category") String category);
}
