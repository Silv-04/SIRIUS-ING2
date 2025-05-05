package upec.episen.sirius.episaine_back.services;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.javatuples.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import upec.episen.sirius.episaine_back.dto.WeightProjectionDTO;
import upec.episen.sirius.episaine_back.models.Customer;
import upec.episen.sirius.episaine_back.models.Informations;
import upec.episen.sirius.episaine_back.models.Recipe;

@Service
public class WeightForecastService {

    /*
     * For a given weight, a given number of taken calories, and the calories the
     * person should take daily, return the new weight
     * source : https://www.charles.co/blog/poids/1000-calories-en-kg/
     */

    protected static Logger forecastLogger = LogManager.getLogger(WeightForecastService.class);

    @Autowired
    private InformationsService informationsService;
    @Autowired
    private CustomerService customerService;
    @Autowired
    private ProgressService progressService;

    /**
     * @param weight        : given a weight
     * @param takenCalories : given the number of taken calories
     * @param dailyCalories : given the number of daily calories
     * @return double : return the new weight
     */
    public double calculateNewWeight(double weight, int takenCalories, int dailyCalories) {
        double caloriesTaken = takenCalories - dailyCalories;
        double caloriesToWeight = caloriesTaken / 7700;
        return weight + caloriesToWeight;
    }

    /**
     * @param recipeList : given a list of pair of recipe and their corresponding
     *                   day
     * @return Map<Integer, Integer> : return a map of calories per day
     */
    public Map<Integer, Integer> recipeToCaloriesList(List<Pair<Integer, Recipe>> recipeList) {
        Map<Integer, Integer> caloriesListPerDay = new HashMap<Integer, Integer>();
        for (Pair<Integer, Recipe> temp : recipeList) {
            int key = temp.getValue0();
            if (caloriesListPerDay.containsKey(key)) {
                caloriesListPerDay.put(temp.getValue0(),
                        temp.getValue1().getCalorieCount() + caloriesListPerDay.get(key));
            } else {
                caloriesListPerDay.put(temp.getValue0(), temp.getValue1().getCalorieCount());
            }
        }
        return caloriesListPerDay;
    }

    // source :
    // https://www.tf1info.fr/sante/la-formule-magique-pour-savoir-a-combien-de-calories-vous-avez-le-droit-par-jour-2268080.html
    /**
     * @param weight          : given a weight
     * @param height          : given a height
     * @param age             : given an age
     * @param gender          : given a gender
     * @param number_of_meals : given a number of meals
     * @return double : return the calculated number of calories per day
     */
    public double caloriesPerDay(double weight, int height, int age, String gender, int number_of_meals) {
        double calorie = -1;
        switch (gender.toLowerCase()) {
            case "homme":
                calorie = (13.707 * weight) + (492.3 * height / 100) - (6.673 * age) + 77.607;
                break;
            case "femme":
                calorie = (9.740 * weight) + (172.9 * height / 100) - (4.737 * age) + 667.051;
                break;
            default:
                break;
        }
        return calorie;
    }

    /*
     * Given an initial weight, and a list of calories taken/lost per day, return a
     * list of weights per day
     */
    /**
     * @param height             : given a height
     * @param age                : given an age
     * @param gender             : given a gender
     * @param number_of_meals    : given a number of meals
     * @param weight             : given a weight
     * @param caloriesListPerDay : given a list of calories per day
     * @return Map<Integer, Double> : return a map of weights per day
     */
    public Map<Integer, Double> weightEachDay(int height, int age, String gender, int number_of_meals, double weight,
            Map<Integer, Integer> caloriesListPerDay, int startDay) {
        Map<Integer, Double> weightList = new HashMap<Integer, Double>();
        weightList.put(startDay, weight);
        for (int i = 0; i < startDay; i++) {
            weightList.put(i, weight);
        }

        for (int i = 1; i < caloriesListPerDay.size(); i++) {
            double prevWeight = weightList.get(startDay + i - 1);
            double avgCalories = caloriesPerDay(prevWeight, height, age, gender, number_of_meals);
            double newWeight = calculateNewWeight(prevWeight, caloriesListPerDay.get(i), (int) Math.round(avgCalories));
            weightList.put(startDay + i, newWeight);
        }
        return weightList;
    }

    /**
     * @param recipeList : given a list of recipes
     * @return List<Pair<Integer, Recipe>> : return a list of pair of recipes and
     *         their corresponding day
     */
    public List<Pair<Integer, Recipe>> formatRecipeList(List<List<Recipe>> recipeList) {
        List<Pair<Integer, Recipe>> recipeListWithDay = new ArrayList<Pair<Integer, Recipe>>();
        for (int i = 0; i < recipeList.size(); i++) {
            for (int j = 0; j < recipeList.get(i).size(); j++) {
                recipeListWithDay.add(new Pair<Integer, Recipe>(i, recipeList.get(i).get(j)));
            }
        }
        return recipeListWithDay;
    }

    /**
     * @param id        : given a customer id
     * @param objective : given the customer's objective
     * @return Map<Integer, Double> : return a map of weight values per day
     */
    public WeightProjectionDTO getWeightList(int id, int objective, int mealsPerDay, int startDay,
            Double minGlucides,
            Double maxGlucides,
            Double minLipides,
            Double maxLipides,
            Double minGlucose,
            Double maxGlucose,
            Double minLactose,
            Double maxLactose,
            Double minMaltose,
            Double maxMaltose,
            Double minAmidon,
            Double maxAmidon,
            Double minFibres,
            Double maxFibres,
            Double minCholesterol,
            Double maxCholesterol,
            Double minSel,
            Double maxSel,
            Double minCalcium,
            Double maxCalcium,
            Double minCuivre,
            Double maxCuivre,
            Double minFer,
            Double maxFer,
            Double minProteines625,
            Double maxProteines625) {
        Informations informations = informationsService.findByIdCustomer(id);
        Customer customer = customerService.findByIdCustomer(id);

        int height = informations.getHeight();
        DateFormat formatter = new SimpleDateFormat("yyyyMMdd");
        int today = Integer.parseInt(formatter.format(new Date()));
        int birthday = Integer.parseInt(formatter.format(customer.getCustomer_birthdate()));
        int age = (today - birthday) / 10000;
        String gender = customer.getGender();
        int weight = informations.getWeight();

        forecastLogger.info("Original weight: " + weight);

        boolean satisfied = false;
        List<List<Recipe>> recipeList = new ArrayList<List<Recipe>>();
        List<Pair<Integer, Recipe>> recipeListWithDay = new ArrayList<Pair<Integer, Recipe>>();
        Map<Integer, Integer> caloriesListPerDay = new HashMap<Integer, Integer>();
        Map<Integer, Double> weights = new HashMap<Integer, Double>();

        int nbOfDays = 1;

        while (!satisfied) {
            recipeList = progressService.getRecipesForId(id, 1, mealsPerDay, nbOfDays * 30, minGlucides, maxGlucides,
                    minLipides, maxLipides, minGlucose,
                    maxGlucose, minLactose, maxLactose, minMaltose, maxMaltose, minAmidon, maxAmidon,
                    minFibres, maxFibres, minCholesterol, maxCholesterol, minSel, maxSel, minCalcium, maxCalcium,
                    minCuivre,
                    maxCuivre, minFer, maxFer, minProteines625, maxProteines625);
            recipeListWithDay = formatRecipeList(recipeList);
            caloriesListPerDay = recipeToCaloriesList(recipeListWithDay);
            weights = weightEachDay(height, age, gender, mealsPerDay, weight, caloriesListPerDay, startDay);
            switch (informations.getHealth_goal().toLowerCase()) {
                case "gain de poids":
                    if (weights.get(weights.size() - 1) > objective) {
                        satisfied = true;
                    } else {
                        nbOfDays += 1;
                    }
                    break;
                case "perte de poids":
                    if (weights.get(weights.size() - 1) < objective) {
                        satisfied = true;
                    } else {
                        nbOfDays += 1;
                    }
                    break;
                default:
                    nbOfDays += 1;
                    break;
            }
        }
        forecastLogger.info("Weight list: " + weights.toString());
        forecastLogger.info("Recipe list: " + recipeListWithDay.toString());

        return new WeightProjectionDTO(weights, recipeListWithDay);
    }
}