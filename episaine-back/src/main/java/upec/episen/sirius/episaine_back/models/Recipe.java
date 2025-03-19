package upec.episen.sirius.episaine_back.models;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Represents a recipe with its ingredients, instructions, and nutritional information.
 */

@Entity
@Table(name = "recipes")
public class Recipe {

    /** Unique ID of the recipe */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long recipeId;

    /** The name of the recipe */
    private String recipeName;

    /** Calorie count for the recipe */
    private Integer calorieCount;

    /** List of ingredients */
    @ElementCollection
    private List<String> ingredients = new ArrayList<>();

    /** Instructions to follow */
    @Column(columnDefinition = "TEXT")
    private String instructions;

    /** The dietary regime for the recipe */
    private String dietaryRegime;

    /** Nutriment bu recipe*/
    private Double totalGlucides;
    private Double totalLipides;
    private Double totalGlucose;
    private Double totalLactose;
    private Double totalMaltose;
    private Double totalAmidon;
    private Double totalFibres;
    private Double totalCholesterol;
    private Double totalSel;
    private Double totalCalcium;
    private Double totalCuivre;
    private Double totalFer;
    private Double totalProteines625;

    /**
     * Default constructor.
     */
    public Recipe() {}

    /**
     * Full constructor with all the important fields.
     *
     * @param recipeName The name of the recipe
     * @param calorieCount How many calories this recipe has
     * @param ingredients The ingredients needed
     * @param instructions How to make it
     * @param dietaryRegime The dietary category
     * Nutriment "How many grams in this recipe"
     */

    public Recipe(String recipeName, Integer calorieCount, List<String> ingredients, String instructions, String dietaryRegime, Double totalGlucides, Double totalLipides, Double totalGlucose, Double totalLactose, Double totalMaltose, Double totalAmidon, Double totalFibres, Double totalCholesterol, Double totalSel, Double totalCalcium, Double totalCuivre, Double totalFer, Double totalProteines625) {
        this.recipeName = recipeName;
        this.calorieCount = calorieCount;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.dietaryRegime = dietaryRegime;
        this.totalGlucides = totalGlucides;
        this.totalLipides = totalLipides;
        this.totalGlucose = totalGlucose;
        this.totalLactose = totalLactose;
        this.totalMaltose = totalMaltose;
        this.totalAmidon = totalAmidon;
        this.totalFibres = totalFibres;
        this.totalCholesterol = totalCholesterol;
        this.totalSel = totalSel;
        this.totalCalcium = totalCalcium;
        this.totalCuivre = totalCuivre;
        this.totalFer = totalFer;
        this.totalProteines625 = totalProteines625;
    }

    /** @return The unique ID of the recipe */
    public Long getRecipeId() { return recipeId; }
    public void setRecipeId(Long recipeId) { this.recipeId = recipeId; }

    /** @return The name of the recipe */

    public String getRecipeName() { return recipeName; }
    public void setRecipeName(String recipeName) { this.recipeName = recipeName; }

    /** @return The total calorie count of the recipe */

    public Integer getCalorieCount() { return calorieCount; }
    public void setCalorieCount(Integer calorieCount) { this.calorieCount = calorieCount; }

    /** @return The list of ingredients used in the recipe */

    public List<String> getIngredients() { return ingredients; }
    public void setIngredients(List<String> ingredients) { this.ingredients = ingredients; }

    /** @return The preparation instructions for the recipe */

    public String getInstructions() { return instructions; }
    public void setInstructions(String instructions) { this.instructions = instructions; }

    /** @return The dietary category of the recipe */

    public String getDietaryRegime() { return dietaryRegime; }
    public void setDietaryRegime(String dietaryRegime) { this.dietaryRegime = dietaryRegime; }

    /** @return The total amount of carbohydrates in grams */

    public Double getTotalGlucides() { return totalGlucides; }
    public void setTotalGlucides(Double totalGlucides) { this.totalGlucides = totalGlucides; }

    /** @return The total amount of lipids (fats) in grams */

    public Double getTotalLipides() { return totalLipides; }
    public void setTotalLipides(Double totalLipides) { this.totalLipides = totalLipides; }

    /** @return The total amount of glucose in grams */

    public Double getTotalGlucose() { return totalGlucose; }
    public void setTotalGlucose(Double totalGlucose) { this.totalGlucose = totalGlucose; }

    /** @return The total amount of lactose in grams */

    public Double getTotalLactose() { return totalLactose; }
    public void setTotalLactose(Double totalLactose) { this.totalLactose = totalLactose; }

    /** @return The total amount of maltose in grams */

    public Double getTotalMaltose() { return totalMaltose; }
    public void setTotalMaltose(Double totalMaltose) { this.totalMaltose = totalMaltose; }

    /** @return The total amount of starch in grams */

    public Double getTotalAmidon() { return totalAmidon; }
    public void setTotalAmidon(Double totalAmidon) { this.totalAmidon = totalAmidon; }

    /** @return The total amount of fibers in grams */

    public Double getTotalFibres() { return totalFibres; }
    public void setTotalFibres(Double totalFibres) { this.totalFibres = totalFibres; }

    /** @return The total amount of cholesterol in grams */

    public Double getTotalCholesterol() { return totalCholesterol; }
    public void setTotalCholesterol(Double totalCholesterol) { this.totalCholesterol = totalCholesterol; }

    /** @return The total amount of salt in grams */

    public Double getTotalSel() { return totalSel; }
    public void setTotalSel(Double totalSel) { this.totalSel = totalSel; }

    /** @return The total amount of calcium in grams */

    public Double getTotalCalcium() { return totalCalcium; }
    public void setTotalCalcium(Double totalCalcium) { this.totalCalcium = totalCalcium; }

    /** @return The total amount of copper in grams */

    public Double getTotalCuivre() { return totalCuivre; }
    public void setTotalCuivre(Double totalCuivre) { this.totalCuivre = totalCuivre; }

    /** @return The total amount of iron in grams */

    public Double getTotalFer() { return totalFer; }
    public void setTotalFer(Double totalFer) { this.totalFer = totalFer; }

    /** @return The total amount of proteins in grams */

    public Double getTotalProteines625() { return totalProteines625; }
    public void setTotalProteines625(Double totalProteines625) { this.totalProteines625 = totalProteines625; }

}
