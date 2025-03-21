package upec.episen.sirius.episaine_back.services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import upec.episen.sirius.episaine_back.models.Product;
import upec.episen.sirius.episaine_back.models.Recipe;
import upec.episen.sirius.episaine_back.repositories.ProductRepository;
import upec.episen.sirius.episaine_back.repositories.RecipeRepository;

import java.io.FileWriter;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;

/**
 * Service class responsible for handling recipe-related logic, including
 * generating recipes based on dietary requirements and filtering invalid recipes.
 */

@Service
public class RecipeService {
    private static final Logger logger = LoggerFactory.getLogger(RecipeService.class);
    private static final String LOG_FILE_PATH = "src/main/java/upec/episen/sirius/episaine_back/services/recipe_generation_log.txt";

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private EntityManager entityManager;

    /**
     * Logs messages to both console and a log file.
     *
     * @param message The message to log.
     */
    private void logToFile(String message) {
        try (FileWriter writer = new FileWriter(LOG_FILE_PATH, true)) {
            writer.write(message + "\n");
        } catch (IOException e) {
            logger.error("Error writing to log file: {}", e.getMessage());
        }
    }

    private boolean isValidRange(double value, double min, double max, String nutrient, StringBuilder rejectionReason) {
        if (value < min || value > max) {
            rejectionReason.append(nutrient)
                    .append(" hors plage : ")
                    .append(value)
                    .append(" (Min: ")
                    .append(min)
                    .append(", Max: ")
                    .append(max)
                    .append(") | ");
            return false;
        }
        return true;
    }

    /**
     * Retrieves all recipes stored in the database.
     *
     * @return A list of all available recipes.
     */
    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    /**
     * Generates a single recipe based on the selected dietary regime.
     * If the total calorie count is 0, the recipe is ignored.
     *
     * @param dietaryRegime The dietary regime for the recipe.
     * @return The generated recipe or null if it has 0 calories.
     */
    public Recipe generateAndSaveRecipe(String dietaryRegime) {

        logger.info("Début de la génération d'une recette pour le régime alimentaire : {}", dietaryRegime);

        if (dietaryRegime == null || dietaryRegime.isEmpty()) {
            logger.warn("Aucun régime alimentaire spécifié. Arrêt de la génération de la recette.");
            return null;
        }
        List<String> categories = Arrays.asList(
                "entrees et plats composes",
                "produits cerealiers",
                "viandes, œufs, poissons et assimilés",
                "fruits, legumes, legumineuses et oleagineux",
                "eaux et autres boissons"
        );

        String sql = "SELECT * FROM products WHERE nom_groupe = :category ";

        switch (dietaryRegime.toLowerCase()) {
            case "vegetarien":
                logger.info("Filtrage des viandes pour un régime végétarien.");
                sql += "AND nom_soussousgroupe NOT IN ('abats', 'agneau et mouton', 'bœuf et veau', 'gibier', 'porc', 'poulet', 'dinde', 'autres viandes') ";
                break;
            case "vegane":
                logger.info("Filtrage des viandes et des produits laitiers pour un régime végan.");

            case "vegetalien":
                logger.info("Filtrage des viandes et des produits laitiers pour un régime végan.");

                sql += "AND nom_soussousgroupe NOT IN ('abats', 'agneau et mouton', 'bœuf et veau', 'gibier', 'porc', 'poulet', 'dinde', 'autres viandes', "
                        + "'œufs crus', 'œufs cuits', 'fromages a pate molle', 'fromages blancs', "
                        + "'laits de vaches liquides (non concentres)', 'desserts lactes', "
                        + "'yaourts et specialites laitieres type yaourt') ";
                break;
            case "pescetarien":
                logger.info("Autorisation des poissons mais exclusion des autres viandes.");

                sql += "AND nom_soussousgroupe NOT IN ('abats', 'agneau et mouton', 'bœuf et veau', 'gibier', 'porc', 'poulet', 'dinde', 'autres viandes') ";
                break;
            case "halal":
                logger.info("Filtrage des produits non-halal (alcool et porc).");
                sql += "AND alcool = 0 AND nom_soussousgroupe NOT LIKE '%porc%' ";
                break;
            case "casher":
                logger.info("Filtrage des produits non-casher (alcool et porc).");
                sql += "AND alcool = 0 AND nom_soussousgroupe NOT IN ('porc', 'saucisses et assimiles', 'rillettes', 'saucisson secs') ";
                break;
            case "sans gluten":
                logger.info("Sélection des produits sans gluten.");
                sql += "AND (glucides = 0 OR glucides IS NULL)";
                break;
            case "sans lactose":
                logger.info("Sélection des produits sans lactose.");
                sql += "AND (lactose = 0 OR lactose IS NULL)";
                break;
            default:
                logger.info("Aucun filtrage spécifique appliqué pour le régime : {}", dietaryRegime);
                break;
        }

        sql += " ORDER BY RANDOM() LIMIT 1";

        Query query = entityManager.createNativeQuery(sql, Product.class);
        Recipe recipe = new Recipe();
        recipe.setRecipeName("Recette " + dietaryRegime + " Aléatoire");
        recipe.setDietaryRegime(dietaryRegime);
        recipe.setIngredients(new ArrayList<>());

        /**
         * Variables to store the total nutritional values of the recipe.
         */

        int totalCalories = 0;
        double totalGlucides = 0, totalLipides = 0, totalGlucose = 0, totalLactose = 0, totalMaltose = 0, totalAmidon = 0;
        double totalFibres = 0, totalCholesterol = 0, totalSel = 0, totalCalcium = 0, totalCuivre = 0, totalFer = 0, totalProteines625 = 0;


        /**
         * Iterates through product categories, fetches random products,
         * and accumulates their nutritional values.
         */

        for (String category : categories) {

            logger.info("Recherche d'ingrédients dans la catégorie : {}", category);

            query.setParameter("category", category);
            List<Product> result = query.getResultList();
            if (!result.isEmpty()) {
                Product product = result.get(0);

                logger.info("Ingrédient sélectionné : {} ({} kcal)", product.getNomProduit(), product.getenergie_ue_kcal());

                recipe.getIngredients().add(product.getNomProduit());
                totalCalories += product.getenergie_ue_kcal() != null ? product.getenergie_ue_kcal() : 0;
                totalGlucides += product.getGlucides() != null ? product.getGlucides() : 0;
                totalLipides += product.getLipides() != null ? product.getLipides() : 0;
                totalGlucose += product.getGlucose() != null ? product.getGlucose() : 0;
                totalLactose += product.getLactose() != null ? product.getLactose() : 0;
                totalMaltose += product.getMaltose() != null ? product.getMaltose() : 0;
                totalAmidon += product.getAmidon() != null ? product.getAmidon() : 0;
                totalFibres += product.getFibres() != null ? product.getFibres() : 0;
                totalCholesterol += product.getCholesterol() != null ? product.getCholesterol() : 0;
                totalSel += product.getSel() != null ? product.getSel() : 0;
                totalCalcium += product.getCalcium() != null ? product.getCalcium() : 0;
                totalCuivre += product.getCuivre() != null ? product.getCuivre() : 0;
                totalFer += product.getFer() != null ? product.getFer() : 0;
                totalProteines625 += product.getProteines625() != null ? product.getProteines625() : 0;
            }
        }

        /**
         * If no valid recipe was generated (0 calories), discard it.
         */

        if (totalCalories == 0) {
            logger.warn("Generated recipe for {} had 0 calories and was discarded.", dietaryRegime);
            return null;
        }

        /**
         * Assigns the computed nutritional values to the recipe.
         */

        recipe.setCalorieCount(totalCalories);
        recipe.setTotalGlucides(totalGlucides);
        recipe.setTotalLipides(totalLipides);
        recipe.setTotalGlucose(totalGlucose);
        recipe.setTotalLactose(totalLactose);
        recipe.setTotalMaltose(totalMaltose);
        recipe.setTotalAmidon(totalAmidon);
        recipe.setTotalFibres(totalFibres);
        recipe.setTotalCholesterol(totalCholesterol);
        recipe.setTotalSel(totalSel);
        recipe.setTotalCalcium(totalCalcium);
        recipe.setTotalCuivre(totalCuivre);
        recipe.setTotalFer(totalFer);
        recipe.setTotalProteines625(totalProteines625);
        recipe.setInstructions("Mélangez les ingrédients et dégustez !");

        /**
         * Logs and saves the generated recipe.
         */

        logger.info("Recette générée : {} with {} kcal", recipe.getRecipeName(), recipe.getCalorieCount());
        return recipeRepository.save(recipe);
    }

    /**
     * Generates multiple recipes based on the selected dietary regime.
     * Ensures that only recipes with non-zero calorie values are included.
     * @param dietaryRegime The dietary regime for the recipes.
     * @param count The number of recipes to generate.
     * @return A list of valid generated recipes.
     */

    public List<Recipe> generateAndSaveMultipleRecipes(
            String dietaryRegime, int count, int minCalories, int maxCalories,
            double minGlucides, double maxGlucides, double minLipides, double maxLipides,
            double minGlucose, double maxGlucose, double minLactose, double maxLactose,
            double minMaltose, double maxMaltose, double minAmidon, double maxAmidon,
            double minFibres, double maxFibres, double minCholesterol, double maxCholesterol,
            double minSel, double maxSel, double minCalcium, double maxCalcium,
            double minCuivre, double maxCuivre, double minFer, double maxFer,
            double minProteines625, double maxProteines625
    ) {
        logger.info(" ... Début de la génération des {} recettes pour le régime : {}", count, dietaryRegime);
        List<Recipe> recipes = new ArrayList<>();

        while (recipes.size() < count) {
            Recipe newRecipe = generateAndSaveRecipe(dietaryRegime);

            if (newRecipe != null) {
                logger.info(" Vérification des critères pour la recette : {} ({} kcal)",
                        newRecipe.getRecipeName(), newRecipe.getCalorieCount());

                boolean isValid = true;
                StringBuilder rejectionReason = new StringBuilder();

                /**
                 * Checking nutritional values
                 * */

                if (!isValidRange(newRecipe.getCalorieCount(), minCalories, maxCalories, "Calories", rejectionReason)) isValid = false;
                if (!isValidRange(newRecipe.getTotalGlucides(), minGlucides, maxGlucides, "Glucides", rejectionReason)) isValid = false;
                if (!isValidRange(newRecipe.getTotalLipides(), minLipides, maxLipides, "Lipides", rejectionReason)) isValid = false;
                if (!isValidRange(newRecipe.getTotalGlucose(), minGlucose, maxGlucose, "Glucose", rejectionReason)) isValid = false;
                if (!isValidRange(newRecipe.getTotalLactose(), minLactose, maxLactose, "Lactose", rejectionReason)) isValid = false;
                if (!isValidRange(newRecipe.getTotalMaltose(), minMaltose, maxMaltose, "Maltose", rejectionReason)) isValid = false;
                if (!isValidRange(newRecipe.getTotalAmidon(), minAmidon, maxAmidon, "Amidon", rejectionReason)) isValid = false;
                if (!isValidRange(newRecipe.getTotalFibres(), minFibres, maxFibres, "Fibres", rejectionReason)) isValid = false;
                if (!isValidRange(newRecipe.getTotalCholesterol(), minCholesterol, maxCholesterol, "Cholestérol", rejectionReason)) isValid = false;
                if (!isValidRange(newRecipe.getTotalSel(), minSel, maxSel, "Sel", rejectionReason)) isValid = false;
                if (!isValidRange(newRecipe.getTotalCalcium(), minCalcium, maxCalcium, "Calcium", rejectionReason)) isValid = false;
                if (!isValidRange(newRecipe.getTotalCuivre(), minCuivre, maxCuivre, "Cuivre", rejectionReason)) isValid = false;
                if (!isValidRange(newRecipe.getTotalFer(), minFer, maxFer, "Fer", rejectionReason)) isValid = false;
                if (!isValidRange(newRecipe.getTotalProteines625(), minProteines625, maxProteines625, "Protéines", rejectionReason)) isValid = false;

                /**
                 * Display nutritional parameters for each generated recipe
                */

                logger.info(" -- Détails nutritionnels pour {} : Calories: {} kcal | Glucides: {} g | Lipides: {} g | Glucose: {} g | Lactose: {} g | Maltose: {} g | Amidon: {} g | Fibres: {} g | Cholestérol: {} mg | Sel: {} g | Calcium: {} mg | Cuivre: {} mg | Fer: {} mg | Protéines: {} g",
                        newRecipe.getRecipeName(),
                        newRecipe.getCalorieCount(), newRecipe.getTotalGlucides(), newRecipe.getTotalLipides(),
                        newRecipe.getTotalGlucose(), newRecipe.getTotalLactose(), newRecipe.getTotalMaltose(),
                        newRecipe.getTotalAmidon(), newRecipe.getTotalFibres(), newRecipe.getTotalCholesterol(),
                        newRecipe.getTotalSel(), newRecipe.getTotalCalcium(), newRecipe.getTotalCuivre(),
                        newRecipe.getTotalFer(), newRecipe.getTotalProteines625());

                /**
                 * Si la recette est valide, on l'ajoute
                 */

                if (isValid) {
                    recipes.add(newRecipe);
                    logger.info(" Recette ajoutée avec succès : {} | Calories: {} kcal",
                            newRecipe.getRecipeName(), newRecipe.getCalorieCount());
                } else {
                    logger.warn(" Recette rejetée : {}. Raisons : {}",
                            newRecipe.getRecipeName(), rejectionReason.toString());
                }
            } else {
                logger.warn(" Impossible de générer une recette pour le régime : {}", dietaryRegime);
            }
        }

        logger.info(" {} recettes générées avec succès pour le régime : {}", recipes.size(), dietaryRegime);
        return recipes;
    }

    /** 
     * @param regime : given a regime type
     * @param minCalories : given a minimum number of calories
     * @param maxCalories : given a maximum number of calories
     * @param category : given a category of recipe
     * @param orderOption : given an order option
     * @return List<Recipe> : return a list of recipes filtered by regime, calories and ordered by the order option
     */
    public List<Recipe> getRecipesFilteredByRegimeCalories(String regime, Integer minCalories, Integer maxCalories) {
            return recipeRepository.findRecipesWithFilter(regime, minCalories, maxCalories);
    }
}