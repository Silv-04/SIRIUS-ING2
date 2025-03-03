import { useEffect, useState } from 'react';
import axios from 'axios';
import { GET_RECIPES_BY_CUSTOMER } from '../../constants/back';
import LeftMenu from '../../components/customers/LeftMenu';
import recipesListTableHeader from '../../constants/recipesListTableHeader.json';
import { useLocation, useNavigate } from 'react-router-dom';
import sortRecipesTableOptions from '../../constants/sortRecipesTableOptions.json';
import { Box, Button, Grid, GridItem, Input, Select, Text } from '@chakra-ui/react';

// path="/client/recettes/informations/choix/"
// page to display each recipes according to the customer's informations
function RecipesListInput() {
    const [id, setId] = useState('');
    const [numberOfDays, setNumberOfDays] = useState('');
    const [allRecipesList, setAllRecipesList] = useState([]);
    const [selectedTables, setSelectedTables] = useState({});
    const [recipesList, setRecipesList] = useState([]);
    const [sortValue, setSortValue] = useState('none');
    const [page, setPage] = useState(1);
    const location = useLocation();
    const navigate = useNavigate();


    // fetched recipes 
    const getRecipes = async () => {
        try {
            const response = await axios.get(GET_RECIPES_BY_CUSTOMER + "/" + id + "?numberOfDays=" + numberOfDays + "&orderOption=" + sortValue + "&n=" + 10);
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
        <Box>
            <form>
                <Grid templateColumns={"repeat(1, 1fr)"} gap={4} p={4} justifyContent={"center"} alignItems={"center"}>
                    <GridItem colSpan={1}>
                        <Grid templateRows={"repeat(2, 1fr"}>
                            <Text>Nombre de jour</Text>
                            <Input
                                placeholder="Numéro client"
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
                    <Button _hover={{ bg: "#4d648d" }} color="white" bg="#2C3A4F">Générer la liste</Button>
                </Grid>
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