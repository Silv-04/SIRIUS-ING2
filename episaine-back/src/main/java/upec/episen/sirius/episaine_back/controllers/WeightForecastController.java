package upec.episen.sirius.episaine_back.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import upec.episen.sirius.episaine_back.dto.WeightProjectionDTO;
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

    
    /** 
     * @param id : given a customer id
     * @param objective : given an objective
     * @return Map<Integer, Double> : return a map of weight values
     */
    @GetMapping("/getWeightValues")
    public WeightProjectionDTO getRecipesTest(@RequestParam int id, @RequestParam int objective, @RequestParam int mealsPerDay) {
        return weightForecastService.getWeightList(id, objective, mealsPerDay);
    }
}