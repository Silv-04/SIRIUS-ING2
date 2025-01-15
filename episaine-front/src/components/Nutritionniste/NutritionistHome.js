// src/NutritionistHome.js
import React, { useState } from "react";

const NutritionistHome = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="h-screen bg-green-50">
            {/* En-tête */}
            <div className="flex items-center justify-between p-4 bg-green-500">
                <h1 className="text-white text-2xl font-bold">Accueil Nutritionniste</h1>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white hover:text-gray-200"
                >
                    {isOpen ? "Cacher Menu" : "Afficher Menu"}
                </button>
            </div>

            {/* Menu masquable */}
            {isOpen && (
                <div className="bg-white shadow p-4">
                    <ul className="space-y-2">
                        <li className="text-green-500 font-semibold">Site A</li>
                        <li className="text-green-500 font-semibold">Site B</li>
                        <li className="text-green-500 font-semibold">Site C</li>
                    </ul>
                </div>
            )}

            {/* Contenu principal */}
            <div className="p-4">
                <p>Contenu de la page d'accueil Nutritionniste...</p>
            </div>
        </div>
    );
};

export default NutritionistHome;
