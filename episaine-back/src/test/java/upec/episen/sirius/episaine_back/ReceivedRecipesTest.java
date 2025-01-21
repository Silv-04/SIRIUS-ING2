package upec.episen.sirius.episaine_back;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import upec.episen.sirius.episaine_back.models.Customer;
import upec.episen.sirius.episaine_back.models.Informations;
import upec.episen.sirius.episaine_back.models.Recipes;
import upec.episen.sirius.episaine_back.services.CustomerService;
import upec.episen.sirius.episaine_back.services.InformationsService;
import upec.episen.sirius.episaine_back.services.ProgressService;
import upec.episen.sirius.episaine_back.services.RecipesService;

public class ReceivedRecipesTest {
    
    @Mock
    private InformationsService informationsService;

    @Mock
    private RecipesService recipesService;

    @Mock
    private CustomerService customerService;

    @InjectMocks
    private ProgressService progressService;

    @BeforeEach
    void setUp() throws IOException {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void checkRecipesListSize() {
        // creating a customer
        Customer customer = new Customer();
        customer.setCustomer_id(1);
        customer.setCustomer_birthdate(java.sql.Date.valueOf("1990-01-01"));
        customer.setGender("homme");

        // creating customer's informations
        Informations informations = new Informations();
        informations.setFk_customer_id(1);
        informations.setHealth_goal("gain de poids");
        informations.setWeight(70);
        informations.setHeight(175);
        informations.setMeals_per_day(3);
        informations.setDietary_regime("vegetarien");
        informations.setCuisine_type("française, italienne");
        informations.setAllergies("gluten,lactose");

        // creating a recipes list
        Recipes recipe1 = new Recipes();
        recipe1.setRecipeId(1);
        recipe1.setRecipeName("Salade Veggie");
        recipe1.setCalorieCount(400);
        recipe1.setIngredients("salade, tomate, olive");

        Recipes recipe2 = new Recipes();
        recipe2.setRecipeId(2);
        recipe2.setRecipeName("Pâtes Carbonara");
        recipe2.setCalorieCount(700);
        recipe2.setIngredients("pâtes, oeuf, parmesan");

        Recipes recipe3 = new Recipes();
        recipe3.setRecipeId(3);
        recipe3.setRecipeName("Ratatouille");
        recipe3.setCalorieCount(500);
        recipe3.setIngredients("aubergine, tomate, poivron, courgette");

        Recipes recipe4 = new Recipes();
        recipe4.setRecipeId(4);
        recipe4.setRecipeName("Couscous végétarien");
        recipe4.setCalorieCount(650);
        recipe4.setIngredients("semoule, pois chiches, carotte, courgette");

        Recipes recipe5 = new Recipes();
        recipe5.setRecipeId(5);
        recipe5.setRecipeName("Soupe minestrone");
        recipe5.setCalorieCount(350);
        recipe5.setIngredients("haricots, pâtes, tomate, céleri");

        List<Recipes> mockRecipes = Arrays.asList(recipe1, recipe2, recipe3, recipe4, recipe5);

        // fake mocks
        when(customerService.findByIdCustomer(1)).thenReturn(customer);
        when(informationsService.findByIdCustomer(1)).thenReturn(informations);
        when(recipesService.getRecipesFilteredByRegimeCaloriesCategory(anyString(), anyInt(), any(), any()))
                .thenReturn(mockRecipes);

        // get values from algorithms
        List<List<Recipes>> result = progressService.getRecipesForId(1, 3);

        // check if the list size is right
        for (List<Recipes> dayMeals : result) {
            assertEquals(3 * 3, dayMeals.size()); // 3 meals x 3 days
        }
    }

    @Test
    public void checkRecipesListContent() {
        // creating a customer and informations (same as in the previous test)
        Customer customer = new Customer();
        customer.setCustomer_id(1);
        customer.setCustomer_birthdate(java.sql.Date.valueOf("1990-01-01"));
        customer.setGender("homme");

        Informations informations = new Informations();
        informations.setFk_customer_id(1);
        informations.setHealth_goal("gain de poids");
        informations.setWeight(70);
        informations.setHeight(175);
        informations.setMeals_per_day(3);
        informations.setDietary_regime("vegetarien");
        informations.setCuisine_type("française, italienne");
        informations.setAllergies("gluten,lactose");

        // creating a recipes list
        Recipes recipe1 = new Recipes();
        recipe1.setRecipeId(1);
        recipe1.setRecipeName("Salade Veggie");
        recipe1.setCalorieCount(400);
        recipe1.setIngredients("salade, tomate, olive");

        Recipes recipe2 = new Recipes();
        recipe2.setRecipeId(2);
        recipe2.setRecipeName("Pâtes Carbonara");
        recipe2.setCalorieCount(700);
        recipe2.setIngredients("pâtes, oeuf, parmesan");

        Recipes recipe3 = new Recipes();
        recipe3.setRecipeId(3);
        recipe3.setRecipeName("Ratatouille");
        recipe3.setCalorieCount(500);
        recipe3.setIngredients("aubergine, tomate, poivron, courgette");

        Recipes recipe4 = new Recipes();
        recipe4.setRecipeId(4);
        recipe4.setRecipeName("Couscous végétarien");
        recipe4.setCalorieCount(650);
        recipe4.setIngredients("semoule, pois chiches, carotte, courgette");

        Recipes recipe5 = new Recipes();
        recipe5.setRecipeId(5);
        recipe5.setRecipeName("Soupe minestrone");
        recipe5.setCalorieCount(350);
        recipe5.setIngredients("haricots, pâtes, tomate, céleri");

        List<Recipes> mockRecipes = Arrays.asList(recipe1, recipe2, recipe3, recipe4, recipe5);

        // fake mocks
        when(customerService.findByIdCustomer(1)).thenReturn(customer);
        when(informationsService.findByIdCustomer(1)).thenReturn(informations);
        when(recipesService.getRecipesFilteredByRegimeCaloriesCategory(anyString(), anyInt(), any(), any()))
                .thenReturn(mockRecipes);

        // get values from algorithms
        List<List<Recipes>> result = progressService.getRecipesForId(1, 3);

        // check that recipes come from the list
        for (List<Recipes> dayMeals : result) {
            for (Recipes r : dayMeals) {
                assertTrue(mockRecipes.contains(r));
            }
        }
    }

    @Test
    public void checkRecipesListRestrictions() {
        // creating a customer and informations (same as in the previous test)
        Customer customer = new Customer();
        customer.setCustomer_id(1);
        customer.setCustomer_birthdate(java.sql.Date.valueOf("1990-01-01"));
        customer.setGender("homme");

        Informations informations = new Informations();
        informations.setFk_customer_id(1);
        informations.setHealth_goal("gain de poids");
        informations.setWeight(70);
        informations.setHeight(175);
        informations.setMeals_per_day(3);
        informations.setDietary_regime("vegetarien");
        informations.setCuisine_type("française, italienne");
        informations.setAllergies("gluten,lactose");

        // creating a recipes list (same as before)
        Recipes recipe1 = new Recipes();
        recipe1.setRecipeId(1);
        recipe1.setRecipeName("Salade Veggie");
        recipe1.setCalorieCount(400);
        recipe1.setIngredients("salade, tomate, olive");

        Recipes recipe2 = new Recipes();
        recipe2.setRecipeId(2);
        recipe2.setRecipeName("Pâtes Carbonara");
        recipe2.setCalorieCount(700);
        recipe2.setIngredients("pâtes, oeuf, parmesan");

        Recipes recipe3 = new Recipes();
        recipe3.setRecipeId(3);
        recipe3.setRecipeName("Ratatouille");
        recipe3.setCalorieCount(500);
        recipe3.setIngredients("aubergine, tomate, poivron, courgette");

        Recipes recipe4 = new Recipes();
        recipe4.setRecipeId(4);
        recipe4.setRecipeName("Couscous végétarien");
        recipe4.setCalorieCount(650);
        recipe4.setIngredients("semoule, pois chiches, carotte, courgette");

        Recipes recipe5 = new Recipes();
        recipe5.setRecipeId(5);
        recipe5.setRecipeName("Soupe minestrone");
        recipe5.setCalorieCount(350);
        recipe5.setIngredients("haricots, pâtes, tomate, céleri");

        List<Recipes> mockRecipes = Arrays.asList(recipe1, recipe2, recipe3, recipe4, recipe5);

        // fake mocks
        when(customerService.findByIdCustomer(1)).thenReturn(customer);
        when(informationsService.findByIdCustomer(1)).thenReturn(informations);
        when(recipesService.getRecipesFilteredByRegimeCaloriesCategory(anyString(), anyInt(), any(), any()))
                .thenReturn(mockRecipes);

        // get values from algorithms
        List<List<Recipes>> result = progressService.getRecipesForId(1, 3);

        // check restrictions
        String[] allergies = new String[0];
        String[] intolerances = new String[0];
        String[] prohibitedFoods = new String[0];
        
        String allergiesArray = informations.getAllergies();
        if (allergiesArray != null && !allergiesArray.isEmpty()) {
            allergies = progressService.normalize(allergiesArray.split(", "));
        }

        // check that we don't have any unwanted food in recipes
        for (List<Recipes> dayMeals : result) {
            for (Recipes r : dayMeals) {
                for (String allergy : allergies) {
                    assertFalse(r.getIngredients().toLowerCase().contains(allergy.toLowerCase()),
                            "Recette contient une allergie interdite : " + allergy + " -> " + r.getRecipeName());
                }
            }
        }
    }
}
