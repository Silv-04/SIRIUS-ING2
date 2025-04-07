package upec.episen.sirius.episaine_back;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.javatuples.Pair;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import upec.episen.sirius.episaine_back.dto.WeightProjectionDTO;
import upec.episen.sirius.episaine_back.models.Customer;
import upec.episen.sirius.episaine_back.models.Informations;
import upec.episen.sirius.episaine_back.models.Recipe;
import upec.episen.sirius.episaine_back.services.CustomerService;
import upec.episen.sirius.episaine_back.services.InformationsService;
import upec.episen.sirius.episaine_back.services.ProgressService;
import upec.episen.sirius.episaine_back.services.RecipeService;
import upec.episen.sirius.episaine_back.services.WeightForecastService;

public class WeightForecastTest {
    @Mock
    private CustomerService customerService;
    @Mock
    private InformationsService informationsService;
    @Mock
    private RecipeService recipesService;

    @Mock
    private ProgressService progressService;
    @InjectMocks
    private WeightForecastService weightForecastService;

    private Customer customer;
    private Informations informations;
    private List<List<Recipe>> mockRecipeList;

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

        mockRecipeList = new ArrayList<>();
        for (int i = 1; i <= 30; i++) {
            Recipe recipe1 = new Recipe();
            recipe1.setRecipeId(Long.valueOf(i));;
            recipe1.setCalorieCount(1000);

            Recipe recipe2 = new Recipe();
            recipe2.setRecipeId(Long.valueOf(2*i));;
            recipe2.setCalorieCount(2000);
            List<Recipe> dayRecipes = Arrays.asList(recipe1, recipe2);
            mockRecipeList.add(dayRecipes);
        }
    }

    @Test
    public void weightForecastFinalValueIsRight() {
        // Given
        int objective = 55;
        int mealsPerDay = 1;
        int idCustomer = 1;
        int startDay = 0;

        // When
        when(customerService.findByIdCustomer(idCustomer)).thenReturn(customer);
        when(informationsService.findByIdCustomer(idCustomer)).thenReturn(informations);
        when(progressService.getRecipesForId(anyInt(), any(), any(), anyInt(), any(), any(), any(), any(), any(), any(),
                any(), any(), any(), any(), any(), any(), any(), any(), any(), any(), any(), any(), any(), any(), any(),
                any(), any(), any(), any(), any())).thenReturn(mockRecipeList);

        WeightProjectionDTO weightProjectionDTO = weightForecastService.getWeightList(idCustomer, objective,
                mealsPerDay, startDay, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null,
                null, null, null, null, null, null, null, null, null, null, null);

        Map<Integer, Double> weights = weightProjectionDTO.getWeightProjection();

        // Then
        assertFalse(weights.get(weights.size() - 1) >= objective);
    }
}
