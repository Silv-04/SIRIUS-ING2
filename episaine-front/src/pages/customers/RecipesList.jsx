import React, { useEffect, useState } from "react";
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
    TableSortLabel,
    TextField,
    ThemeProvider,
    Typography,
} from "@mui/material";
import { Search, Sort, CheckCircle, RestaurantMenu } from "@mui/icons-material";
import axios from "axios";
import { GET_RECIPES_BY_CUSTOMER } from "../../constants/back";
import LeftMenu from "../../components/customers/LeftMenu";
import recipesListTableHeader from "../../constants/recipesListTableHeader.json";
import { useLocation, useNavigate } from "react-router-dom";
import sortRecipesTableOptions from "../../constants/sortRecipesTableOptions.json";

function RecipesListInput() {
    const [id, setId] = useState("");
    const [numberOfDays, setNumberOfDays] = useState("");
    const [allRecipesList, setAllRecipesList] = useState([]);
    const [selectedTables, setSelectedTables] = useState({});
    const [recipesList, setRecipesList] = useState([]);
    const [sortValue, setSortValue] = useState("none");
    const location = useLocation();
    const navigate = useNavigate();

    const theme = createTheme();

    const getRecipes = async () => {
        try {
            const response = await axios.get(GET_RECIPES_BY_CUSTOMER + "/" + id + "?numberOfDays=" + numberOfDays);
            setAllRecipesList(response.data);
        } catch (error) {
            console.error("Error while fetching recipes:", error);
        }
    };

    const handleSelectAll = (tableIndex, isChecked) => {
        setSelectedTables((prev) => ({ ...prev, [tableIndex]: isChecked }));

        if (isChecked) {
            setRecipesList((prev) => [...prev, allRecipesList[tableIndex]]);
        } else {
            setRecipesList((prev) => prev.filter((_, index) => index !== tableIndex));
        }
    };

    const handleValidate = () => {
        navigate("/client/recettes/informations/choix/resultat/", { state: { inputValue: recipesList } });
    };

    const calculateAverageCalories = (recipes) => {
        const totalCalories = recipes.reduce((sum, recipe) => sum + (recipe.calorieCount || 0), 0);
        return recipes.length > 0 ? totalCalories / recipes.length : 0;
    };

    const handleSort = () => {
        if (sortValue === "none") return;

        if (sortValue === "calories") {
            const sortedRecipesGroups = [...allRecipesList].sort((groupA, groupB) => {
                const avgA = calculateAverageCalories(groupA);
                const avgB = calculateAverageCalories(groupB);
                return avgB - avgA;
            });

            setAllRecipesList(sortedRecipesGroups.map((group) => [...group]));
        }
    };

    useEffect(() => {
        if (location.state?.inputValue) {
            setId(location.state.inputValue);
        }
    }, [location.state]);

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    padding: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                    backgroundColor: "#f9f9f9",
                    minHeight: "100vh",
                }}
            >
                <Typography
                    variant="h4"
                    color="primary"
                    textAlign="center"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        fontWeight: "bold",
                        marginBottom: 3,
                    }}
                >
                    <RestaurantMenu fontSize="large" /> Liste des Recettes Disponibles
                </Typography>

                <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12} sm={6}>
                        <form onSubmit={(e) => { e.preventDefault(); getRecipes(); }}>
                            <TextField
                                fullWidth
                                label="Nombre de jours"
                                variant="outlined"
                                value={numberOfDays}
                                onChange={(e) => setNumberOfDays(e.target.value)}
                                type="number"
                                sx={{ marginBottom: 2 }}
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                                startIcon={<Search />}
                                sx={{ padding: "10px 20px" }}
                            >
                                Obtenir les listes de recettes
                            </Button>
                        </form>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Trier par</InputLabel>
                            <Select
                                value={sortValue}
                                onChange={(e) => setSortValue(e.target.value)}
                                label="Trier par"
                                sx={{ marginBottom: 2 }}
                            >
                                {sortRecipesTableOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={handleSort}
                                startIcon={<Sort />}
                                sx={{ padding: "10px 20px" }}
                            >
                                Trier
                            </Button>
                        </FormControl>
                    </Grid>
                </Grid>

                <TableContainer
                    sx={{
                        maxHeight: "500px",
                        width: "100%",
                        backgroundColor: "#fff",
                        borderRadius: 2,
                        boxShadow: 3,
                        overflowY: "auto",
                    }}
                >
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Action</TableCell>
                                {recipesListTableHeader.map((header) => (
                                    <TableCell key={header.value}>
                                        <TableSortLabel>{header.label}</TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
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
                                                <TableCell key={header.value}>{header.label}</TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {recipesListGroup.map((recipes) => (
                                            <TableRow key={recipes.recipe_id}>
                                                <TableCell />
                                                {recipesListTableHeader.map(({ value }) => (
                                                    <TableCell key={value}>{recipes[value] || "N/A"}</TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: 3, padding: "10px 20px" }}
                    onClick={handleValidate}
                    startIcon={<CheckCircle />}
                >
                    Valider
                </Button>
            </Box>
        </ThemeProvider>
    );
}

export default function RecipesList() {
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <LeftMenu style={{ width: "250px" }} />
            <div style={{ flexGrow: 1 }}>
                <RecipesListInput />
            </div>
        </div>
    );
}
