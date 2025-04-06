import { useEffect, useState } from 'react';
import LeftMenu from '../../components/customers/LeftMenu';
import recipesListTableHeader from '../../constants/recipesListTableHeader.json';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Center, Checkbox, CircularProgress, Grid, GridItem, Input, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { generateRecipesList } from '../../api/customerAPI';

// path="/client/recettes/"
// page to display each recipes according to the customer's informations
function RecipesListInput() {
    const [id, setId] = useState('');
    const [numberOfDays, setNumberOfDays] = useState('');
    const [numberOfMeals, setNumberOfMeals] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [allRecipesList, setAllRecipesList] = useState([]);
    const [selectedTables, setSelectedTables] = useState({});
    const [recipesList, setRecipesList] = useState([]);
    const navigate = useNavigate();

    const [minGlucides, setMinGlucides] = useState(null);
    const [maxGlucides, setMaxGlucides] = useState(null);
    const [minLipides, setMinLipides] = useState(null);
    const [maxLipides, setMaxLipides] = useState(null);
    const [minGlucose, setMinGlucose] = useState(null);
    const [maxGlucose, setMaxGlucose] = useState(null);
    const [minLactose, setMinLactose] = useState(null);
    const [maxLactose, setMaxLactose] = useState(null);
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

    useEffect(() => {
            setMinGlucides(JSON.parse(localStorage.getItem("minGlucides")));
            setMaxGlucides(JSON.parse(localStorage.getItem("maxGlucides")));
            setMinLipides(JSON.parse(localStorage.getItem("minLipides")));
            setMaxLipides(JSON.parse(localStorage.getItem("maxLipides")));
            setMinGlucose(JSON.parse(localStorage.getItem("minGlucose")));
            setMaxGlucose(JSON.parse(localStorage.getItem("maxGlucose")));
            setMinLactose(JSON.parse(localStorage.getItem("minLactose")));
            setMaxLactose(JSON.parse(localStorage.getItem("maxLactose")));
            setMinMaltose(JSON.parse(localStorage.getItem("minMaltose")));
            setMaxMaltose(JSON.parse(localStorage.getItem("maxMaltose")));
            setMinAmidon(JSON.parse(localStorage.getItem("minAmidon")));
            setMaxAmidon(JSON.parse(localStorage.getItem("maxAmidon")));
            setMinFibres(JSON.parse(localStorage.getItem("minFibres")));
            setMaxFibres(JSON.parse(localStorage.getItem("maxFibres")));
            setMinCholesterol(JSON.parse(localStorage.getItem("minCholesterol")));
            setMaxCholesterol(JSON.parse(localStorage.getItem("maxCholesterol")));
            setMinSel(JSON.parse(localStorage.getItem("minSel")));
            setMaxSel(JSON.parse(localStorage.getItem("maxSel")));
            setMinCalcium(JSON.parse(localStorage.getItem("minCalcium")));
            setMaxCalcium(JSON.parse(localStorage.getItem("maxCalcium")));
            setMinCuivre(JSON.parse(localStorage.getItem("minCuivre")));
            setMaxCuivre(JSON.parse(localStorage.getItem("maxCuivre")));
            setMinFer(JSON.parse(localStorage.getItem("minFer")));
            setMaxFer(JSON.parse(localStorage.getItem("maxFer")));
            setMinProteines625(JSON.parse(localStorage.getItem("minProteines625")));
            setMaxProteines625(JSON.parse(localStorage.getItem("maxProteines625")));
        }, []);

    // fetched recipes
    const getRecipes = async () => {
        setIsLoading(true);
        try {
            const response = await generateRecipesList(id, numberOfDays, numberOfMeals, 'calorie_count', 10,
                minGlucides,
                maxGlucides,
                minLipides,
                maxLipides,
                minGlucose,
                maxGlucose,
                minLactose,
                maxLactose,
                minMaltose,
                maxMaltose,
                minAmidon,
                maxAmidon,
                minFibres,
                maxFibres,
                minCholesterol,
                maxCholesterol,
                minSel,
                maxSel,
                minCalcium,
                maxCalcium,
                minCuivre,
                maxCuivre,
                minFer,
                maxFer,
                minProteines625,
                maxProteines625
            );
            console.log("Recipes fetched:", response.data);
            const tempRecipesList = response.data;

            const recipes = handleSort(tempRecipesList);
            setAllRecipesList(recipes);
            setIsLoading(false);
        } catch (error) {
            console.error("Error while reading data:", error);
            setIsLoading(false);
        }
    };


    // save recipes selected by the checkbox
    const handleSelectAll = (tableIndex, isChecked) => {
        setSelectedTables((prev) => ({ ...prev, [tableIndex]: isChecked }));

        if (isChecked) {
            const tempTuple = [allRecipesList[tableIndex], tableIndex + 1];
            setRecipesList((prev) => [...prev, tempTuple]);
        } else {
            setRecipesList((prev) => prev.filter((_, index) => index !== tableIndex));
        }

        console.log("Selected recipes: ", recipesList);
    };

    // sent saved recipes to the next page
    const handleValidate = () => {
        console.log("Selected recipes: ", recipesList);
        navigate("/client/recettes/resultat/", { state: { inputValue: recipesList } });
    }

    // calculate average calories to sort the list
    const calculateAverageCalories = (recipes) => {
        const totalCalories = recipes.reduce((sum, recipe) => sum + (recipe.calorieCount || 0), 0);
        return recipes.length > 0 ? totalCalories / recipes.length : 0;
    };

    // handle the sort according to the chosen option
    const handleSort = (tempRecipesList) => {
        let sortedRecipesGroups = [...tempRecipesList];
            sortedRecipesGroups.sort((groupA, groupB) => {
                const avgA = calculateAverageCalories(groupA);
                const avgB = calculateAverageCalories(groupB);
                return avgB - avgA;
            });
        return sortedRecipesGroups;
    };

    // receive id from previous page
    useEffect(() => {
        const informations = JSON.parse(localStorage.getItem("customer data"));
        if (informations) {
            console.log("ID received: ", informations.fk_customer_id);
            setId(informations.fk_customer_id);
        } else {
            console.log("No customer data found in local storage.");
        }
    },[]);

    const handleChangeDays = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setNumberOfDays(value);
        }
    };

    const handleChangeMeals = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setNumberOfMeals(value);
        }
    };

    return (
        <Box p={4} width={"80vw"} height={"80vh"}>
            <form onSubmit={(e) => { e.preventDefault(); getRecipes(); }} noValidate autoComplete='off'>
                <Grid templateColumns={"repeat(1, 1fr)"} gap={4} p={4} justifyContent={"center"} alignItems={"center"}>
                    <GridItem colSpan={1}>
                            <Text>Nombre de jour</Text>
                            <Input
                                id="number-of-days"
                                placeholder="Nombre de jour"
                                value={numberOfDays}
                                onChange={handleChangeDays}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                    </GridItem>
                    <GridItem colSpan={1}>
                            <Text>Nombre de repas par jour</Text>
                            <Input
                                id="meals-per-day"
                                placeholder="Nombre de repas par jour"
                                value={numberOfMeals}
                                onChange={handleChangeMeals}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                    </GridItem>
                    <Button _hover={{ bg: "#4d648d" }} color="white" bg="#2C3A4F" type='submit' id='generate-recipes'>Générer la liste</Button>
                    {isLoading && <CircularProgress isIndeterminate color='green.300' />}
                </Grid>
            </form>
            <form onSubmit={(e) => { e.preventDefault(); handleValidate(); }} noValidate autoComplete='off'>
                <TableContainer sx={{ overflowY: "auto" }} height={"50vh"} width={"100%"}>
                    <Table size='sm'>
                        <Tbody>
                            {Array.isArray(allRecipesList) && allRecipesList.length > 0 && allRecipesList.map((recipesListGroup, index) => (
                                <Table size='sm' width={"100%"} layout={"fixed"} key={index}>
                                    <caption style={{ captionSide: "top", textAlign: "center", fontWeight: "bold", fontSize: "30px", paddingTop: "50px" }}>Liste numéro {index + 1}</caption>
                                    <Thead>
                                        <Tr>
                                            <Th>
                                                <Checkbox
                                                    checked={selectedTables[index] || false}
                                                    onChange={(e) => handleSelectAll(index, e.target.checked)}
                                                />
                                            </Th>
                                            {recipesListTableHeader.map((header) => (
                                                <Th key={header.value}>
                                                    {header.label}
                                                </Th>
                                            ))}
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {recipesListGroup.map((recipes, recipeIndex) => (
                                            <Tr key={recipes.recipe_id} selected={selectedTables[index] || false}>
                                                <Td />
                                                {recipesListTableHeader.map((headerValue) => (
                                                    <Td key={headerValue} style={{ whiteSpace: 'pre-wrap' }}>
                                                        {headerValue.value === 'recipeId' ? (recipeIndex + 1) : recipes[headerValue.value] || 'N/A'}
                                                    </Td>
                                                ))}
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
                <Center>
                    <Button _hover={{ bg: "#4d648d" }} color="white" bg="#2C3A4F" type='submit'>Valider mon choix</Button>
                </Center>
            </form>
        </Box>
    );
}

export default function RecipesList() {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ width: '250px' }}>
                <LeftMenu />
            </div>

            <div style={{ flexGrow: 1 }}>
                <RecipesListInput />
            </div>
        </div>
    );
}