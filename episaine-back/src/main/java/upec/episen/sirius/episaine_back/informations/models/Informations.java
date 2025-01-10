package upec.episen.sirius.episaine_back.informations.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="informations")
public class Informations {

    @Id
    @Column(name="information_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer information_id;

    @Column(name="age")
    private Integer age;

    @Column(name="health_goal")
    private String health_goal;

    @Column(name="intolerances")
    private String intolerances;

    @Column(name="allergies")
    private String allergies;

    @Column(name="dietary_regime")
    private String dietary_regime;

    @Column(name="meals_per_day")
    private Integer meals_per_day;

    @Column(name="weight")
    private Integer weight;

    @Column(name="height")
    private Integer height;

    @Column(name="activity_level")
    private String activity_level;

    @Column(name="prohibited_food")
    private String prohibited_food;

    @Column(name="recipe_temperature")
    private String recipe_temperature;

    @Column(name="cuisine_type")
    private String cuisine_type;

    @Column(name="preparation_time")
    private String preparation_time;

    @Column(name="cooking_level")
    private String cooking_level;

    @Column(name="fk_customer_id")
    private Integer fk_customer_id;
}
