import React, { useState } from "react";

const ClientHome = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="h-screen bg-blue-50">
            {/* En-tête */}
            <div className="flex items-center justify-between p-4 bg-blue-500">
                <h1 className="text-white text-2xl font-bold">Accueil Client</h1>
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
                        <li className="text-blue-500 font-semibold">Site 1</li>
                        <li className="text-blue-500 font-semibold">Site 2</li>
                        <li className="text-blue-500 font-semibold">Site 3</li>
                    </ul>
                </div>
            )}

            {/* Contenu principal */}
            <div className="p-4">
                <p>Contenu de la page d'accueil Client...</p>
            </div>
        </div>
    );
};

export default ClientHome;
