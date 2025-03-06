import React, { useEffect, useState } from "react";
import {Box, Flex, Heading, Spinner, Table, Thead, Tbody, Tr, Th, Td, Button} from "@chakra-ui/react";
import Navbar from "../../components/nutritionist/navbar";
import { GENERATE_RECIPE } from "../../constants/back";

// Main component to display the list of recipes
export default function Recipe() {
    // State variables :
    // Store the list of recipes
    const [recipes, setRecipes] = useState([]);
    // Loading state
    const [loading, setLoading] = useState(false);
    // Current page for pagination
    const [currentPage, setCurrentPage] = useState(1);
    // Number of recipes per page of pagination
    const recipesPerPage = 8;

    // Function to generate a new recipe
    const generateRecipe = () => {
        setLoading(true);
        fetch(GENERATE_RECIPE, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })
            .then((response) => response.json())
            .then((newRecipe) => {
                setRecipes((prevRecipes) => [...prevRecipes, newRecipe]); // Add new recipe to the list
                setLoading(false);
            })
            .catch((err) => {
                console.error("Problème dans la récupération de données :", err);
                setLoading(false);
            });
    };

    // Pagination
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
    const totalPages = Math.ceil(recipes.length / recipesPerPage);

    return (
        <Box bg="#1f2b3e" minHeight="100vh">
            {/* Sidebar with navigation */}
            <Box position="fixed" w="250px" h="100vh" bg="#0F1C2E" zIndex="1000">
                <Navbar />
            </Box>

            <Box ml="250px" p={6} bg="white" minHeight="100vh">
                <Heading mb={6} size="lg" color="teal.800" textAlign="center">
                    Bibliothèque de Recettes
                </Heading>

                {/* Button to generate a new recipe */}
                <Button onClick={generateRecipe} isLoading={loading} colorScheme="teal" mb={6}>
                    Générer une Nouvelle Recette
                </Button>

                {loading ? (
                    <Spinner size="xl" color="teal.300" />
                ) : (
                    <Table variant="simple">
                        <Thead bg="gray.100">
                            {/* Table to select Recipe genreted only */}
                            <Tr>
                                <Th textAlign="center">Nom de la Recette</Th>
                                <Th textAlign="center">Calories (kcal)</Th>
                                <Th textAlign="center">Instructions</Th>
                                <Th textAlign="center">Régime Alimentaire</Th>
                                <Th textAlign="center">Ingrédients</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {currentRecipes.map((recipe, index) => (
                                <Tr key={index}>
                                    <Td textAlign="center">{recipe.recipeName}</Td>
                                    <Td textAlign="center">{recipe.calorieCount}</Td>
                                    <Td textAlign="center">{recipe.instructions}</Td>
                                    <Td textAlign="center">{recipe.dietaryRegime}</Td>
                                    <Td textAlign="center">
                                        {recipe.ingredients?.join(", ") || "Aucun ingrédient"}
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                )}

                {/* Pagination controls */}
                <Flex justifyContent="center" mt={4}>
                    <Button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        isDisabled={currentPage === 1}
                        mx={2}
                    >
                        Précédent
                    </Button>
                    <Button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        isDisabled={currentPage === totalPages}
                        mx={2}>
                        Suivant
                    </Button>
                </Flex>
            </Box>
        </Box>
    );
}
