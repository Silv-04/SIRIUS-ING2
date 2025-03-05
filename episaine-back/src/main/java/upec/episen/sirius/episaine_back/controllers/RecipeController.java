package upec.episen.sirius.episaine_back.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import upec.episen.sirius.episaine_back.services.RecipeService;
import upec.episen.sirius.episaine_back.models.Recipe;

import java.util.List;

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
     * Generates a random recipe and saves it to the database.
     * @return ResponseEntity with the generated recipe or an error status.
     */

    @PostMapping("/generate")
    public ResponseEntity<Recipe> generateRecipe() {
        try {
            Recipe recipe = recipeService.generateAndSaveRecipe();
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
}