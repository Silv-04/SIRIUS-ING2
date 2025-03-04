import axios from 'axios';
import { CREATE_INFORMATIONS, GET_INFORMATIONS_BY_CUSTOMER_ID, UPDATE_INFORMATIONS } from '../constants/back';

export async function updateCustomerInformation(information) {
    return await axios.post(UPDATE_INFORMATIONS, information);
}

export async function createCustomerInformation(information) {
    return await axios.post(CREATE_INFORMATIONS, information);
}

export async function getCustomerInformationByCustomerId(customerId) {
    return await axios.get(GET_INFORMATIONS_BY_CUSTOMER_ID + "/" + customerId);
}
