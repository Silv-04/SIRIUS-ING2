import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Spinner, Table, Thead, Tbody, Tr, Th, Td, Button, Select } from "@chakra-ui/react";
import Navbar from "../../components/nutritionist/navbar";
import { GET_RECIPES_LIST, GENERATE_RECIPE } from "../../constants/back";

export default function Recipe() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [recipeCount, setRecipeCount] = useState(1);
    const [dietaryRegime, setDietaryRegime] = useState("");

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

    const generateRecipe = () => {
        if (!dietaryRegime) {
            alert("Veuillez sélectionner un régime alimentaire !");
            return;
        }

        setLoading(true);
        fetch(`${GENERATE_RECIPE}?dietaryRegime=${dietaryRegime}&count=${recipeCount}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })
            .then((response) => response.json())
            .then((newRecipes) => {
                if (!Array.isArray(newRecipes)) {
                    newRecipes = [newRecipes];
                }
                setRecipes([...newRecipes]);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Erreur lors de la récupération des recettes :", err);
                setLoading(false);
            });
    };

    return (
        <Box bg="#1f2b3e" minHeight="100vh">
            <Box position="fixed" w="250px" h="100vh" bg="#0F1C2E" zIndex="1000">
                <Navbar />
            </Box>

            <Box ml="250px" p={6} bg="white" minHeight="100vh">
                <Heading mb={6} size="lg" color="teal.800" textAlign="center">
                    Bibliothèque de Recettes
                </Heading>

                <Flex alignItems="center" mb={4}>
                    <label style={{ marginRight: "10px" }}>Nombre de recettes :</label>
                    <Select
                        value={recipeCount}
                        onChange={(e) => setRecipeCount(Number(e.target.value))}
                        width="100px"
                        textAlign="center"
                        mr={3}
                    >
                        {[...Array(10).keys()].map((num) => (
                            <option key={num + 1} value={num + 1}>{num + 1}</option>
                        ))}
                    </Select>
                </Flex>

                <Flex alignItems="center" mb={4}>
                    <label style={{ marginRight: "10px" }}>Régime alimentaire :</label>
                    <Select
                        placeholder="Sélectionner un régime"
                        value={dietaryRegime}
                        onChange={(e) => setDietaryRegime(e.target.value)}
                        width="200px"
                    >
                        <option value="vegetarien">Végétarien</option>
                        <option value="vegane">Végan</option>
                        <option value="Omnivore">Omnivore</option>
                        <option value="Halal">Halal</option>
                        <option value="Casher">Casher</option>
                        <option value="Pescetarien">Pescetarien</option>
                        <option value="sans lactose">Sans Lactose</option>
                        <option value="sans gluten">Sans Gluten</option>
                    </Select>
                </Flex>

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
