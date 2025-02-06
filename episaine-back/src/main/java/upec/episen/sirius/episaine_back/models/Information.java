package upec.episen.sirius.episaine_back.models;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Data
@Table(name = "informations")
public class Information {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "information_id")
    private Integer informationId;

    @Column(name = "health_goal")
    private String healthGoal;

    @Column(name = "allergies")
    private String allergies;

    @Column(name = "intolerances")
    private String intolerances;

    @Column(name = "dietary_regime")
    private String dietaryRegime;

    @Column(name = "meals_per_day")
    private Integer mealsPerDay;

    @Column(name = "weight")
    private Integer weight;

    @Column(name = "height")
    private Integer height;

    @Column(name = "age")
    private Integer age;

    @ManyToOne
    @JoinColumn(name = "fk_customer_id", referencedColumnName = "customer_id")
    @JsonIgnoreProperties("informations") // Empêche la boucle infinie lors de la sérialisation
    private Customer customer;
}
