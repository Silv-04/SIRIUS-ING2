import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import HomeNutritionniste from "./Nutritionniste/HomeNutritionniste";
import IndicateurPerformance from "./Nutritionniste/IndicateurPerformance";
import CustomerMainPage from "./customers/CustomerMainPage";
import RUDCustomers from "./customers/RUDCustomers";
import RecipesList from "./customers/RecipesList";
import CreateCustomers from "./customers/CreateCustomers";
import ExistingCustomer from "./customers/ExistingCustomer";
import InformationsPage from "./customers/InformationsPage";

const theme = createTheme();

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    
                    <Route path="/client/" element={<CustomerMainPage/> }/>
                    <Route path="/affichage/" element={<RUDCustomers />} />
                    <Route path="/client/recettes/" element={<ExistingCustomer />} />
                    <Route path="/client/recettes/informations/" element={<InformationsPage />} />
                    <Route path="/client/recettes/informations/resultat/" element={<RecipesList />} />
                    <Route path="/client/recettes/creation_profil/" element={<CreateCustomers />} />

                    <Route path="/nutritionniste" element={<HomeNutritionniste />} />
                    <Route path="/indicateur-performance" element={<IndicateurPerformance />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
