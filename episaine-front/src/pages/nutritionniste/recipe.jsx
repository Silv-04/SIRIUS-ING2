import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Spinner, Table, Thead, Tbody, Tr, Th, Td, Button, Input } from "@chakra-ui/react";
import Navbar from "../../components/nutritionist/navbar";
import { GET_RECIPES_LIST, GENERATE_RECIPE } from "../../constants/back";

// Main component to display the list of recipes
export default function Recipe() {
    // State variables :
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [recipeCount, setRecipeCount] = useState(1); // Default number of recipes to generate

    // Fetch recipes from the API when the component mounts
    useEffect(() => {
        setLoading(true);
        fetch(GET_RECIPES_LIST)
            .then((response) => response.json())
            .then((data) => {
                setRecipes(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading recipes:", err);
                setLoading(false);
            });
    }, []);

    // Function to generate new recipes
    const generateRecipe = () => {
        setLoading(true);
        fetch(GENERATE_RECIPE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(recipeCount) // Envoie juste le nombre
        })
            .then((response) => response.json())
            .then((newRecipes) => {
                if (!Array.isArray(newRecipes)) {
                    newRecipes = [newRecipes]; // Si la réponse est un seul objet, on le met dans un tableau
                }
                setRecipes([...newRecipes]); // Remplace toutes les recettes par les nouvelles générées
                setLoading(false);
            })
            .catch((err) => {
                console.error("Problème dans la récupération de données :", err);
                setLoading(false);
            });
    };

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

                {/* Input to specify the number of recipes */}
                <Flex alignItems="center" mb={4}>
                    <label style={{ marginRight: "10px" }}>Nombre de recettes :</label>
                    <Input
                        type="number"
                        min="1"
                        value={recipeCount}
                        onChange={(e) => setRecipeCount(Math.max(1, Number(e.target.value)))}
                        width="80px"
                        textAlign="center"
                        mr={3}
                    />
                </Flex>

                {/* Button to generate new recipes */}
                <Button onClick={generateRecipe} isLoading={loading} colorScheme="teal" mb={6}>
                    Générer {recipeCount} Recette(s)
                </Button>

                {loading ? (
                    <Spinner size="xl" color="teal.300" />
                ) : (
                    <Table variant="simple">
                        <Thead bg="gray.100">
                            <Tr>
                                <Th textAlign="center">Nom de la Recette</Th>
                                <Th textAlign="center">Calories (kcal)</Th>
                                <Th textAlign="center">Instructions</Th>
                                <Th textAlign="center">Régime Alimentaire</Th>
                                <Th textAlign="center">Ingrédients</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {recipes.map((recipe, index) => (
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
            </Box>
        </Box>
    );
}