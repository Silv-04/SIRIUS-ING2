package upec.episen.sirius.episaine_back.models;

import java.util.Map;

import org.hibernate.annotations.Type;

import com.vladmihalcea.hibernate.type.json.JsonType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="progress")
public class CustomerProgress {

    @Id
    @Column(name="progress_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer progress_id;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;
    
    @Type(JsonType.class)
    @Column(name="weight_forecast", columnDefinition = "jsonb")
    private Map<Integer, Double> weight_forecast;
}