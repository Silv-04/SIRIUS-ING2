package upec.episen.sirius.episaine_back.services;

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

import upec.episen.sirius.episaine_back.models.Customer;
import upec.episen.sirius.episaine_back.models.Informations;
import upec.episen.sirius.episaine_back.models.Recipes;

@Service
public class ProgressService {
    protected static Logger progressLogger = LogManager.getLogger(ProgressService.class);

    private RecipesService recipesService;
    private InformationsService informationsService;
    private CustomerService customerService;

    private int perte_min = 100;
    private int perte_max = 500;
    private int gain_min = 100;

    public ProgressService(RecipesService recipesService,
            CustomerService customerService, InformationsService informationsService) throws IOException {
        this.informationsService = informationsService;
        this.recipesService = recipesService;
        this.customerService = customerService;
    }

    /**
     * @param id : given a customer id
     * @param numberOfDays : given a number of days requested
     * @param orderOption : given an order option
     * @param n : given a number of list of recipes
     * @return List<List<Recipes>> : return a list of list of recipes that match the client's informations with a length of n
     */
    public List<List<Recipes>> getRecipesForId(int id, Integer numberOfDays, String orderOption, int n) {
        List<Recipes> recipesList = new ArrayList<>();
        Informations informations = informationsService.findByIdCustomer(id);

        // 1. Get client's informations
        Customer customer = customerService.findByIdCustomer(informations.getFk_customer_id());
        DateFormat formatter = new SimpleDateFormat("yyyyMMdd");
        int today = Integer.parseInt(formatter.format(new Date()));
        int birthday = Integer.parseInt(formatter.format(customer.getCustomer_birthdate()));
        int age = (today - birthday) / 10000;
        String gender = customer.getGender();
        String[] allergiesArray, intolerancesArray, prohibitedFoodsArray, categoriesArray = new String[0];
        String allergies = informations.getAllergies();
        String intolerances = informations.getIntolerances();
        String prohibitedFoods = informations.getProhibited_food();
        String categories = informations.getCuisine_type();
        String regime = informations.getDietary_regime();
        int nbOfMealsPerDay = informations.getMeals_per_day();

        if (allergies.equals("") || allergies == null) {
            allergiesArray = null;
        } else {
            allergiesArray = normalize(allergies.toLowerCase().split(", "));
        }
        if (intolerances.equals("") || intolerances == null) {
            intolerancesArray = null;
        } else {
            intolerancesArray = normalize(intolerances.toLowerCase().split(", "));
        }
        if (prohibitedFoods.equals("") || prohibitedFoods == null) {
            prohibitedFoodsArray = null;
        } else {
            prohibitedFoodsArray = normalize(prohibitedFoods.toLowerCase().split(", "));
        }
        if (categories.equals("") || categories == null) {
            categoriesArray = null;
        } else {
            categoriesArray = normalize(categories.toLowerCase().split(", "));
        }

        double calories = avgCalories(informations.getWeight(), informations.getHeight(), age, gender, nbOfMealsPerDay);
        progressLogger.info("Calories per meal:" + calories);

        // 2. Get recipes according to client's goals (health goal, regime, cuisine
        // type)
        progressLogger.info("Health goal:" + informations.getHealth_goal());
        switch (informations.getHealth_goal().toLowerCase()) {
            case "gain de poids":
                double gainCalories = calories + gain_min;
                if (!(categoriesArray == null)) {
                    for (String category : categoriesArray) {
                        recipesList.addAll(recipesService.getRecipesFilteredByRegimeCaloriesCategory(regime,
                                (int) Math.floor(gainCalories), null, category, orderOption));
                    }
                } else {
                    recipesList.addAll(recipesService.getRecipesFilteredByRegimeCaloriesCategory(regime,
                            (int) Math.floor(gainCalories), null, null, orderOption));
                }
                break;
            case "perte de poids":
                double minLostCalories = calories - perte_min;
                double maxLostCalories = calories - perte_max;
                if (!(categoriesArray == null)) {
                    for (String category : categoriesArray) {
                        recipesList.addAll(recipesService.getRecipesFilteredByRegimeCaloriesCategory(regime,
                                (int) Math.floor(maxLostCalories), (int) Math.floor(minLostCalories), category,
                                orderOption));
                    }
                } else {
                    recipesList.addAll(recipesService.getRecipesFilteredByRegimeCaloriesCategory(regime,
                            (int) Math.floor(maxLostCalories), (int) Math.floor(minLostCalories), null,
                            orderOption));
                }
                break;
            case "maintien de poids":
                double infCalories = calories - perte_min;
                double supCalories = calories + gain_min;
                if (!(categoriesArray == null)) {
                    for (String category : categoriesArray) {
                        recipesList.addAll(recipesService.getRecipesFilteredByRegimeCaloriesCategory(regime,
                                (int) Math.floor(infCalories), (int) Math.floor(supCalories), category, orderOption));
                    }
                } else {
                    recipesList.addAll(recipesService.getRecipesFilteredByRegimeCaloriesCategory(regime,
                            (int) Math.floor(infCalories), (int) Math.floor(supCalories), null, orderOption));
                }
                break;
            default:
                break;
        }
        progressLogger.info("Current list:" + recipesList);

        // 3. Filter recipes according to client's allergies, intolerances and
        // prohibited foods
        recipesList = recipesProductFiltering(allergiesArray, intolerancesArray, prohibitedFoodsArray, recipesList);
        progressLogger.info("Filtered list:" + recipesList);
        // 4. Generate combinations of recipes lists with list of days*mealsPerDay
        // recipes (10 per page)
        List<List<Recipes>> allRecipesLists = new ArrayList<>();
        int combinationSize = numberOfDays * nbOfMealsPerDay;
        getCombination(recipesList, combinationSize, 0, 0, n, new ArrayList<>(), allRecipesLists);
        progressLogger.info("All recipes lists:" + allRecipesLists);
        return allRecipesLists;
    }

    /** 
     * @param weight : given a weight
     * @param height : given a height
     * @param age : given an age
     * @param gender : given a gender
     * @param number_of_meals : given a number of meals
     * @return double : return the average calories the person should take per meal
     */
    // source :
    // https://www.tf1info.fr/sante/la-formule-magique-pour-savoir-a-combien-de-calories-vous-avez-le-droit-par-jour-2268080.html
    public double avgCalories(int weight, int height, int age, String gender, int number_of_meals) {
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
        return calorie / number_of_meals;
    }

    // found in stackoverflow :
    // https://stackoverflow.com/questions/4122170/java-change-áéőűú-to-aeouu
    /**
     * @param stringArray : given a string array
     * @return String[] : return a normalized string array
     */
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

    
    /** 
     * @param allergies : given allergies
     * @param intolerances : given intolerances
     * @param prohibitedFoods : given prohibited foods
     * @param recipesList : given a list of recipes
     * @return List<Recipes> : return a list of recipes that do not contain the prohibited ingredients
     */
    public List<Recipes> recipesProductFiltering(String[] allergies, String[] intolerances, String[] prohibitedFoods,
            List<Recipes> recipesList) {
        Iterator<Recipes> iterator = recipesList.iterator();
        while (iterator.hasNext()) {
            Recipes recipe = iterator.next();
            if (allergies != null) {
                for (String allergy : allergies) {
                    if (!allergy.equals("")) {
                        if (recipe.getIngredients().toLowerCase().contains(allergy)) {
                            iterator.remove();
                            break;
                        }
                    }
                }
            }
            if (intolerances != null) {
                for (String intolerance : intolerances) {
                    if (!intolerance.equals("")) {
                        if (recipe.getIngredients().toLowerCase().contains(intolerance)) {
                            iterator.remove();
                            break;
                        }
                    }
                }
            }
            if (prohibitedFoods != null) {
                for (String prohibitedFood : prohibitedFoods) {
                    if (!prohibitedFood.equals("")) {
                        if (recipe.getIngredients().toLowerCase().contains(prohibitedFood)) {
                            iterator.remove();
                            break;
                        }
                    }
                }
            }
        }
        return recipesList;
    }

    
    // generate a combination of recipes
    // source :
    // https://www.geeksforgeeks.org/print-all-possible-combinations-of-r-elements-in-a-given-array-of-size-n/
    /** 
     * @param recipesList : given a list of recipes
     * @param k : given a number of recipes
     * @param start : given a start index
     * @param cpt : given a counter
     * @param n : given a number of list of recipes
     * @param allRecipesLists : given a list of list of recipes
     * @return int : return the counter
     */
    public static int getCombination(List<Recipes> recipesList, int k, int start, int cpt, int n,
            List<Recipes> currentList, List<List<Recipes>> allRecipesLists) {
        if (cpt >= n) {
            return cpt;
        }

        if (currentList.size() == k) {
            allRecipesLists.add(new ArrayList<>(currentList));
            cpt++;
        }

        for (int i = start; i < recipesList.size(); i++) {
            currentList.add(recipesList.get(i));
            cpt = getCombination(recipesList, k, i + 1, cpt, n, currentList, allRecipesLists);
            currentList.remove(currentList.size() - 1);
        }

        return cpt;
    }

}