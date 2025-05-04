package upec.episen.sirius.episaine_back.dto;

import java.util.List;
import java.util.Map;

import org.javatuples.Pair;

import upec.episen.sirius.episaine_back.models.Recipe;

public class WeightProjectionDTO {
    private Map<Integer, Double> weightProjection;
    private List<Pair<Integer, Recipe>> recipes;
    
    public WeightProjectionDTO(Map<Integer, Double> weightProjection, List<Pair<Integer, Recipe>> recipes) {
        this.weightProjection = weightProjection;
        this.recipes = recipes;
    }
    public Map<Integer, Double> getWeightProjection() {
        return weightProjection;
    }
    public void setWeightProjection(Map<Integer, Double> weightProjection) {
        this.weightProjection = weightProjection;
    }
    public List<Pair<Integer, Recipe>> getRecipes() {
        return recipes;
    }
    public void setRecipes(List<Pair<Integer, Recipe>> recipes) {
        this.recipes = recipes;
    }
}
