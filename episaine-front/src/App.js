import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Welcome/Home";
import HomeNutritionniste from "./components/Nutritionniste/HomeNutritionniste";
import IndicateurPerformance from "./components/Nutritionniste/IndicateurPerformance";
import Dashboard from "./components/Nutritionniste/Dashboard";
import Costumer from "./components/customers/Costumer";
import Rdv from "./components/Nutritionniste/rdv";
import Recipe from "./components/Nutritionniste/recipe";
import Parametre from "./components/Nutritionniste/Parametre";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/nutritionniste" element={<HomeNutritionniste />} />
                <Route path="/IndicateurPerformance" element={<IndicateurPerformance />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/components/Nutritionniste/Costumer" element={<Costumer />} />
                <Route path="/components/Nutritionniste/rdv" element={<Rdv />} />
                <Route path="/components/Nutritionniste/Parametre" element={<Parametre />} />
                <Route path="/components/Nutritionniste/recipe" element={<Recipe />} />
            </Routes>
        </Router>
    );
}

export default App;
