import {
    Box,
    Button,
    Checkbox,
    Container,
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
    TableSortLabel,
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
    const location = useLocation();
    const navigate = useNavigate();

    const theme = createTheme();

    // fetched recipes 
    const getRecipes = async () => {
        try {
            const response = await axios.get(GET_RECIPES_BY_CUSTOMER + "/" + id + "?numberOfDays=" + numberOfDays);
            console.log("Recipes fetched");
            setAllRecipesList(response.data);
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
    const handleSort = () => {
        if (sortValue === 'none') {
            return;
        }

        if (sortValue === 'calories') {
            const sortedRecipesGroups = [...allRecipesList].sort((groupA, groupB) => {
                const avgA = calculateAverageCalories(groupA);
                const avgB = calculateAverageCalories(groupB);
                return avgB - avgA;
            });

            setAllRecipesList(sortedRecipesGroups.map(group => [...group]));
            console.log("Recettes triées :", sortedRecipesGroups);
        }
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
            <Box sx={{paddingLeft:"50px", paddingTop:"50px"}}>
                <div className="input">
                    <Grid container spacing={2}>
                        <Grid sx={{ width: "40%" }}>
                            <form onSubmit={(e) => { e.preventDefault(); getRecipes(); }} noValidate autoComplete='off'>
                                <TextField
                                    fullWidth
                                    margin='normal'
                                    label='Nombre de jours'
                                    variant='outlined'
                                    value={numberOfDays}
                                    onChange={(e) => setNumberOfDays(e.target.value)}
                                    type='number'
                                />
                                <Button
                                    variant='contained'
                                    color='primary'
                                    type='submit'
                                >Obtenir les listes de recettes</Button>
                            </form>
                        </Grid>
                        <Grid sx={{ width: "40%" }}>
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
                            <Button
                                variant='contained'
                                color='primary'
                                onClick={handleSort}
                            >Trier</Button>
                        </Grid>
                    </Grid>
                </div>
                <div className='recipesTable'>

                    <TableContainer sx={{ maxHeight: "500px", overflowY: "auto" }}>
                        <Table stickyHeader>
                            <TableBody>
                                {allRecipesList.map((recipesListGroup, tableIndex) => (
                                    <Table key={tableIndex}>
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
                                                        <TableSortLabel />
                                                        {header.label}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {recipesListGroup.map((recipes) => (
                                                <TableRow key={recipes.recipe_id} selected={selectedTables[tableIndex] || false}>
                                                    <TableCell />
                                                    {recipesListTableHeader.map(({ value }) => (
                                                        <TableCell key={value}>
                                                            {recipes[value] || 'N/A'}
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