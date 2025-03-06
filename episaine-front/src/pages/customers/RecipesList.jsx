import { useEffect, useState } from 'react';
import LeftMenu from '../../components/customers/LeftMenu';
import recipesListTableHeader from '../../constants/recipesListTableHeader.json';
import { useLocation, useNavigate } from 'react-router-dom';
import sortRecipesTableOptions from '../../constants/sortRecipesTableOptions.json';
import { Box, Button, Center, Checkbox, Grid, GridItem, Input, Select, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { generateRecipesList } from '../../api/customerAPI';

// path="/client/recettes/informations/choix/"
// page to display each recipes according to the customer's informations
function RecipesListInput() {
    const [id, setId] = useState('');
    const [numberOfDays, setNumberOfDays] = useState('');
    const [allRecipesList, setAllRecipesList] = useState([]);
    const [selectedTables, setSelectedTables] = useState({});
    const [recipesList, setRecipesList] = useState([]);
    const [sortValue, setSortValue] = useState('none');
    const location = useLocation();
    const navigate = useNavigate();


    // fetched recipes
    const getRecipes = async () => {
        try {
            const response = await generateRecipesList(id, numberOfDays, sortValue, 10);
            console.log("Recipes fetched:", response.data);
            const tempRecipesList = response.data;

            const recipes = handleSort(tempRecipesList);
            setAllRecipesList(recipes);
        } catch (error) {
            console.error("Error while reading data:", error);
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
        navigate("/client/recettes/informations/choix/resultat/", { state: { inputValue: recipesList } });
    }

    // calculate average calories to sort the list
    const calculateAverageCalories = (recipes) => {
        const totalCalories = recipes.reduce((sum, recipe) => sum + (recipe.calorieCount || 0), 0);
        return recipes.length > 0 ? totalCalories / recipes.length : 0;
    };

    // handle the sort according to the chosen option
    const handleSort = (tempRecipesList) => {
        if (sortValue === 'none') return;

        let sortedRecipesGroups = [...tempRecipesList];

        if (sortValue === 'calorie_count') {
            sortedRecipesGroups.sort((groupA, groupB) => {
                const avgA = calculateAverageCalories(groupA);
                const avgB = calculateAverageCalories(groupB);
                return avgB - avgA;
            });
        }

        return sortedRecipesGroups;
    };

    // receive id from previous page
    useEffect(() => {
        if (location.state?.inputValue) {
            console.log("ID received: ", location.state.inputValue);
            setId(location.state.inputValue);
        }
    }, [location.state]);

    const handleChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setNumberOfDays(value);
        }
    };

    return (
        <Box p={4} width={"80vw"} height={"80vh"}>
            <form onSubmit={(e) => { e.preventDefault(); getRecipes(); }} noValidate autoComplete='off'>
                <Grid templateColumns={"repeat(1, 1fr)"} gap={4} p={4} justifyContent={"center"} alignItems={"center"}>
                    <GridItem colSpan={1}>
                        <Grid templateRows={"repeat(2, 1fr"}>
                            <Text>Nombre de jour</Text>
                            <Input
                                placeholder="Nombre de jour"
                                value={numberOfDays}
                                onChange={handleChange}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                        </Grid>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <Select
                            value={sortValue}
                            onChange={(e) => setSortValue(e.target.value)}
                        >
                            {sortRecipesTableOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Select>
                    </GridItem>
                    <Button _hover={{ bg: "#4d648d" }} color="white" bg="#2C3A4F" type='submit'>Générer la liste</Button>
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