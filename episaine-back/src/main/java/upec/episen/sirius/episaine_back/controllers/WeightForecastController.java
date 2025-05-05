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
    public WeightProjectionDTO getRecipesTest(@RequestParam int id, @RequestParam int objective, @RequestParam int mealsPerDay, 
    @RequestParam(required = false, defaultValue = "0") int startDay,
    @RequestParam(required = false) Double minGlucides,
    @RequestParam(required = false) Double maxGlucides,
    @RequestParam(required = false) Double minLipides,
    @RequestParam(required = false) Double maxLipides,
    @RequestParam(required = false) Double minGlucose,
    @RequestParam(required = false) Double maxGlucose,
    @RequestParam(required = false) Double minLactose,
    @RequestParam(required = false) Double maxLactose,
    @RequestParam(required = false) Double minMaltose,
    @RequestParam(required = false) Double maxMaltose,
    @RequestParam(required = false) Double minAmidon,
    @RequestParam(required = false) Double maxAmidon,
    @RequestParam(required = false) Double minFibres,
    @RequestParam(required = false) Double maxFibres,
    @RequestParam(required = false) Double minCholesterol,
    @RequestParam(required = false) Double maxCholesterol,
    @RequestParam(required = false) Double minSel,
    @RequestParam(required = false) Double maxSel,
    @RequestParam(required = false) Double minCalcium,
    @RequestParam(required = false) Double maxCalcium,
    @RequestParam(required = false) Double minCuivre,
    @RequestParam(required = false) Double maxCuivre,
    @RequestParam(required = false) Double minFer,
    @RequestParam(required = false) Double maxFer,
    @RequestParam(required = false) Double minProteines625,
    @RequestParam(required = false) Double maxProteines625) {
        return weightForecastService.getWeightList(id, objective, mealsPerDay, startDay, minGlucides, maxGlucides, minLipides, maxLipides, minGlucose,
        maxGlucose, minLactose, maxLactose, minMaltose, maxMaltose, minAmidon, maxAmidon,
        minFibres, maxFibres, minCholesterol, maxCholesterol, minSel, maxSel, minCalcium, maxCalcium, minCuivre,
        maxCuivre, minFer, maxFer, minProteines625, maxProteines625);
    }
}