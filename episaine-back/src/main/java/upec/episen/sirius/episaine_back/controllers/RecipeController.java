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
            // List of possible dietary regimes
            List<String> dietaryRegimes = Arrays.asList(
                    "Omnivore", "Vegetarien", "Vegane", "Pescetarien",
                    "Halal", "Casher", "Sans gluten", "Sans lactose"
            );

            // Select a random dietary regime
            String randomDietaryRegime = dietaryRegimes.get(new Random().nextInt(dietaryRegimes.size()));

            Recipe recipe = recipeService.generateAndSaveRecipe(randomDietaryRegime);
            return ResponseEntity.ok(recipe);
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
