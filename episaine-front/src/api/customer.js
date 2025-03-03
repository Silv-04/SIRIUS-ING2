import axios from 'axios';
import { GET_PROJECTION_VALUES } from '../constants/back';

export async function projection(height, age, gender, number_of_meals, nbOfDays, weight, recipesList) {
    return await axios.get(GET_PROJECTION_VALUES + `?height=${height}&age=${age}&gender&number_of_meals=${number_of_meals}&nbOfDays=${nbOfDays}&weight=${weight}&recipesList=${recipesList}`);
}