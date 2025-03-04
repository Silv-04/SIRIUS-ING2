package upec.episen.sirius.episaine_back.services;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import upec.episen.sirius.episaine_back.models.Product;
import upec.episen.sirius.episaine_back.models.Recipe;
import upec.episen.sirius.episaine_back.repositories.ProductRepository;
import upec.episen.sirius.episaine_back.repositories.RecipeRepository;

import java.util.Arrays;
import java.util.List;
import java.util.ArrayList;

@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private EntityManager entityManager;

    /**
     * Retrieves all recipes from the database.
     * @return A list of all recipes.
     */
    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

    /**
     * Generates a random recipe using random products from specified categories.
     * Calculates the total calorie count based on selected products and saves the recipe.
     * @return The generated and saved Recipe object.
     */
    public Recipe generateAndSaveRecipe() {
        List<String> categories = Arrays.asList(
                "entrees et plats composes",
                "produits cerealiers",
                "viandes, œufs, poissons et assimilés",
                "eaux et autres boissons"
        );

        String sql = "SELECT * FROM products WHERE nom_groupe = :category ORDER BY RANDOM() LIMIT 1";
        Query query = entityManager.createNativeQuery(sql, Product.class);

        Recipe recipe = new Recipe();
        recipe.setRecipeName("Recette Aléatoire");
        recipe.setDietaryRegime("Omnivore");
        recipe.setIngredients(new ArrayList<>());

        int totalCalories = 0;

        for (String category : categories) {
            query.setParameter("category", category);
            List<Product> result = query.getResultList();
            if (!result.isEmpty()) {
                Product product = result.get(0);
                recipe.getIngredients().add(product.getNomProduit());
                totalCalories += product.getenergie_ue_kcal() != null ? product.getenergie_ue_kcal() : 0;
            }
        }

        recipe.setCalorieCount(totalCalories);
        recipe.setInstructions("Mélangez les ingrédients et dégustez !");

        return recipeRepository.save(recipe);
    }
}
