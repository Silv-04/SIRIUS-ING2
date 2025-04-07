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

export async function projection(id, objective, numberOfMeals,
    minGlucides,
    maxGlucides,
    minLipides,
    maxLipides,
    minGlucose,
    maxGlucose,
    minLactose,
    maxLactose,
    minMaltose,
    maxMaltose,
    minAmidon,
    maxAmidon,
    minFibres,
    maxFibres,
    minCholesterol,
    maxCholesterol,
    minSel,
    maxSel,
    minCalcium,
    maxCalcium,
    minCuivre,
    maxCuivre,
    minFer,
    maxFer,
    minProteines625,
    maxProteines625) {
    const params = new URLSearchParams();

    const addParam = (key, value) => {
        if (value !== null && value !== undefined) {
            params.append(key, value);
        }
    };

    addParam("id", id);
    addParam("objective", objective);
    addParam("mealsPerDay", numberOfMeals);
    addParam("minGlucides", minGlucides);
    addParam("maxGlucides", maxGlucides);
    addParam("minLipides", minLipides);
    addParam("maxLipides", maxLipides);
    addParam("minGlucose", minGlucose);
    addParam("maxGlucose", maxGlucose);
    addParam("minLactose", minLactose);
    addParam("maxLactose", maxLactose);
    addParam("minMaltose", minMaltose);
    addParam("maxMaltose", maxMaltose);
    addParam("minAmidon", minAmidon);
    addParam("maxAmidon", maxAmidon);
    addParam("minFibres", minFibres);
    addParam("maxFibres", maxFibres);
    addParam("minCholesterol", minCholesterol);
    addParam("maxCholesterol", maxCholesterol);
    addParam("minSel", minSel);
    addParam("maxSel", maxSel);
    addParam("minCalcium", minCalcium);
    addParam("maxCalcium", maxCalcium);
    addParam("minCuivre", minCuivre);
    addParam("maxCuivre", maxCuivre);
    addParam("minFer", minFer);
    addParam("maxFer", maxFer);
    addParam("minProteines625", minProteines625);
    addParam("maxProteines625", maxProteines625);

    return await axios.get(`${GET_PROJECTION_VALUES}?${params.toString()}`);
}

export async function generateRecipesList(id, numberOfDays, numberOfMeals, sortValue, n,
    minGlucides,
    maxGlucides,
    minLipides,
    maxLipides,
    minGlucose,
    maxGlucose,
    minLactose,
    maxLactose,
    minMaltose,
    maxMaltose,
    minAmidon,
    maxAmidon,
    minFibres,
    maxFibres,
    minCholesterol,
    maxCholesterol,
    minSel,
    maxSel,
    minCalcium,
    maxCalcium,
    minCuivre,
    maxCuivre,
    minFer,
    maxFer,
    minProteines625,
    maxProteines625
) {
    const params = new URLSearchParams();

    const addParam = (key, value) => {
        if (value !== null && value !== undefined) {
            params.append(key, value);
        }
    };

    addParam("numberOfDays", numberOfDays);
    addParam("mealsPerDay", numberOfMeals);
    addParam("orderOption", sortValue);
    addParam("n", n);
    addParam("minGlucides", minGlucides);
    addParam("maxGlucides", maxGlucides);
    addParam("minLipides", minLipides);
    addParam("maxLipides", maxLipides);
    addParam("minGlucose", minGlucose);
    addParam("maxGlucose", maxGlucose);
    addParam("minLactose", minLactose);
    addParam("maxLactose", maxLactose);
    addParam("minMaltose", minMaltose);
    addParam("maxMaltose", maxMaltose);
    addParam("minAmidon", minAmidon);
    addParam("maxAmidon", maxAmidon);
    addParam("minFibres", minFibres);
    addParam("maxFibres", maxFibres);
    addParam("minCholesterol", minCholesterol);
    addParam("maxCholesterol", maxCholesterol);
    addParam("minSel", minSel);
    addParam("maxSel", maxSel);
    addParam("minCalcium", minCalcium);
    addParam("maxCalcium", maxCalcium);
    addParam("minCuivre", minCuivre);
    addParam("maxCuivre", maxCuivre);
    addParam("minFer", minFer);
    addParam("maxFer", maxFer);
    addParam("minProteines625", minProteines625);
    addParam("maxProteines625", maxProteines625);

    return await axios.get(`${GET_RECIPES_BY_CUSTOMER}/${id}?${params.toString()}`);
}

export async function createCustomer(customer_lastname, customer_firstname, customer_birthdate, gender, customer_phone_number, customer_mail, city, address, postal_code, date_creation) {
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