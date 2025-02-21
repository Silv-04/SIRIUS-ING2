package upec.episen.sirius.episaine_back.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.javatuples.Pair;

import upec.episen.sirius.episaine_back.models.Recipes;

public class WeightForecast {
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
    public Integer calculateNewWeight(Integer weight, Integer takenCalories, Integer dailyCalories) {
        Integer caloriesTaken = dailyCalories - takenCalories;
        Integer caloriesToWeight = (int) caloriesTaken / 7700;
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
                caloriesListPerDay.put(temp.getValue0() ,temp.getValue1().getCalorieCount() + caloriesListPerDay.get(key));
            }
            else {
                caloriesListPerDay.put(temp.getValue0(), temp.getValue1().getCalorieCount());
            }
        }
        return caloriesListPerDay;
    }
}
