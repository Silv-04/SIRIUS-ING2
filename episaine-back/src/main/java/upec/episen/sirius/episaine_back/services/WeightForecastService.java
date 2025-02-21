package upec.episen.sirius.episaine_back.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.javatuples.Pair;

import upec.episen.sirius.episaine_back.models.Recipes;

public class WeightForecastService {
    /* TODO : 
    * Récupérer une liste de recettes avec le numéro du jour associé, et renvoyer une liste sous forme de (numéro de jour, calories totaux du jour)
    * Prendre les informations du client
    * Calculer le poids du client gagné/perdu/rien en fonction des calories du jour J et du poids du client J-1
    * Stocker toutes les valeurs dans une liste sur Y jours
    */

    /*
     * For a given weight, a given number of taken calories, and the calories the person should take daily, return the new weight
     * source : https://www.charles.co/blog/poids/1000-calories-en-kg/
    */
    
    protected static Logger forecastLogger = LogManager.getLogger(WeightForecastService.class);

    public int calculateNewWeight(int weight, int takenCalories, int dailyCalories) {
        int caloriesTaken = dailyCalories - takenCalories;
        int caloriesToWeight = Math.round(caloriesTaken / 7700);
        forecastLogger.info("New weight: " + weight+caloriesToWeight);
        return weight + caloriesToWeight;
    }
    
    /*
     * Given a recipes lists, and the day associated to each recipe, return a map (day, number of calories taken)
     */
    public Map<Integer, Integer> recipesToCaloriesList(List<Pair<Integer, Recipes>> recipesList, int nbOfDays, int nbOfRecipesPerDay) {
        Map<Integer, Integer> caloriesListPerDay = new HashMap<Integer, Integer>();
        for (Pair<Integer, Recipes> temp : recipesList) {
            int key = temp.getValue0();
            if (caloriesListPerDay.containsKey(key)) {
                caloriesListPerDay.put(temp.getValue0(), temp.getValue1().getCalorieCount() + caloriesListPerDay.get(key));
            }
            else {
                caloriesListPerDay.put(temp.getValue0(), temp.getValue1().getCalorieCount());
            }
        }
        return caloriesListPerDay;
    }

    // source : https://www.tf1info.fr/sante/la-formule-magique-pour-savoir-a-combien-de-calories-vous-avez-le-droit-par-jour-2268080.html
    public double caloriesPerDay(int weight, int height, int age, String gender, int number_of_meals) {
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
        forecastLogger.info("Calories per day: " + calorie);
        return calorie;
    }

    /*
     * Given an initial weight, and a list of calories taken/lost per day, return a list of weights per day
     */
    public Map<Integer, Integer> weightEachDay(int height, int age, String gender, int number_of_meals, Integer weight, Map<Integer, Integer> caloriesListPerDay) {
        Map<Integer, Integer> weightList = new HashMap<Integer, Integer>();
        weightList.put(0, weight);

        for (int i = 1; i < caloriesListPerDay.size(); i++) {
            int prevWeight = weightList.get(i-1);
            double avgCalories = caloriesPerDay(prevWeight, height, age, gender, number_of_meals);
            int newWeight = calculateNewWeight(prevWeight, caloriesListPerDay.get(i), (int) Math.round(avgCalories));
            weightList.put(i, newWeight);
        }

        return weightList;
    }

    public Map<Integer, Integer> getRecipesTest(int height, int age, String gender, int number_of_meals, int nbOfDays, int weight, List<Pair<Integer, Recipes>> recipesList) {
        Map<Integer, Integer> caloriesListPerDay = recipesToCaloriesList(recipesList, nbOfDays, number_of_meals);
        forecastLogger.info("Calories list per day: " + caloriesListPerDay.toString());
        Map<Integer, Integer> weights = weightEachDay(height, age, gender, number_of_meals, weight, caloriesListPerDay);
        forecastLogger.info("Weight list: " + weights.toString());
        return weights;
    }
}