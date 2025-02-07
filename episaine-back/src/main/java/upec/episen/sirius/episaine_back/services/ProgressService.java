package upec.episen.sirius.episaine_back.services;

import java.io.IOException;
import java.text.DateFormat;
import java.text.Normalizer;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Random;
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
    private int perte_max = 300;
    private int gain_min = 100;

    public ProgressService(RecipesService recipesService,
            CustomerService customerService, InformationsService informationsService) throws IOException {
        this.informationsService = informationsService;
        this.recipesService = recipesService;
        this.customerService = customerService;
    }

    public List<List<Recipes>> getRecipesForId(int id, Integer numberOfDays, String orderOption, int page) {
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

        progressLogger.info("Calories: " + calories + ", objective: " + informations.getHealth_goal() + ", nb of days: "
                + numberOfDays + ", nb of meals:" + nbOfMealsPerDay + ", regime:" + regime);

        // 2. Get recipes according to client's goals (health goal, regime, cuisine
        // type)
        switch (informations.getHealth_goal().toLowerCase()) {
            case "gain de poids":
                double gainCalories = calories + gain_min;
                if (!(categoriesArray == null)) {
                    for (String category : categoriesArray) {
                        recipesList.addAll(recipesService.getRecipesFilteredByRegimeCaloriesCategory(regime,
                                (int) Math.floor(gainCalories), null, category, orderOption));
                    }
                    progressLogger.info("non nul");
                } else {
                    recipesList.addAll(recipesService.getRecipesFilteredByRegimeCaloriesCategory(regime,
                            (int) Math.floor(gainCalories), null, null, orderOption));
                    progressLogger.info("nul");
                }
                break;
            case "perte de poids":
                double minLostCalories = calories - perte_min;
                double maxLostCalories = calories - perte_max;
                if (!(categoriesArray == null)) {
                    for (String category : categoriesArray) {
                        recipesList.addAll(recipesService.getRecipesFilteredByRegimeCaloriesCategory(regime,
                                (int) Math.floor(minLostCalories), (int) Math.floor(maxLostCalories), category,
                                orderOption));
                    }
                } else {
                    recipesList.addAll(recipesService.getRecipesFilteredByRegimeCaloriesCategory(regime,
                            (int) Math.floor(minLostCalories), (int) Math.floor(maxLostCalories), null,
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

        // 3. Filter recipes according to client's allergies, intolerances and prohibited foods
        recipesList = recipesProductFiltering(allergiesArray, intolerancesArray, prohibitedFoodsArray, recipesList);
        progressLogger.info("Filtered list:" + recipesList);

        // 4. Generate combinations of recipes lists with list of days*mealsPerDay recipes (10 per page)
        List<List<Recipes>> allRecipesLists = new ArrayList<>();

        int combinationSize = numberOfDays * nbOfMealsPerDay;
        int pageSize = 10;
        long startIndex = (long) page * pageSize;

        for (int i = 0; i < pageSize; i++) {
            long index = startIndex + i;
            List<Recipes> combination = getCombination(recipesList, combinationSize, index);
            progressLogger.info("Added recipe: " + combination.toString());
            allRecipesLists.add(combination);
        }

        return allRecipesLists;
    }

    // source : https://www.tf1info.fr/sante/la-formule-magique-pour-savoir-a-combien-de-calories-vous-avez-le-droit-par-jour-2268080.html
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

    // found in stackoverflow : https://stackoverflow.com/questions/4122170/java-change-áéőűú-to-aeouu
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
    public static List<Recipes> getCombination(List<Recipes> recipes, int combinationSize, long index) {
        int n = recipes.size();
        List<Recipes> combination = new ArrayList<>();

        if (combinationSize > n || combinationSize <= 0) {
            return combination;
        }

        long currentIndex = index;
        for (int i = 0; i < combinationSize; i++) {
            int remainingElements = n - (i + 1);

            int chosenIndex = (int) (currentIndex % (remainingElements + 1));
            combination.add(recipes.get(chosenIndex));

            Collections.swap(recipes, chosenIndex, remainingElements);
            currentIndex /= (remainingElements + 1);
        }

        return combination;
    }
}
