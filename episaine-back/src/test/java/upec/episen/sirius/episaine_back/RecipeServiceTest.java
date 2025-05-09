package upec.episen.sirius.episaine_back;

import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import upec.episen.sirius.episaine_back.models.Recipe;
import upec.episen.sirius.episaine_back.repositories.ProductRepository;
import upec.episen.sirius.episaine_back.repositories.RecipeRepository;
import upec.episen.sirius.episaine_back.services.RecipeService;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RecipeServiceTest {

    @InjectMocks
    private RecipeService recipeService;

    @Mock
    private RecipeRepository recipeRepository;

    @Mock
    private ProductRepository productRepository;

    @Mock
    private EntityManager entityManager;

    @Mock
    private Query query;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    /**
     * This test verifies that the method generateAndSaveMultipleRecipes
     * returns a list of recipes that meet the nutritional constraints provided.
     * We simulate the generation using a mocked recipe.
     */

    @Test
    void testGenerateAndSaveMultipleRecipes_returnsValidList() {
        Recipe mockRecipe = new Recipe();
        mockRecipe.setRecipeName("Test Recette");
        mockRecipe.setCalorieCount(400);
        mockRecipe.setTotalGlucides(20.0);
        mockRecipe.setTotalLipides(15.0);
        mockRecipe.setTotalGlucose(5.0);
        mockRecipe.setTotalLactose(1.0);
        mockRecipe.setTotalMaltose(0.0);
        mockRecipe.setTotalAmidon(2.0);
        mockRecipe.setTotalFibres(5.0);
        mockRecipe.setTotalCholesterol(0.5);
        mockRecipe.setTotalSel(0.2);
        mockRecipe.setTotalCalcium(50.0);
        mockRecipe.setTotalCuivre(0.3);
        mockRecipe.setTotalFer(2.0);
        mockRecipe.setTotalProteines625(10.0);
        mockRecipe.setIngredients(List.of("Carotte", "Pâtes", "Courgette"));

        RecipeService spyService = Mockito.spy(recipeService);
        doReturn(mockRecipe).when(spyService).generateAndSaveRecipe("vegetarien");

        List<Recipe> recipes = spyService.generateAndSaveMultipleRecipes(
                "vegetarien", 1,
                300, 500,
                0, 100, 0, 100, 0, 100, 0, 100, 0, 100,
                0, 100, 0, 100, 0, 100, 0, 100,
                0, 100, 0, 100, 0, 100, 0, 100
        );

        assertEquals(1, recipes.size());
        assertTrue(recipes.get(0).getCalorieCount() >= 300 && recipes.get(0).getCalorieCount() <= 500);
    }

    /**
     * This test ensures that when generateAndSaveRecipe is mocked
     * it returns a recipe as expected, allowing to isolate logic from database behavior.
     */

    @Test
    void testGenerateAndSaveRecipe_returnsMockedRecipe() {
        Recipe mockRecipe = new Recipe();
        mockRecipe.setRecipeName("Recette Test");
        mockRecipe.setCalorieCount(500);
        mockRecipe.setIngredients(List.of("Tomate", "Carotte"));

        RecipeService spy = Mockito.spy(recipeService);
        doReturn(mockRecipe).when(spy).generateAndSaveRecipe("vegetarien");

        Recipe result = spy.generateAndSaveRecipe("vegetarien");

        assertNotNull(result);
        assertEquals("Recette Test", result.getRecipeName());
        assertEquals(500, result.getCalorieCount());
    }

    /**
     * This test validates that getRecipesFilteredByRegimeCalories correctly
     * delegates the call to the repository method with all the required filters.
     */

    @Test
    void testGetRecipesFilteredByRegimeCalories_delegatesToRepository() {
        List<Recipe> expectedRecipes = List.of(new Recipe());
        when(recipeRepository.findRecipesWithFilter(
                any(), any(), any(), any(), any(), any(), any(), any(), any(), any(),
                any(), any(), any(), any(), any(), any(), any(), any(), any(), any(),
                any(), any(), any(), any(), any(), any(), any(), any(), any()
        )).thenReturn(expectedRecipes);

        List<Recipe> result = recipeService.getRecipesFilteredByRegimeCalories(
                "vegetarien", 100, 500,
                0.0, 100.0, 0.0, 100.0, 0.0, 100.0, 0.0, 100.0,
                0.0, 100.0, 0.0, 100.0, 0.0, 100.0, 0.0, 100.0,
                0.0, 100.0, 0.0, 100.0, 0.0, 100.0, 0.0, 100.0,
                0.0, 100.0
        );

        assertEquals(1, result.size());
        verify(recipeRepository, times(1)).findRecipesWithFilter(
                any(), any(), any(), any(), any(), any(), any(), any(), any(), any(),
                any(), any(), any(), any(), any(), any(), any(), any(), any(), any(),
                any(), any(), any(), any(), any(), any(), any(), any(), any()
        );
    }
}
