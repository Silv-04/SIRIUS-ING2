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

    @PostMapping("/add")
    public String addRecipes(@RequestBody Recipes recipes) {
        recipesService.saveRecipes(recipes);
        return "Recipes added successfully";
    }

    @GetMapping("/get/all")
    public List<Recipes> getAllRecipes() {
        return recipesService.findAllRecipes();
    }

    @GetMapping("/get")
    @OrderBy
    public Page<Recipes> getPage(
        @RequestParam int page,
        @RequestParam int size) {
        return recipesService.findRecipes(page, size);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteRecipes(@PathVariable Integer id) {
        boolean isRemoved = recipesService.deleteRecipes(id);
        if (isRemoved) {
            return "Recipes deleted successfully";
        }
        return "Recipes not found";
    }

    @PostMapping("/update")
    public String updateRecipes(@RequestBody Recipes recipes) {
        boolean isUpdated = recipesService.updateRecipes(recipes);
        if (isUpdated) {
            return "Recipes updated successfully";
        }
        return "Recipes not found";
    }

    @GetMapping("/filter")
    public List<Recipes> getRecipesFiltered(
            @RequestParam(required = false) String regime,
            @RequestParam(required = false) Integer minCalories,
            @RequestParam(required = false) Integer maxCalories,
            @RequestParam(required = false) String category) {
        return recipesService.getRecipesFilteredByRegimeCaloriesCategory(regime, minCalories, maxCalories, category);
    }

    @GetMapping("/test/{id}")
    public List<List<Recipes>> getRecipesTest(
        @PathVariable Integer id,
        @RequestParam(required = false) Integer numberOfDays) {
        return progress.getRecipesForId(id, numberOfDays);
    }
}
