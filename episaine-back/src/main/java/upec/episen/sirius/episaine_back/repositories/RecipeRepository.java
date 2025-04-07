package upec.episen.sirius.episaine_back.repositories;

import java.util.List;

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
                        "AND (:maxCalories IS NULL or calorie_count < :maxCalories)" +
                        "AND (:minGlucides IS NULL or total_glucides > :minGlucides)" +
                        "AND (:maxGlucides IS NULL or total_glucides < :maxGlucides)" +
                        "AND (:minLipides IS NULL or total_lipides > :minLipides)" +
                        "AND (:maxLipides IS NULL or total_lipides < :maxLipides)" +
                        "AND (:minGlucose IS NULL or total_glucose > :minGlucose)" +
                        "AND (:maxGlucose IS NULL or total_glucose < :maxGlucose)" +
                        "AND (:minLactose IS NULL or total_lactose > :minLactose)" +
                        "AND (:maxLactose IS NULL or total_lactose < :maxLactose)" +
                        "AND (:minMaltose IS NULL or total_maltose > :minMaltose)" +
                        "AND (:maxMaltose IS NULL or total_maltose < :maxMaltose)" +
                        "AND (:minAmidon IS NULL or total_amidon > :minAmidon)" +
                        "AND (:maxAmidon IS NULL or total_amidon < :maxAmidon)" +
                        "AND (:minFibres IS NULL or total_fibres > :minFibres)" +
                        "AND (:maxFibres IS NULL or total_fibres < :maxFibres)" +
                        "AND (:minCholesterol IS NULL or total_cholesterol > :minCholesterol)" +
                        "AND (:maxCholesterol IS NULL or total_cholesterol < :maxCholesterol)" +
                        "AND (:minSel IS NULL or total_sel > :minSel)" +
                        "AND (:maxSel IS NULL or total_sel < :maxSel)" +
                        "AND (:minCalcium IS NULL or total_calcium > :minCalcium)" +
                        "AND (:maxCalcium IS NULL or total_calcium < :maxCalcium)" +
                        "AND (:minCuivre IS NULL or total_cuivre > :minCuivre)" +
                        "AND (:maxCuivre IS NULL or total_cuivre < :maxCuivre)" +
                        "AND (:minFer IS NULL or total_fer > :minFer)" +
                        "AND (:maxFer IS NULL or total_fer < :maxFer)" +
                        "AND (:minProteines625 IS NULL or total_proteines625 > :minProteines625)" +
                        "AND (:maxProteines625 IS NULL or total_proteines625 < :maxProteines625)" +
                        "ORDER BY calorie_count DESC LIMIT 30", nativeQuery = true)
        List<Recipe> findRecipesWithFilter(
                        @RequestParam("regime") String regime,
                        @RequestParam("minCalories") Integer minCalories,
                        @RequestParam("maxCalories") Integer maxCalories,
                        @RequestParam("minGlucides") Double minGlucides,
                        @RequestParam("maxGlucides") Double maxGlucides,
                        @RequestParam("minLipides") Double minLipides,
                        @RequestParam("maxLipides") Double maxLipides,
                        @RequestParam("minGlucose") Double minGlucose,
                        @RequestParam("maxGlucose") Double maxGlucose,
                        @RequestParam("minLactose") Double minLactose,
                        @RequestParam("maxLactose") Double maxLactose,
                        @RequestParam("minMaltose") Double minMaltose,
                        @RequestParam("maxMaltose") Double maxMaltose,
                        @RequestParam("minAmidon") Double minAmidon,
                        @RequestParam("maxAmidon") Double maxAmidon,
                        @RequestParam("minFibres") Double minFibres,
                        @RequestParam("maxFibres") Double maxFibres,
                        @RequestParam("minCholesterol") Double minCholesterol,
                        @RequestParam("maxCholesterol") Double maxCholesterol,
                        @RequestParam("minSel") Double minSel,
                        @RequestParam("maxSel") Double maxSel,
                        @RequestParam("minCalcium") Double minCalcium,
                        @RequestParam("maxCalcium") Double maxCalcium,
                        @RequestParam("minCuivre") Double minCuivre,
                        @RequestParam("maxCuivre") Double maxCuivre,
                        @RequestParam("minFer") Double minFer,
                        @RequestParam("maxFer") Double maxFer,
                        @RequestParam("minProteines625") Double minProteines625,
                        @RequestParam("maxProteines625") Double maxProteines625);
}
