package upec.episen.sirius.episaine_back.controllers;

import java.util.List;
import java.util.Map;

import org.javatuples.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import upec.episen.sirius.episaine_back.models.Recipes;
import upec.episen.sirius.episaine_back.services.WeightForecastService;

@CrossOrigin
@RestController
@RequestMapping("/weight-forecast")
public class WeightForecastController {

    @Autowired
    private final WeightForecastService weightForecastService;

    public WeightForecastController(WeightForecastService weightForecastService) {
        this.weightForecastService = weightForecastService;
    }

    @GetMapping("/getWeightValues")
    public Map<Integer, Integer> getRecipesTest(@RequestParam int height, @RequestParam int age,
            @RequestParam String gender, @RequestParam int number_of_meals, @RequestParam int nbOfDays,
            @RequestParam int weight, @RequestParam List<Pair<Integer, Recipes>> recipesList) {
        return weightForecastService.recipesToCaloriesList(recipesList, nbOfDays, number_of_meals);
    }
}
