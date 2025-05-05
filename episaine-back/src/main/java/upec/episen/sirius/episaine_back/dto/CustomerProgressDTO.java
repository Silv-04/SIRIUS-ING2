package upec.episen.sirius.episaine_back.dto;

import java.util.Map;

import lombok.Data;

@Data
public class CustomerProgressDTO {
    private Integer customerId;
    private Map<Integer, Double> weightForecast;
}
