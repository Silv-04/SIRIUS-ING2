import axios from 'axios';
import { CREATE_INFORMATIONS, GET_INFORMATIONS_BY_CUSTOMER_ID, UPDATE_INFORMATIONS, GET_PROJECTION_VALUES } from '../constants/back';

export async function updateCustomerInformation(information) {
    return await axios.post(UPDATE_INFORMATIONS, information);
}

export async function createCustomerInformation(information) {
    return await axios.post(CREATE_INFORMATIONS, information);
}

export async function getCustomerInformationByCustomerId(customerId) {
    return await axios.get(GET_INFORMATIONS_BY_CUSTOMER_ID + "/" + customerId);
}

export async function projection(height, age, gender, number_of_meals, nbOfDays, weight, recipesList) {
    return await axios.get(GET_PROJECTION_VALUES + `?height=${height}&age=${age}&gender&number_of_meals=${number_of_meals}&nbOfDays=${nbOfDays}&weight=${weight}&recipesList=${recipesList}`);
}