package upec.episen.sirius.episaine_back.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.persistence.OrderBy;
import upec.episen.sirius.episaine_back.models.Recipes;
import upec.episen.sirius.episaine_back.services.ProgressService;
import upec.episen.sirius.episaine_back.services.RecipesService;

@CrossOrigin
@RestController
@RequestMapping("/recipes")
public class RecipesController {

    private final ProgressService progress;
    
    public RecipesController(ProgressService progress) {
        this.progress = progress;
    }

    @Autowired
    private RecipesService recipesService;

    
    /** 
     * @param recipes : given a recipe
     * @return String : return a log message to confirm the recipe has been added
     */
    @PostMapping("/add")
    public String addRecipes(@RequestBody Recipes recipes) {
        recipesService.saveRecipes(recipes);
        return "Recipes added successfully";
    }

    
    /** 
     * @return List<Recipes> : return all recipes
     */
    @GetMapping("/get/all")
    public List<Recipes> getAllRecipes() {
        return recipesService.findAllRecipes();
    }

    
    
    /** 
     * @param page : given a page number
     * @param size : given a number of recipes per page
     * @return Page<Recipes> : return a page of recipes
     */
    @GetMapping("/get")
    @OrderBy
    public Page<Recipes> getPage(
        @RequestParam int page,
        @RequestParam int size) {
        return recipesService.findRecipes(page, size);
    }

    /** 
     * @param id : given a recipe id
     * @return String : return a log message to confirm whether the recipe has been deleted
     */
    @DeleteMapping("/delete/{id}")
    public String deleteRecipes(@PathVariable Integer id) {
        boolean isRemoved = recipesService.deleteRecipes(id);
        if (isRemoved) {
            return "Recipes deleted successfully";
        }
        return "Recipes not found";
    }

    /** 
     * @param recipes : given a recipe
     * @return String : return a log message to confirm whether the recipe has been updated
     */
    @PostMapping("/update")
    public String updateRecipes(@RequestBody Recipes recipes) {
        boolean isUpdated = recipesService.updateRecipes(recipes);
        if (isUpdated) {
            return "Recipes updated successfully";
        }
        return "Recipes not found";
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
    public List<Recipes> getRecipesFiltered(
            @RequestParam(required = false) String regime,
            @RequestParam(required = false) Integer minCalories,
            @RequestParam(required = false) Integer maxCalories,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String orderOption) {
        return recipesService.getRecipesFilteredByRegimeCaloriesCategory(regime, minCalories, maxCalories, category, orderOption);
    }

    
    /** 
     * @param id : given a customer id
     * @param numberOfDays : given a number of days
     * @param orderOption : given an order option to sort the data
     * @param n : given a max number of recipes
     * @return List<List<Recipes>> : return a list of list of recipes for a given customer id
     */
    @GetMapping("/getRecipesList/{id}")
    public List<List<Recipes>> getRecipesTest(
        @PathVariable int id,
        @RequestParam(required = false) Integer numberOfDays,
        @RequestParam(required = false) String orderOption,
        @RequestParam int n) {
        return progress.getRecipesForId(id, numberOfDays, orderOption, n);
    }
}
