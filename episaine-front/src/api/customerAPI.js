import axios from 'axios';
import { CREATE_CUSTOMER, CREATE_INFORMATIONS, GET_INFORMATIONS_BY_CUSTOMER_ID, UPDATE_INFORMATIONS, GET_PROJECTION_VALUES, GET_RECIPES_BY_CUSTOMER } from '../constants/back';

export async function updateCustomerInformation(information) {
    return await axios.post(UPDATE_INFORMATIONS, information);
}

export async function createCustomerInformation(information) {
    return await axios.post(CREATE_INFORMATIONS, information);
}

export async function getCustomerInformationByCustomerId(customerId) {
    return await axios.get(GET_INFORMATIONS_BY_CUSTOMER_ID + "/" + customerId);
}

export async function projection(id, objective, numberOfMeals) {
    return await axios.get(GET_PROJECTION_VALUES + `?id=${id}&objective=${objective}&mealsPerDay=${numberOfMeals}`);
}

export async function generateRecipesList(id, numberOfDays, numberOfMeals, sortValue, n) {
    return await axios.get(GET_RECIPES_BY_CUSTOMER + "/" + id + "?numberOfDays=" + numberOfDays + "&mealsPerDay=" + numberOfMeals + "&orderOption=" + sortValue + "&n=" + n);
}

export async function createCustomer(customer_lastname,customer_firstname,customer_birthdate,gender,customer_phone_number,customer_mail,city,address,postal_code,date_creation) {
    return await axios.post(CREATE_CUSTOMER, {
        customer_lastname,
        customer_firstname,
        customer_birthdate,
        gender,
        customer_phone_number,
        customer_mail,
        city,
        address,
        postal_code,
        date_creation
    });
}