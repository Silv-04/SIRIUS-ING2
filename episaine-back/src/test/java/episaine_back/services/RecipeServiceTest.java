package episaine_back.services;


import jakarta.persistence.EntityManager;
import jakarta.persistence.Query;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import upec.episen.sirius.episaine_back.models.Product;
import upec.episen.sirius.episaine_back.models.Recipe;
import upec.episen.sirius.episaine_back.repositories.ProductRepository;
import upec.episen.sirius.episaine_back.repositories.RecipeRepository;
import upec.episen.sirius.episaine_back.services.RecipeService;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

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

    @Test
    void testGenerateAndSaveMultipleRecipes_returnsValidList() {
        // Arrange
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

        // Ajout d'ingrédients fictifs à la recette
        mockRecipe.setIngredients(List.of("Carotte", "Pâtes", "Courgette"));

        // Spy pour mocker la génération réelle
        RecipeService spyService = Mockito.spy(recipeService);
        doReturn(mockRecipe).when(spyService).generateAndSaveRecipe("vegetarien");

        // Act
        List<Recipe> recipes = spyService.generateAndSaveMultipleRecipes(
                "vegetarien", 1,
                300, 500,  // calories
                0, 100, 0, 100, 0, 100, 0, 100, 0, 100,
                0, 100, 0, 100, 0, 100, 0, 100,
                0, 100, 0, 100, 0, 100, 0, 100
        );

// Assert
        assertEquals(1, recipes.size());
        for (Recipe r : recipes) {
            assertTrue(r.getCalorieCount() >= 300 && r.getCalorieCount() <= 500);
            System.out.println("Recette : " + r.getRecipeName());
            System.out.println("Ingrédients : " + String.join(", ", r.getIngredients()));
        }

    }

}
