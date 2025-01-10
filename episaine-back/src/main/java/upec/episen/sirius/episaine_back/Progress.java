package upec.episen.sirius.episaine_back;

import java.io.IOException;
import java.text.DateFormat;
import java.text.Normalizer;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Pattern;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Service;

import upec.episen.sirius.episaine_back.customers.models.Customer;
import upec.episen.sirius.episaine_back.customers.services.CustomerService;
import upec.episen.sirius.episaine_back.informations.models.Informations;
import upec.episen.sirius.episaine_back.informations.services.InformationsService;
import upec.episen.sirius.episaine_back.recipes.models.Recipes;
import upec.episen.sirius.episaine_back.recipes.services.RecipesService;

@Service
public class Progress {
    /* TODO : 
     * 1. Récupérer les informations du clients
     * 2. Récupérer les recettes répondant aux besoins clients
     * 3. Créer des listes de recettes selon les besoins clients
     * 4. Générer les projections sur une durée X sous forme de hashtabl (poids, temps) pour chaque liste de recette
    */

    // 1. Récupérer les informations du clients
    protected static Logger progressLogger = LogManager.getLogger(Progress.class);

    private InformationsService informationsService;
    private RecipesService recipesService;
    private CustomerService customerService;

    private int perte_min = 300;
    private int perte_max = 800;
    private int gain_min = 300;

    public Progress(InformationsService informationsService, RecipesService recipesService, CustomerService customerService) throws IOException {
        this.informationsService = informationsService;
        this.recipesService = recipesService;
        this.customerService = customerService;
    }

    public List<List<Recipes>> getRecipesForId(int id, Integer numberOfDays) {
        List<Recipes> recipesList = null;

        // 1. Récupérer les informations du clients
        Customer customer = customerService.findByIdCustomer(id);
        progressLogger.info("Customer " + id + "loaded.");
        Informations informations = informationsService.findByIdCustomer(id);
        progressLogger.info("Customer " + id + "informations found.");
        String goal = informations.getHealth_goal();
        int weight = informations.getWeight();
        int height = informations.getHeight();

        DateFormat formatter = new SimpleDateFormat("yyyyMMdd"); 
        int today = Integer.parseInt(formatter.format(new Date()));
        int birthday = Integer.parseInt(formatter.format(customer.getCustomer_birthdate()));
        int age = (today - birthday)/10000;
        int number_of_meals = informations.getMeals_per_day();
        String gender = customer.getGender();
        String regime = informations.getDietary_regime();
        String category = informations.getCuisine_type();

        double calories = avgCalories(weight, height, age, gender, number_of_meals);

        // 2. Récupérer les recettes répondant aux besoins clients
        switch (goal.toLowerCase()) {
            case "gain de poids":
                double gainCalories = calories + gain_min;
                recipesList = recipesService.getRecipesFilteredByRegimeCaloriesCategory(regime, (int) Math.floor(gainCalories), null, category);
                break;
            case "perte de poids":
                double minLostCalories = calories - perte_min;
                double maxLostCalories = calories - perte_max;
                recipesList = recipesService.getRecipesFilteredByRegimeCaloriesCategory(regime, (int) Math.floor(minLostCalories), (int) Math.floor(maxLostCalories), category);
                break;
            case "maintien de poids":
                double infCalories = calories - perte_min;
                double supCalories = calories + gain_min;
                recipesList = recipesService.getRecipesFilteredByRegimeCaloriesCategory(regime, (int) Math.floor(infCalories), (int) Math.floor(supCalories), category);
                break;
            default:
                break;
        }

        progressLogger.info("Recipes list initialized.");
        progressLogger.info("Number of recipes loaded: "+ recipesList.size());
        progressLogger.info("List of recipes: " + recipesList.toString());

        String[] allergies = normalize(informations.getAllergies().split(","));
        String[] intolerances = normalize(informations.getIntolerances().split(","));
        String[] prohibitedFoods = normalize(informations.getProhibited_food().split(","));
        
        recipesList = recipesProductFiltering(allergies, intolerances, prohibitedFoods, recipesList);
        
        progressLogger.info("Recipes list filtered.");
        progressLogger.info("Number of recipes loaded: "+ recipesList.size());
        progressLogger.info("List of recipes: " + recipesList.toString());

        List<List<Recipes>> allRecipesLists = new ArrayList<>();
        generateCombinations(recipesList, numberOfDays * number_of_meals, 0, new ArrayList<>(), allRecipesLists);

        progressLogger.info("Recipes combinations list calculated.");
        progressLogger.info("Number of lists: "+ allRecipesLists.size());
        progressLogger.info("Lists of combinations: " + allRecipesLists.toString());

        return allRecipesLists;
    }

    // source : https://www.tf1info.fr/sante/la-formule-magique-pour-savoir-a-combien-de-calories-vous-avez-le-droit-par-jour-2268080.html
    public double avgCalories(int weight, int height, int age, String gender, int number_of_meals) {
        double calorie = -1;
        switch (gender.toLowerCase()) {
            case "homme":
                calorie=(13.707 * weight) + (492.3 * height/100) - (6.673 * age) + 77.607;
                break;
            case "femme":
                calorie=(9.740 * weight) + (172.9 * height/100) - (4.737 * age) + 667.051;
                break;
            default:
                break;
        }
        return calorie/number_of_meals;
    }

    public String[] normalize(String[] stringArray) {
        for (int i = 0; i < stringArray.length; i++) {
            String str = stringArray[i];
            str = str.replace("Œ", "oe").replace("œ", "oe");
    
            String normalized = Normalizer.normalize(str, Normalizer.Form.NFD);
            Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
            str = pattern.matcher(normalized).replaceAll("");
            
            stringArray[i] = str;
        }
        return stringArray;
    }
    
    // remove recipes that contain prohibited ingredients
    public List<Recipes> recipesProductFiltering(String[] allergies, String[] intolerances, String[] prohibitedFoods, List<Recipes> recipesList) {
        Iterator<Recipes> iterator = recipesList.iterator();
        while (iterator.hasNext()) {
            Recipes recipe = iterator.next();
            for (String allergy : allergies) {
                if (recipe.getIngredients().toLowerCase().contains(allergy)) {
                    iterator.remove();
                    break;
                }
            }
            for (String intolerance : intolerances) {
                if (recipe.getIngredients().toLowerCase().contains(intolerance)) {
                    iterator.remove();
                    break;
                }
            }
            for (String prohibitedFood : prohibitedFoods) {
                if (recipe.getIngredients().toLowerCase().contains(prohibitedFood)) {
                    iterator.remove();
                    break;
                }
            }
        }
        return recipesList;
    }

    public static void generateCombinations(List<Recipes> recipesList, int n, int start, List<Recipes> currentList, List<List<Recipes>> allRecipesLists) {
        if (currentList.size() == n) {
            allRecipesLists.add(new ArrayList<>(currentList));
            progressLogger.info("List of recipes added: " + currentList.toString());
            return;
        }
        for (int i = start; i < recipesList.size(); i++) {
            currentList.add(recipesList.get(i));
            progressLogger.info("Recipe added: " + recipesList.get(i).toString());
            progressLogger.info("Current list: " + currentList.toString());
            progressLogger.info("Current list size: " + currentList.size());
            generateCombinations(recipesList, n, i + 1, currentList, allRecipesLists);
            currentList.remove(currentList.size() - 1);
        }
    }
}
