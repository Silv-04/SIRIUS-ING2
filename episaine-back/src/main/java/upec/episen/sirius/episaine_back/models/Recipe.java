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
     */
    public Recipe(String recipeName, Integer calorieCount, List<String> ingredients, String instructions, String dietaryRegime) {
        this.recipeName = recipeName;
        this.calorieCount = calorieCount;
        this.ingredients = ingredients;
        this.instructions = instructions;
        this.dietaryRegime = dietaryRegime;
    }

    /** @return The unique ID of the recipe */
    public Long getRecipeId() { return recipeId; }
    public void setRecipeId(Long recipeId) { this.recipeId = recipeId; }

    public String getRecipeName() { return recipeName; }
    public void setRecipeName(String recipeName) { this.recipeName = recipeName; }

    public Integer getCalorieCount() { return calorieCount; }
    public void setCalorieCount(Integer calorieCount) { this.calorieCount = calorieCount; }

    public List<String> getIngredients() { return ingredients; }
    public void setIngredients(List<String> ingredients) { this.ingredients = ingredients; }

    public String getInstructions() { return instructions; }
    public void setInstructions(String instructions) { this.instructions = instructions; }

    public String getDietaryRegime() { return dietaryRegime; }
    public void setDietaryRegime(String dietaryRegime) { this.dietaryRegime = dietaryRegime; }

    @Override
    public String toString() {
        return "Recipe{" + recipeName + '}';
    }
}
