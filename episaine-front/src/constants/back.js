export const BACKEND_HOST_EPISAINE = process.env.REACT_APP_BACKEND_URL;

export const CREATE_CUSTOMER = BACKEND_HOST_EPISAINE + '/customer/add';
export const READ_CUSTOMERS = BACKEND_HOST_EPISAINE + '/customer/get';
export const READ_ALL_CUSTOMERS = BACKEND_HOST_EPISAINE + '/customer/get/all';
export const UPDATE_CUSTOMER = BACKEND_HOST_EPISAINE + '/customer/update';
export const DELETE_CUSTOMER = BACKEND_HOST_EPISAINE + '/customer/delete';

export const FEMALE_COUNT = BACKEND_HOST_EPISAINE + "/api/kpis/customers/count/females";
export const MALE_COUNT = BACKEND_HOST_EPISAINE + "/api/kpis/customers/count/males";
export const TOTAL_COUNT = BACKEND_HOST_EPISAINE + "/api/kpis/customers/count/total";
export const AGE_DISTRIBUTION = BACKEND_HOST_EPISAINE + '/api/kpis/customers/age-distribution';
export const MONTHLY_CUSTOMER_COUNT = BACKEND_HOST_EPISAINE + '/api/kpis/customers/monthly-distribution'

export const GET_RECIPES_BY_CUSTOMER = BACKEND_HOST_EPISAINE + '/recipes/getRecipesList';

export const GET_INFORMATIONS_BY_CUSTOMER_ID = BACKEND_HOST_EPISAINE + '/informations/get';
export const UPDATE_INFORMATIONS = BACKEND_HOST_EPISAINE + '/informations/update';
export const CREATE_INFORMATIONS = BACKEND_HOST_EPISAINE + '/informations/add';

export const GET_RECIPES_LIST = BACKEND_HOST_EPISAINE + "/recipes/getRecipesList";
export const GENERATE_RECIPE = BACKEND_HOST_EPISAINE + "/recipe/generate";



