// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Welcome/Home";
import HomeNutritionniste from "./components/Nutritionniste/HomeNutritionniste";
import IndicateurPerformance from "./components/Nutritionniste/IndicateurPerformance";

import Customers from "./components/customers/Customers"; // Assurez-vous que ce composant existe

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/nutritionniste" element={<HomeNutritionniste />} /> {/* Ajouter la route pour la page HomeNutritionniste */}
                <Route path="/indicateur-performance" element={<IndicateurPerformance />} />
            </Routes>
        </Router>
    );
}

export default App;
