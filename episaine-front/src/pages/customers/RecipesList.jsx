import {
    Box,
    Button,
    Checkbox,
    createTheme,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    ThemeProvider
} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GET_RECIPES_BY_CUSTOMER } from '../../constants/back';
import LeftMenu from '../../components/customers/LeftMenu';
import recipesListTableHeader from '../../constants/recipesListTableHeader.json';
import { useLocation, useNavigate } from 'react-router-dom';
import sortRecipesTableOptions from '../../constants/sortRecipesTableOptions.json';

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

    const theme = createTheme();


    // fetched recipes 
    const getRecipes = async () => {
        try {
            const response = await axios.get(GET_RECIPES_BY_CUSTOMER + "/" + id + "?numberOfDays=" + numberOfDays + "&orderOption=" + sortValue + "&page=" + page);
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
            setRecipesList((prev) => [...prev, allRecipesList[tableIndex]]);
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
            sortedRecipesGroups = sortedRecipesGroups.map(group => [...group].sort((a, b) => (b.calorieCount || 0) - (a.calorieCount || 0))
            );

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

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ paddingLeft: "50px", paddingTop: "50px" }}>
                <div className="input">
                    <Grid container spacing={2}>
                        <Grid sx={{ width: "40%" }}>
                            <form onSubmit={(e) => { e.preventDefault(); getRecipes(); }} noValidate autoComplete='off'>
                                <Grid container spacing={2}>
                                    <Grid>
                                        <TextField
                                            fullWidth
                                            margin='normal'
                                            label='Nombre de jours'
                                            variant='outlined'
                                            value={numberOfDays}
                                            onChange={(e) => setNumberOfDays(e.target.value)}
                                            type='number'
                                        />
                                    </Grid>
                                    <Grid>
                                        <FormControl fullWidth margin='normal'>
                                            <InputLabel>Trier par</InputLabel>
                                            <Select
                                                fullWidth
                                                onChange={(e) => setSortValue(e.target.value)}
                                                value={sortValue}
                                                label="Trier par"
                                                MenuProps={{
                                                    PaperProps: {
                                                        style: {
                                                            maxHeight: 200,
                                                        },
                                                    },
                                                }}
                                            >
                                                {sortRecipesTableOptions.map((option) => (
                                                    <MenuItem key={option.value} value={option.value}>
                                                        {option.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                    </Grid>
                                </Grid>
                                <Button
                                    variant='contained'
                                    color='primary'
                                    type='submit'
                                >Obtenir les listes de recettes
                                    {console.log(sortValue)}</Button>
                            </form>
                        </Grid>
                    </Grid>
                </div>
                <div className='recipesTable'>

                    <TableContainer sx={{ maxHeight: "500px", overflowY: "auto" }}>
                        <Table>
                            <TableBody>
                                {Array.isArray(allRecipesList) && allRecipesList.length > 0 && allRecipesList.map((recipesListGroup, tableIndex) => (
                                    <Table key={tableIndex}>
                                        <caption style={{ captionSide: "top", textAlign: "center", fontWeight: "bold", fontSize: "30px", paddingTop: "100px" }}>Liste numéro {tableIndex + 1}</caption>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    <Checkbox
                                                        checked={selectedTables[tableIndex] || false}
                                                        onChange={(e) => handleSelectAll(tableIndex, e.target.checked)}
                                                    />
                                                </TableCell>
                                                {recipesListTableHeader.map((header) => (
                                                    <TableCell key={header.value}>
                                                        {header.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {recipesListGroup.map((recipes, recipeIndex) => (
                                                <TableRow key={recipes.recipe_id} selected={selectedTables[tableIndex] || false}>
                                                    <TableCell />
                                                    {recipesListTableHeader.map(({ value }) => (
                                                        <TableCell key={value}>
                                                            {value === 'recipeId' ? (recipeIndex + 1) : (recipes[value] || 'N/A')}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                <Button onClick={handleValidate} variant="contained" color="primary">Valider</Button>
            </Box>
        </ThemeProvider>
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