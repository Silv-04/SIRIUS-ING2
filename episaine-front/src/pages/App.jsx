import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import HomeNutritionniste from "./nutritionniste/HomeNutritionniste";
import IndicateurPerformance from "./nutritionniste/IndicateurPerformance";
import CustomerMainPage from "./customers/CustomerMainPage";
import RecipesList from "./customers/RecipesList";
import CreateCustomers from "./customers/CreateCustomers";
import ExistingCustomer from "./customers/ExistingCustomer";
import InformationsPage from "./customers/InformationsPage";
import CustomerParameter from "./customers/Parameter"
import Result from "./customers/Result";
import Projection from "./customers/Projection";

import Dashboard from "./nutritionniste/Dashboard";
import Rdv from "./nutritionniste/rdv"
import Recipe from "./nutritionniste/recipe"
import Customer from "./nutritionniste/Customer"
import ParametreNutritionist from "./nutritionniste/Parametre"
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { MultiSelectTheme } from "chakra-multiselect";
import NutritionalPreferences from "./customers/NutritionalPreferences";

function App() {
    const theme = extendTheme({
        components: {
            MultiSelect: MultiSelectTheme
        }
    })
    return (

        <ChakraProvider theme={theme}>
            <Router basename="/episaine">
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/client/" element={<ExistingCustomer />} />
                    <Route path="/client/menu/" element={<CustomerMainPage />} />
                    <Route path="/client/profil/" element={<InformationsPage />} />
                    <Route path="/client/nutrition/" element={<NutritionalPreferences/>} />
                    <Route path="/client/recettes/" element={<RecipesList />} />
                    <Route path="/client/recettes/resultat/" element={<Result />} />
                    <Route path="/client/creation_profil/" element={<CreateCustomers />} />
                    <Route path="/client/parametre/" element={<CustomerParameter />} />
                    <Route path="/client/projection/" element={<Projection />} />

                    <Route path="/nutritionniste/" element={<HomeNutritionniste />} />
                    <Route path="/indicateurPerformance/" element={<IndicateurPerformance />} />
                    <Route path="/dashboard/" element={<Dashboard />} />
                    <Route path="/components/nutritionniste/customer/" element={<Customer />} />
                    <Route path="/components/nutritionniste/rdv/" element={<Rdv />} />
                    <Route path="/components/nutritionniste/recipe/" element={<Recipe />} />
                    <Route path="/components/nutritionniste/Parametre/" element={<ParametreNutritionist />} />
                </Routes>
            </Router>
        </ChakraProvider>
    );
}

export default App;
