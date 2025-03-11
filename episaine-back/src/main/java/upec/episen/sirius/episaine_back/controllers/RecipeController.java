package upec.episen.sirius.episaine_back.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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

    /**
     * Constructor for RecipeController.
     * @param recipeService The service used to handle recipe operations.
     */
    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
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
     */
    @PostMapping("/generate")
    public ResponseEntity<List<Recipe>> generateMultipleRecipes(@RequestBody int count) {
        try {
            List<Recipe> recipes = recipeService.generateAndSaveMultipleRecipes(count);
            System.out.println("Recettes générées : " + recipes.size());
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
}