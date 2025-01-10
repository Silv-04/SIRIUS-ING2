package upec.episen.sirius.episaine_back.recipes.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import upec.episen.sirius.episaine_back.recipes.models.Recipes;
import upec.episen.sirius.episaine_back.recipes.repositories.RecipesRepository;

@Service
public class RecipesService {

    @Autowired
    private RecipesRepository recipesRepository;

    public Recipes saveRecipes(Recipes recipes) {
        return recipesRepository.save(recipes); 
    }
    
    public List<Recipes> findAllRecipes() {
        return recipesRepository.findAll();
    }

    public Page<Recipes> findRecipes(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return recipesRepository.findAll(pageable);
    }

    public boolean deleteRecipes(Integer id) {
        Optional<Recipes> recipes = recipesRepository.findById(id);
        if (recipes.isPresent()) {
            recipesRepository.delete(recipes.get());
            return true;
        }
        return false;
    }

    public boolean updateRecipes(Recipes recipes) {
        Optional<Recipes> recipesOptional = recipesRepository.findById(recipes.getRecipeId());
        if (recipesOptional.isPresent()) {
            recipesRepository.save(recipes);
            return true;
        }
        return false;
    }

    public List<Recipes> getRecipesFilteredByRegimeCaloriesCategory(String regime, Integer minCalories, Integer maxCalories, String category) {
        return recipesRepository.findRecipesWithFilter(regime, minCalories, maxCalories, category);
    }
}
