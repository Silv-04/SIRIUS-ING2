import React, {useState } from "react";
import {Box, Flex, Heading, Spinner, Table, Thead, Tbody, Tr, Th, Td, Button, Select, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Text
} from "@chakra-ui/react";
import Navbar from "../../components/nutritionist/navbar";
import {GENERATE_RECIPE } from "../../constants/back";

/**
 * Main component to display and manage the list of recipes.
 */
export default function Recipe() {
    // State variables for managing recipes and UI state

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [recipeCount, setRecipeCount] = useState(1);
    const [dietaryRegime, setDietaryRegime] = useState("");
    const [minCalories, setMinCalories] = useState(0);
    const [maxCalories, setMaxCalories] = useState(1000);
    const [error, setError] = useState("");

    // State for nutrients

    const [minGlucides, setMinGlucides] = useState(null);
    const [maxGlucides, setMaxGlucides] = useState(null);
    const [minLipides, setMinLipides] = useState(null);
    const [maxLipides, setMaxLipides] = useState(null);
    const [minGlucose, setMinGlucose] = useState(null);
    const [maxGlucose, setMaxGlucose] = useState(null);
    const [minLactose, setMinLactose] = useState(null);
    const [maxLactose, setMaxLactose] =useState(null);
    const [minMaltose, setMinMaltose] = useState(null);
    const [maxMaltose, setMaxMaltose] = useState(null);
    const [minAmidon, setMinAmidon] = useState(null);
    const [maxAmidon, setMaxAmidon] = useState(null);
    const [minFibres, setMinFibres] = useState(null);
    const [maxFibres, setMaxFibres] = useState(null);
    const [minCholesterol, setMinCholesterol] = useState(null);
    const [maxCholesterol, setMaxCholesterol] = useState(null);
    const [minSel, setMinSel] = useState(null);
    const [maxSel, setMaxSel] = useState(null);
    const [minCalcium, setMinCalcium] = useState(null);
    const [maxCalcium, setMaxCalcium] = useState(null);
    const [minCuivre, setMinCuivre] = useState(null);
    const [maxCuivre, setMaxCuivre] = useState(null);
    const [minFer, setMinFer] = useState(null);
    const [maxFer, setMaxFer] = useState(null);
    const [minProteines625, setMinProteines625] = useState(null);
    const [maxProteines625, setMaxProteines625] = useState(null);

    // Chakra UI modal for error display (  code from web site : https://chakra-ui.com/ )
    const { isOpen, onOpen, onClose } = useDisclosure();

    /**
     * Handles numeric input validation and state update
     */

    const handleInputChange = (setter) => (e) => {
        let value = e.target.value.replace(/\D/g, ""); // Supprime tout caractère non numérique
        setter(value ? Number(value) : 0);
    };

    /**
     * Validation rule for calorie values
     */
    const validateCalories = (min, max) => {
        if (max < min) {
            setError("Le nombre de calories maximum ne peut pas être inférieur au minimum.");
            onOpen();
        } else if (min === max) {
            setError("Les valeurs minimales et maximales ne peuvent pas être identiques.");
            onOpen();
        } else {
            setError("");
        }
    };

    /**
     * Function to generate new recipes based on user selection.
     */
    const generateRecipe = () => {
        if (!dietaryRegime) {
            setError("Veuillez sélectionner un régime alimentaire !");
            onOpen();
            return;
        }
        setLoading(true);

        /**
         * Construct query parameters for API request
         */

        const params = new URLSearchParams();
        params.append("dietaryRegime", dietaryRegime);
        params.append("count", recipeCount);

        /**
         * Add non-null nutritional values to query
         */

        const nutrientValues = {
            minCalories, maxCalories, minGlucides, maxGlucides,
            minLipides, maxLipides, minGlucose, maxGlucose,
            minLactose, maxLactose, minMaltose, maxMaltose,
            minAmidon, maxAmidon, minFibres, maxFibres,
            minCholesterol, maxCholesterol, minSel, maxSel,
            minCalcium, maxCalcium, minCuivre, maxCuivre,
            minFer, maxFer, minProteines625, maxProteines625
        };

        /**
         * Add only filled parameters (avoid sending null or empty values)
         */
        Object.entries(nutrientValues).forEach(([key, value]) => {
            if (value !== null && value !== "") {
                params.append(key, value);
            }
        });

        /**
         * Fetch request execution
         */

        fetch(`${GENERATE_RECIPE}?${params.toString()}`, {
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
                <Heading mb={6} size="lg" color="teal.800" textAlign="center">Bibliothèque de Recettes</Heading>
                <Flex alignItems="center" mb={4}>
                    <Text fontWeight="bold" color="teal.700">Nombre de recettes :</Text>
                    <Select id="select-recipe-count" value={recipeCount} onChange={(e) => setRecipeCount(Number(e.target.value))} width="100px" textAlign="center" mr={3}>
                        {[...Array(10).keys()].map((num) => (
                            <option key={num + 1} value={num + 1}>{num + 1}</option>
                        ))}
                    </Select>
                </Flex>

                {/* Input fields for min and max nutritional values */}

                <Box mb={4}>
                    <Heading size="md" fontWeight="bold" color="teal.700" mb={2}>Valeurs Nutritionnelles (Min / Max)</Heading>
                    {[
                        { label: "Glucides", stateMin: minGlucides, setStateMin: setMinGlucides, stateMax: maxGlucides, setStateMax: setMaxGlucides },
                        { label: "Lipides", stateMin: minLipides, setStateMin: setMinLipides, stateMax: maxLipides, setStateMax: setMaxLipides },
                        { label: "Glucose", stateMin: minGlucose, setStateMin: setMinGlucose, stateMax: maxGlucose, setStateMax: setMaxGlucose },
                        { label: "Lactose", stateMin: minLactose, setStateMin: setMinLactose, stateMax: maxLactose, setStateMax: setMaxLactose },
                        { label: "Maltose", stateMin: minMaltose, setStateMin: setMinMaltose, stateMax: maxMaltose, setStateMax: setMaxMaltose },
                        { label: "Amidon", stateMin: minAmidon, setStateMin: setMinAmidon, stateMax: maxAmidon, setStateMax: setMaxAmidon },
                        { label: "Fibres", stateMin: minFibres, setStateMin: setMinFibres, stateMax: maxFibres, setStateMax: setMaxFibres },
                        { label: "Cholestérol", stateMin: minCholesterol, setStateMin: setMinCholesterol, stateMax: maxCholesterol, setStateMax: setMaxCholesterol },
                        { label: "Sel", stateMin: minSel, setStateMin: setMinSel, stateMax: maxSel, setStateMax: setMaxSel },
                        { label: "Calcium", stateMin: minCalcium, setStateMin: setMinCalcium, stateMax: maxCalcium, setStateMax: setMaxCalcium },
                        { label: "Cuivre", stateMin: minCuivre, setStateMin: setMinCuivre, stateMax: maxCuivre, setStateMax: setMaxCuivre },
                        { label: "Fer", stateMin: minFer, setStateMin: setMinFer, stateMax: maxFer, setStateMax: setMaxFer },
                        { label: "Protéines", stateMin: minProteines625, setStateMin: setMinProteines625, stateMax: maxProteines625, setStateMax: setMaxProteines625 }
                    ].map((nutrient, index) => (
                        <Flex key={index} alignItems="center" mb={2}>
                            <label style={{ width: "150px", marginRight: "10px" }}>{nutrient.label} :</label>

                            <input
                                type="number"
                                value={nutrient.stateMin ?? ""}
                                placeholder="Min"
                                onChange={handleInputChange(nutrient.setStateMin)}
                                style={{
                                    padding: "5px",
                                    width: "80px",
                                    border: "1px solid #ccc",
                                    borderRadius: "5px",
                                    marginRight: "10px"
                                }}
                            />
                            <input
                                type="number"
                                value={nutrient.stateMax ?? ""}
                                placeholder="Max"
                                onChange={handleInputChange(nutrient.setStateMax)}
                                style={{padding: "5px", width: "80px", border: "1px solid #ccc", borderRadius: "5px"}}
                            />
                        </Flex>
                    ))}
                </Box>

                {/* Input fields for Regime */}

                <Flex alignItems="center" mb={4}>
                    <Text fontWeight="bold" color="teal.700" mr={3}>Régime alimentaire :</Text>
                    <Select id="select-dietary-regime" placeholder="Sélectionner un régime" value={dietaryRegime} onChange={(e) => setDietaryRegime(e.target.value)} width="200px">
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

                <Flex alignItems="center" mb={4}>
                    <Text fontWeight="bold" color="teal.700" mr={3}>Plage de calories :</Text>
                    <Select id="select-min-calories" value={minCalories} onChange={(e) => {const value = Number(e.target.value);setMinCalories(value);validateCalories(value, maxCalories);}}
                            width="100px"
                            textAlign="center"
                            mr={3}
                    >
                        {[...Array(10).keys()].map((num) => (
                            <option key={num} value={num * 100}>{num * 100}</option>
                        ))}
                    </Select>
                    <span style={{ margin: "0 10px" }}>à</span>
                    <Select
                        id="select-max-calories"
                        value={maxCalories}
                        onChange={(e) => {const value = Number(e.target.value);
                            setMaxCalories(value);
                            validateCalories(minCalories, value);
                        }}
                        width="100px"
                        textAlign="center"
                    >
                        {[...Array(10).keys()].map((num) => (
                            <option key={num} value={(num + 1) * 100}>{(num + 1) * 100}</option>
                        ))}
                    </Select>
                </Flex>

                <Button
                    id="btn-generate-recipe"
                    onClick={generateRecipe} isLoading={loading} colorScheme="teal" mb={6} isDisabled={error !== ""}>
                    Générer {recipeCount} Recette(s)
                </Button>

                {/* Table recipe generated */}

                {loading ? (
                    <Spinner size="xl" color="teal.300" />
                ) : (

                    <Table variant="simple">
                        <Thead bg="gray.100">
                            <Tr>
                                <Th textAlign="center">Nom de la Recette</Th>
                                <Th textAlign="center">Calories (kcal)</Th>
                                <Th textAlign="center">Glucides (g)</Th>
                                <Th textAlign="center">Lipides (g)</Th>
                                <Th textAlign="center">Glucose (g)</Th>
                                <Th textAlign="center">Lactose (g)</Th>
                                <Th textAlign="center">Maltose (g)</Th>
                                <Th textAlign="center">Amidon (g)</Th>
                                <Th textAlign="center">Fibres (g)</Th>
                                <Th textAlign="center">Cholestérol (mg)</Th>
                                <Th textAlign="center">Sel (g)</Th>
                                <Th textAlign="center">Calcium (mg)</Th>
                                <Th textAlign="center">Cuivre (mg)</Th>
                                <Th textAlign="center">Fer (mg)</Th>
                                <Th textAlign="center">Protéines (g)</Th>
                                <Th textAlign="center">Régime Alimentaire</Th>
                                <Th textAlign="center">Instructions</Th>
                                <Th textAlign="center">Ingrédients</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {recipes.map((recipe, index) => (
                                <Tr key={index}>
                                    <Td textAlign="center">{recipe.recipeName}</Td>
                                    <Td textAlign="center">{recipe.calorieCount}</Td>
                                    <Td textAlign="center">{recipe.totalGlucides?.toFixed(2) || 0}</Td>
                                    <Td textAlign="center">{recipe.totalLipides?.toFixed(2) || 0}</Td>
                                    <Td textAlign="center">{recipe.totalGlucose?.toFixed(2) || 0}</Td>
                                    <Td textAlign="center">{recipe.totalLactose?.toFixed(2) || 0}</Td>
                                    <Td textAlign="center">{recipe.totalMaltose?.toFixed(2) || 0}</Td>
                                    <Td textAlign="center">{recipe.totalAmidon?.toFixed(2) || 0}</Td>
                                    <Td textAlign="center">{recipe.totalFibres?.toFixed(2) || 0}</Td>
                                    <Td textAlign="center">{recipe.totalCholesterol?.toFixed(2) || 0}</Td>
                                    <Td textAlign="center">{recipe.totalSel?.toFixed(2) || 0}</Td>
                                    <Td textAlign="center">{recipe.totalCalcium?.toFixed(2) || 0}</Td>
                                    <Td textAlign="center">{recipe.totalCuivre?.toFixed(2) || 0}</Td>
                                    <Td textAlign="center">{recipe.totalFer?.toFixed(2) || 0}</Td>
                                    <Td textAlign="center">{recipe.totalProteines625?.toFixed(2) || 0}</Td>
                                    <Td textAlign="center">{recipe.dietaryRegime}</Td>
                                    <Td textAlign="center">{recipe.instructions}</Td>
                                    <Td textAlign="center">
                                        {recipe.ingredients?.join(", ") || "Aucun ingrédient"}
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                )}
            </Box>

            {/* Modal d'erreur */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Erreur</ModalHeader>
                    <ModalBody>
                        <Text color="red.500">{error}</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" onClick={onClose}>Fermer</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}