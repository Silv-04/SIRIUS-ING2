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
import java.util.Random;

/**
 * Service class responsible for handling recipe-related logic, including
 * generating recipes based on dietary requirements and filtering invalid recipes.
 */
@Service
public class RecipeService {

    @Autowired
    private RecipeRepository recipeRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private EntityManager entityManager;

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
                sql += "AND nom_soussousgroupe NOT IN ('abats', 'agneau et mouton', 'bœuf et veau', 'gibier', 'porc', 'poulet', 'dinde', 'autres viandes') ";
                break;
            case "vegane":
            case "vegetalien":
                sql += "AND nom_soussousgroupe NOT IN ('abats', 'agneau et mouton', 'bœuf et veau', 'gibier', 'porc', 'poulet', 'dinde', 'autres viandes', "
                        + "'œufs crus', 'œufs cuits', 'fromages a pate molle', 'fromages blancs', "
                        + "'laits de vaches liquides (non concentres)', 'desserts lactes', "
                        + "'yaourts et specialites laitieres type yaourt') ";
                break;
            case "pescetarien":
                sql += "AND nom_soussousgroupe NOT IN ('abats', 'agneau et mouton', 'bœuf et veau', 'gibier', 'porc', 'poulet', 'dinde', 'autres viandes') ";
                break;
            case "halal":
                sql += "AND alcool = 0 AND nom_soussousgroupe NOT LIKE '%porc%' ";
                break;
            case "casher":
                sql += "AND alcool = 0 AND nom_soussousgroupe NOT IN ('porc', 'saucisses et assimiles', 'rillettes', 'saucisson secs') ";
                break;
            case "sans gluten":
                sql += "AND (glucides = 0 OR glucides IS NULL)";
                break;
            case "sans lactose":
                sql += "AND (lactose = 0 OR lactose IS NULL)";
                break;
            default:
                break;
        }

        sql += " ORDER BY RANDOM() LIMIT 1";

        Query query = entityManager.createNativeQuery(sql, Product.class);
        Recipe recipe = new Recipe();
        recipe.setRecipeName("Recette " + dietaryRegime + " Aléatoire");
        recipe.setDietaryRegime(dietaryRegime);
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

        if (totalCalories == 0) {
            return null; // Ignore recipes with 0 calories
        }

        recipe.setCalorieCount(totalCalories);
        recipe.setInstructions("Mélangez les ingrédients et dégustez !");

        return recipeRepository.save(recipe);
    }

    /**
     * Generates multiple recipes based on the selected dietary regime.
     * Ensures that only recipes with non-zero calorie values are included.
     *
     * @param dietaryRegime The dietary regime for the recipes.
     * @param count The number of recipes to generate.
     * @return A list of valid generated recipes.
     */
    public List<Recipe> generateAndSaveMultipleRecipes(String dietaryRegime, int count) {
        List<Recipe> recipes = new ArrayList<>();

        while (recipes.size() < count) {
            Recipe newRecipe = generateAndSaveRecipe(dietaryRegime);
            if (newRecipe != null) {
                recipes.add(newRecipe);
            }
        }

        return recipes;
    }
}
