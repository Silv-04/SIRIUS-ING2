package upec.episen.sirius.episaine_back.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import upec.episen.sirius.episaine_back.models.Recipes;
import upec.episen.sirius.episaine_back.repositories.RecipesRepository;

@Service
public class RecipesService {

    @Autowired
    private RecipesRepository recipesRepository;

    
    /** 
     * @param recipes : given a recipe
     * @return Recipes : return the recipe and save the recipe in the database
     */
    public Recipes saveRecipes(Recipes recipes) {
        return recipesRepository.save(recipes); 
    }
    
    
    /** 
     * @return List<Recipes> : return all recipes
     */
    public List<Recipes> findAllRecipes() {
        return recipesRepository.findAll();
    }

    
    /** 
     * @param page : given a page number
     * @param size  : given a number of recipes per page
     * @return Page<Recipes> : return a page of recipes
     */
    public Page<Recipes> findRecipes(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return recipesRepository.findAll(pageable);
    }

    
    /** 
     * @param id : given a recipe id
     * @return boolean : return true if the recipe has been deleted
     */
    public boolean deleteRecipes(Integer id) {
        Optional<Recipes> recipes = recipesRepository.findById(id);
        if (recipes.isPresent()) {
            recipesRepository.delete(recipes.get());
            return true;
        }
        return false;
    }

    
    /** 
     * @param recipes : given a recipe
     * @return boolean : return true if the recipe has been updated
     */
    public boolean updateRecipes(Recipes recipes) {
        Optional<Recipes> recipesOptional = recipesRepository.findById(recipes.getRecipeId());
        if (recipesOptional.isPresent()) {
            recipesRepository.save(recipes);
            return true;
        }
        return false;
    }

    
    /** 
     * @param regime : given a regime type
     * @param minCalories : given a minimum number of calories
     * @param maxCalories : given a maximum number of calories
     * @param category : given a category of recipe
     * @param orderOption : given an order option
     * @return List<Recipes> : return a list of recipes filtered by regime, calories, category and ordered by the order option
     */
    public List<Recipes> getRecipesFilteredByRegimeCaloriesCategory(String regime, Integer minCalories, Integer maxCalories, String category, String orderOption) {
        if (orderOption.equals("") || orderOption.isEmpty()) {
            return recipesRepository.findRecipesWithFilter(regime, minCalories, maxCalories, category);
        }
        else {
            Sort sort = Sort.by(Sort.Direction.DESC, orderOption);
            return recipesRepository.findRecipesWithFilterAndOrder(regime, minCalories, maxCalories, category, sort);
        }
    }
}
