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

    public List<Recipe> getAllRecipes() {
        return recipeRepository.findAll();
    }

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

        recipe.setCalorieCount(totalCalories);
        recipe.setInstructions("Mélangez les ingrédients et dégustez !");

        return recipeRepository.save(recipe);
    }
}
