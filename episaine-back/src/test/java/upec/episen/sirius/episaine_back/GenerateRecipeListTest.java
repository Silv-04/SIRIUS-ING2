package upec.episen.sirius.episaine_back;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import upec.episen.sirius.episaine_back.models.Customer;
import upec.episen.sirius.episaine_back.models.Informations;
import upec.episen.sirius.episaine_back.models.Recipe;
import upec.episen.sirius.episaine_back.services.CustomerService;
import upec.episen.sirius.episaine_back.services.InformationsService;
import upec.episen.sirius.episaine_back.services.ProgressService;
import upec.episen.sirius.episaine_back.services.RecipeService;

public class GenerateRecipeListTest {

    @Mock
    private CustomerService customerService;
    @Mock
    private InformationsService informationsService;
    @Mock
    private RecipeService recipesService;

    @InjectMocks
    private ProgressService progressService;

    private Customer customer;
    private Informations informations;
    private List<Recipe> mockRecipes;
        
    @BeforeEach
    public void setUp() throws Exception {
        MockitoAnnotations.openMocks(this);
        customer = new Customer();
        customer.setCustomer_id(1);
        customer.setCustomer_firstname("CustomerFirstName");
        customer.setCustomer_lastname("CustomerLastName");
        customer.setAddress("CustomerAddress");
        customer.setCity("City");
        customer.setPostal_code("94000");
        customer.setCustomer_phone_number("0102030405");
        customer.setCustomer_mail("Mail");
        customer.setCustomer_birthdate(Date.valueOf("2000-01-01"));
        customer.setDate_creation(Date.valueOf("2023-01-01"));
        customer.setGender("Homme");

        informations = new Informations();
        informations.setInformation_id(1);
        informations.setFk_customer_id(1);
        informations.setHealth_goal("gain de poids");
        informations.setAllergies("Poisson");
        informations.setIntolerances("Pomme");
        informations.setProhibited_food("Tomate");
        informations.setDietary_regime("Omnivore");
        informations.setWeight(50);
        informations.setHeight(180);

        // Recipe with forbidden ingredients
        Recipe recipe1 = new Recipe();
        recipe1.setRecipeId(1L);
        recipe1.setCalorieCount(500);
        recipe1.setDietaryRegime("Omnivore");
        recipe1.setInstructions("Instructions");
        recipe1.setRecipeName("RecipeName");
        recipe1.setIngredients(List.of("Tomate", "Carotte", "Poisson"));
        recipe1.setTotalAmidon(10.0);
        recipe1.setTotalCalcium(10.0);
        recipe1.setTotalCholesterol(10.0);
        recipe1.setTotalCuivre(10.0);
        recipe1.setTotalFer(10.0);
        recipe1.setTotalFibres(10.0);
        recipe1.setTotalGlucides(10.0);
        recipe1.setTotalGlucose(10.0);
        recipe1.setTotalLipides(10.0);
        recipe1.setTotalMaltose(10.0);
        recipe1.setTotalProteines625(10.0);
        recipe1.setTotalSel(10.0);
        recipe1.setTotalLactose(10.0);

        // Recipe without forbidden ingredients
        Recipe recipe2 = new Recipe();
        recipe2.setRecipeId(1L);
        recipe2.setCalorieCount(500);
        recipe2.setDietaryRegime("Omnivore");
        recipe2.setInstructions("Instructions");
        recipe2.setRecipeName("RecipeName");
        recipe2.setIngredients(List.of("Salade", "Eau", "Boeuf"));
        recipe2.setTotalAmidon(10.0);
        recipe2.setTotalCalcium(10.0);
        recipe2.setTotalCholesterol(10.0);
        recipe2.setTotalCuivre(10.0);
        recipe2.setTotalFer(10.0);
        recipe2.setTotalFibres(10.0);
        recipe2.setTotalGlucides(10.0);
        recipe2.setTotalGlucose(10.0);
        recipe2.setTotalLipides(10.0);
        recipe2.setTotalMaltose(10.0);
        recipe2.setTotalProteines625(10.0);
        recipe2.setTotalSel(10.0);
        recipe2.setTotalLactose(10.0);

        // Random recipe
        Recipe recipe3 = new Recipe();
        recipe3.setRecipeId(1L);
        recipe3.setCalorieCount(500);
        recipe3.setDietaryRegime("Omnivore");
        recipe3.setInstructions("Instructions");
        recipe3.setRecipeName("RecipeName");
        recipe3.setIngredients(List.of("Salade", "Eau", "Boeuf"));
        recipe3.setTotalAmidon(10.0);
        recipe3.setTotalCalcium(10.0);
        recipe3.setTotalCholesterol(10.0);
        recipe3.setTotalCuivre(10.0);
        recipe3.setTotalFer(10.0);
        recipe3.setTotalFibres(10.0);
        recipe3.setTotalGlucides(10.0);
        recipe3.setTotalGlucose(10.0);
        recipe3.setTotalLipides(10.0);
        recipe3.setTotalMaltose(10.0);
        recipe3.setTotalProteines625(10.0);
        recipe3.setTotalSel(10.0);
        recipe3.setTotalLactose(10.0);

        Recipe recipe4 = new Recipe();
        recipe4.setRecipeId(1L);
        recipe4.setCalorieCount(500);
        recipe4.setDietaryRegime("Omnivore");
        recipe4.setInstructions("Instructions");
        recipe4.setRecipeName("RecipeName");
        recipe4.setIngredients(List.of("Peche", "Prune", "Poire"));
        recipe4.setTotalAmidon(10.0);
        recipe4.setTotalCalcium(10.0);
        recipe4.setTotalCholesterol(10.0);
        recipe4.setTotalCuivre(10.0);
        recipe4.setTotalFer(10.0);
        recipe4.setTotalFibres(10.0);
        recipe4.setTotalGlucides(10.0);
        recipe4.setTotalGlucose(10.0);
        recipe4.setTotalLipides(10.0);
        recipe4.setTotalMaltose(10.0);
        recipe4.setTotalProteines625(30.0);
        recipe4.setTotalSel(10.0);
        recipe4.setTotalLactose(10.0);

        Recipe recipe5 = new Recipe();
        recipe5.setRecipeId(1L);
        recipe5.setCalorieCount(1000);
        recipe5.setDietaryRegime("Omnivore");
        recipe5.setInstructions("Instructions");
        recipe5.setRecipeName("RecipeName");
        recipe5.setIngredients(List.of("Un", "Deux", "Trois"));
        recipe5.setTotalAmidon(10.0);
        recipe5.setTotalCalcium(10.0);
        recipe5.setTotalCholesterol(10.0);
        recipe5.setTotalCuivre(10.0);
        recipe5.setTotalFer(10.0);
        recipe5.setTotalFibres(10.0);
        recipe5.setTotalGlucides(10.0);
        recipe5.setTotalGlucose(10.0);
        recipe5.setTotalLipides(10.0);
        recipe5.setTotalMaltose(10.0);
        recipe5.setTotalProteines625(50.0);
        recipe5.setTotalSel(10.0);
        recipe5.setTotalLactose(10.0);

        Recipe recipe6 = new Recipe();
        recipe6.setRecipeId(1L);
        recipe6.setCalorieCount(1200);
        recipe6.setDietaryRegime("Omnivore");
        recipe6.setInstructions("Instructions");
        recipe6.setRecipeName("RecipeName");
        recipe6.setIngredients(List.of("Poulet", "Saumon", "Fromage"));
        recipe6.setTotalAmidon(10.0);
        recipe6.setTotalCalcium(10.0);
        recipe6.setTotalCholesterol(10.0);
        recipe6.setTotalCuivre(10.0);
        recipe6.setTotalFer(10.0);
        recipe6.setTotalFibres(10.0);
        recipe6.setTotalGlucides(10.0);
        recipe6.setTotalGlucose(10.0);
        recipe6.setTotalLipides(10.0);
        recipe6.setTotalMaltose(10.0);
        recipe6.setTotalProteines625(10.0);
        recipe6.setTotalSel(10.0);
        recipe6.setTotalLactose(10.0);

        mockRecipes = Arrays.asList(recipe1, recipe2, recipe3, recipe4, recipe5, recipe6);
    }

    @Test
    public void checkRecipeListContainsRightIngredients() {
        // Given
        int customerId = 1;
        int nbOfDays = 1;
        int mealsPerDay = 3;
        int numberOfRecipes = 5;

        String[] allergies = informations.getAllergies().split(",");
        String[] intolerances = informations.getIntolerances().split(",");
        String[] prohibitedFood = informations.getProhibited_food().split(",");

        // When
        when(customerService.findByIdCustomer(1)).thenReturn(customer);
        when(informationsService.findByIdCustomer(1)).thenReturn(informations);
        
        List<List<Recipe>> recipeList = progressService.getRecipesForId(customerId, nbOfDays, mealsPerDay, numberOfRecipes, null, null, null,
                null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
                null, null, null, null, null, null);
        // Then
        boolean hasForbiddenIngredient = false;
        for (List<Recipe> recipes : recipeList) {
            for (Recipe recipe : recipes) {
                for (String recipeIngredient : recipe.getIngredients().toString().split(",")) {
                    for (String allergy : allergies) {
                        if (recipeIngredient.trim().equalsIgnoreCase(allergy.trim())) {
                            hasForbiddenIngredient = true;
                            break;
                        }
                    }
                    for (String intolerance : intolerances) {
                        if (recipeIngredient.trim().equalsIgnoreCase(intolerance.trim())) {
                            hasForbiddenIngredient = true;
                            break;
                        }
                    }
                    for (String forbidden : prohibitedFood) {
                        if (recipeIngredient.trim().equalsIgnoreCase(forbidden.trim())) {
                            hasForbiddenIngredient = true;
                            break;
                        }
                    }
                }
            }
        }
        assertFalse(hasForbiddenIngredient);
    }

    @Test
    public void checkRecipeListCalorieAmount() {
        // Given
        int customerId = 1;
        int nbOfDays = 1;
        int mealsPerDay = 3;
        int numberOfRecipes = 6;

        DateFormat formatter = new SimpleDateFormat("yyyyMMdd");
        int today = Integer.parseInt(formatter.format(new java.util.Date()));
        int birthday = Integer.parseInt(formatter.format(customer.getCustomer_birthdate()));
        int age = (today - birthday) / 10000;
        double calories = progressService.avgCalories(informations.getWeight(), informations.getHeight(), age, customer.getGender(), mealsPerDay);
        // When
        when(customerService.findByIdCustomer(1)).thenReturn(customer);
        when(informationsService.findByIdCustomer(1)).thenReturn(informations);

        List<List<Recipe>> recipeList = progressService.getRecipesForId(customerId, nbOfDays, mealsPerDay, numberOfRecipes, null, null, null,
                null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
                null, null, null, null, null, null);

        // Then
        boolean hasRightCalories = true;
        for (List<Recipe> recipes : recipeList) {
            for (Recipe recipe : recipes) {
                if (recipe.getCalorieCount() < calories) {
                    hasRightCalories = false;
                    break;
                }
            }
        }
        assertTrue(hasRightCalories);
    }
}
