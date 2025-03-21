


package upec.episen.sirius.episaine_back.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import upec.episen.sirius.episaine_back.services.ProgressService;
import upec.episen.sirius.episaine_back.services.RecipeService;
import upec.episen.sirius.episaine_back.models.Recipe;

import java.util.List;
import java.util.Arrays;
import java.util.Random;

/**
 * Controller class for managing recipe-related HTTP requests.
 * Handles endpoints for generating and retrieving recipes.
 */
@RestController
@RequestMapping("/recipe")
@CrossOrigin
public class RecipeController {

    private final RecipeService recipeService;
    private final ProgressService progress;

    /**
     * Constructor for RecipeController.
     * @param recipeService The service used to handle recipe operations.
     */
    public RecipeController(RecipeService recipeService, ProgressService progress) {
        this.recipeService = recipeService;
        this.progress = progress;
    }

    /**
     * Generates a random recipe with a randomly selected dietary regime and saves it to the database.
     * @return ResponseEntity with the generated recipe or an error status.
     */
    @PostMapping("/generaterandom")
    public ResponseEntity<Recipe> generateRandomRecipe() {
        try {
            List<String> dietaryRegimes = Arrays.asList(
                    "Omnivore", "Vegetarien", "Vegane", "Pescetarien",
                    "Halal", "Casher", "Sans gluten", "Sans lactose"
            );

            String randomDietaryRegime = dietaryRegimes.get(new Random().nextInt(dietaryRegimes.size()));

            Recipe recipe = recipeService.generateAndSaveRecipe(randomDietaryRegime);
            return ResponseEntity.ok(recipe);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Generates multiple recipes based on user input.
     * @param count The number of recipes to generate.
     * @return ResponseEntity with a list of generated recipes.
     * Add End point for testing new algo performance
     */
    @PostMapping("/generate")
    public ResponseEntity<List<Recipe>> generateMultipleRecipes(
            @RequestParam String dietaryRegime,
            @RequestParam int count,
            @RequestParam int minCalories,
            @RequestParam int maxCalories,
            @RequestParam(required = false, defaultValue = "0") double minGlucides,
            @RequestParam(required = false, defaultValue = "250") double maxGlucides,
            @RequestParam(required = false, defaultValue = "0") double minLipides,
            @RequestParam(required = false, defaultValue = "100") double maxLipides,
            @RequestParam(required = false, defaultValue = "0") double minGlucose,
            @RequestParam(required = false, defaultValue = "100") double maxGlucose,
            @RequestParam(required = false, defaultValue = "0") double minLactose,
            @RequestParam(required = false, defaultValue = "100") double maxLactose,
            @RequestParam(required = false, defaultValue = "0") double minMaltose,
            @RequestParam(required = false, defaultValue = "100") double maxMaltose,
            @RequestParam(required = false, defaultValue = "0") double minAmidon,
            @RequestParam(required = false, defaultValue = "100") double maxAmidon,
            @RequestParam(required = false, defaultValue = "0") double minFibres,
            @RequestParam(required = false, defaultValue = "100") double maxFibres,
            @RequestParam(required = false, defaultValue = "0") double minCholesterol,
            @RequestParam(required = false, defaultValue = "100") double maxCholesterol,
            @RequestParam(required = false, defaultValue = "0") double minSel,
            @RequestParam(required = false, defaultValue = "5") double maxSel,
            @RequestParam(required = false, defaultValue = "0") double minCalcium,
            @RequestParam(required = false, defaultValue = "100") double maxCalcium,
            @RequestParam(required = false, defaultValue = "0") double minCuivre,
            @RequestParam(required = false, defaultValue = "100") double maxCuivre,
            @RequestParam(required = false, defaultValue = "0") double minFer,
            @RequestParam(required = false, defaultValue = "100") double maxFer,
            @RequestParam(required = false, defaultValue = "0") double minProteines625,
            @RequestParam(required = false, defaultValue = "100") double maxProteines625
    ) {
        try {
            List<Recipe> recipes = recipeService.generateAndSaveMultipleRecipes(
                    dietaryRegime, count, minCalories, maxCalories,
                    minGlucides, maxGlucides, minLipides, maxLipides, minGlucose, maxGlucose,
                    minLactose, maxLactose, minMaltose, maxMaltose, minAmidon, maxAmidon,
                    minFibres, maxFibres, minCholesterol, maxCholesterol, minSel, maxSel,
                    minCalcium, maxCalcium, minCuivre, maxCuivre, minFer, maxFer,
                    minProteines625, maxProteines625
            );
            return ResponseEntity.ok(recipes);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    /**
     * Retrieves all recipes from the database.
     * @return ResponseEntity with a list of all recipes or a no content status.
     */
    @GetMapping("/all")
    public ResponseEntity<List<Recipe>> getAllRecipes() {
        List<Recipe> recipes = recipeService.getAllRecipes();

        if (recipes.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(recipes);
    }
    /**
     * @param regime : given a regime type
     * @param minCalories : given a minimum range of calories
     * @param maxCalories : given a maximum range of calories
     * @param category : given a category of recipe
     * @param orderOption : given an order option to sort the data
     * @return List<Recipes> : return a list of recipes filtered by the given parameters
     */
    @GetMapping("/filter")
    public List<Recipe> getRecipesFiltered(
            @RequestParam(required = false) String regime,
            @RequestParam(required = false) Integer minCalories,
            @RequestParam(required = false) Integer maxCalories,
            @RequestParam(required = false) String orderOption) {
        return recipeService.getRecipesFilteredByRegimeCalories(regime, minCalories, maxCalories, orderOption);
    }

    
    /**
     * @param id : given a customer id
     * @param numberOfDays : given a number of days
     * @param orderOption : given an order option to sort the data
     * @param n : given a max number of recipes
     * @return List<List<Recipes>> : return a list of list of recipes for a given customer id
     */
    @GetMapping("/getRecipesList/{id}")
    public List<List<Recipe>> getRecipesTest(
        @PathVariable int id,
        @RequestParam(required = false) Integer numberOfDays,
        @RequestParam(required = false) String orderOption,
        @RequestParam int n) {
        return progress.getRecipesForId(id, numberOfDays, orderOption, n);
    }
}
