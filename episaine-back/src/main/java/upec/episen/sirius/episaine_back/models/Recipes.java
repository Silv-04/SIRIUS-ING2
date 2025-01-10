package upec.episen.sirius.episaine_back.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="recipes")
public class Recipes {

    @Id
    @Column(name="recipe_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer recipeId;

    @Column(name="recipe_name")
    private String recipeName;

    @Column(name="calorie_count")
    private Integer calorieCount;

    @Column(name="ingredients")
    private String ingredients;

    @Column(name="instructions")
    private String instructions;

    @Column(name="dietary_regime")
    private String dietaryRegime;

    @Column(name="fk_nutritionist_id")
    private Integer fkNutritionistId;
}
