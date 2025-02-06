
export const BACKEND_HOST_EPISAINE = process.env.REACT_APP_BACKEND_URL;

// Endpoints pour les clients
export const CREATE_CUSTOMER = BACKEND_HOST_EPISAINE + '/customer/add';
export const READ_CUSTOMERS = BACKEND_HOST_EPISAINE + '/customer/all';
export const UPDATE_CUSTOMER = BACKEND_HOST_EPISAINE + '/customer/update';
export const DELETE_CUSTOMER = BACKEND_HOST_EPISAINE + '/customer/delete';

// ---------------------------------------//
//            Endpoints (KPIs)            //
// ---------------------------------------//

export const FEMALE_COUNT = BACKEND_HOST_EPISAINE + "/api/kpis/customers/count/females";
export const MALE_COUNT = BACKEND_HOST_EPISAINE + "/api/kpis/customers/count/males";
export const TOTAL_COUNT = BACKEND_HOST_EPISAINE + "/api/kpis/customers/count/total";
export const MONTHLY_CUSTOMER_COUNT = BACKEND_HOST_EPISAINE + '/api/kpis/customers/monthly-distribution';
export const AGE_DISTRIBUTION = BACKEND_HOST_EPISAINE + '/api/kpis/customers/age-distribution';

// ---------------------------------------//
//            Endpoints (ALGO KPI)        //
// ---------------------------------------//

//export const CUSTOMER_INFORMATION = BACKEND_HOST_EPISAINE + "/api/customer/informations";

export const CUSTOMER_INFORMATION = BACKEND_HOST_EPISAINE + "/customer/informations";

//export const CUSTOMER_INFORMATION = BACKEND_HOST_EPISAINE + '/customer/get/informations';


