import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    createTheme,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    ThemeProvider,
    Typography,
} from "@mui/material";
import { HealthAndSafety, CheckCircle, Cancel } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import allergyOptions from "../../constants/allergyOptions";
import intoleranceOptions from "../../constants/intoleranceOptions";
import regimeOptions from "../../constants/regimeOptions";
import temperatureOptions from "../../constants/temperatureOptions";
import cuisineTypeOptions from "../../constants/cuisineTypeOptions";
import healthGoalOptions from "../../constants/healthGoalOptions";
import LeftMenu from "../../components/customers/LeftMenu";
import { CREATE_INFORMATIONS, GET_INFORMATIONS_BY_CUSTOMER_ID, UPDATE_INFORMATIONS } from "../../constants/back";

function InformationsPageInputs() {
    const [informations, setInformations] = useState();

    const location = useLocation();
    const navigate = useNavigate();

    const [healthGoal, setHealthGoal] = useState("");
    const [allergies, setAllergies] = useState([]);
    const [intolerances, setIntolerances] = useState([]);
    const [dietaryRegime, setDietaryRegime] = useState("");
    const [mealsPerDay, setMealsPerDay] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [foodToAvoid, setFoodToAvoid] = useState("");
    const [foodTemperature, setFoodTemperature] = useState("");
    const [cuisineType, setCuisineType] = useState([]);
    const [customerId, setCustomerId] = useState("");
    const [informationId, setInformationId] = useState("");

    useEffect(() => {
        if (location.state?.inputValue) {
            setCustomerId(location.state.inputValue);
        }
    }, [location.state]);

    useEffect(() => {
        const fetchInformations = async () => {
            try {
                const response = await axios.get(GET_INFORMATIONS_BY_CUSTOMER_ID + "/" + customerId);
                setInformations(response.data);
            } catch (error) {
                console.error("Error while reading data:", error);
            }
        };

        if (customerId) fetchInformations();
    }, [customerId]);

    useEffect(() => {
        if (informations) {
            setAllergies(informations.allergies || []);
            setIntolerances(informations.intolerances || []);
            setHealthGoal(informations.health_goal || "");
            setDietaryRegime(informations.dietary_regime || "");
            setMealsPerDay(informations.meals_per_day || "");
            setWeight(informations.weight || "");
            setHeight(informations.height || "");
            setFoodToAvoid(informations.prohibited_food || "");
            setFoodTemperature(informations.recipe_temperature || "");
            setCuisineType(informations.cuisine_type || []);
            setCustomerId(informations.fk_customer_id || "");
            setInformationId(informations.information_id || "");
        }
    }, [informations]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const new_information = {
            information_id: informationId,
            health_goal: healthGoal,
            allergies: Array.isArray(allergies) ? allergies.join(",") : "",
            intolerances: Array.isArray(intolerances) ? intolerances.join(",") : "",
            dietary_regime: dietaryRegime,
            meals_per_day: mealsPerDay,
            weight,
            height,
            prohibited_food: foodToAvoid,
            recipe_temperature: foodTemperature,
            cuisine_type: Array.isArray(cuisineType) ? cuisineType.join(",") : "",
            fk_customer_id: customerId,
        };

        if (informations && JSON.stringify(informations) === JSON.stringify(new_information)) {
            navigate("/client/recettes/informations/choix/", { state: { inputValue: customerId } });
            return;
        }

        try {
            if (informations) {
                await axios.post(UPDATE_INFORMATIONS, new_information);
            } else {
                await axios.post(CREATE_INFORMATIONS, new_information);
            }

            navigate("/client/recettes/informations/choix/", { state: { inputValue: customerId } });
        } catch (error) {
            console.error("Error while updating or creating data:", error);
        }
    };

    const handleReset = () => {
        setAllergies([]);
        setIntolerances([]);
        setHealthGoal("");
        setDietaryRegime("");
        setMealsPerDay("");
        setWeight("");
        setHeight("");
        setFoodToAvoid("");
        setFoodTemperature("");
        setCuisineType([]);
        setCustomerId("");
        setInformationId("");
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                padding: 3,
                backgroundColor: "#f5f7fa",
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    width: "80%",
                    maxWidth: "800px",
                    backgroundColor: "#ffffff",
                    boxShadow: 3,
                    borderRadius: 2,
                    padding: 4,
                }}
            >
                <Typography
                    variant="h4"
                    textAlign="center"
                    color="primary"
                    gutterBottom
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 1,
                        marginBottom: 3,
                    }}
                >
                    <HealthAndSafety fontSize="large" /> Informations Client
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Objectif de santé</InputLabel>
                            <Select
                                value={healthGoal}
                                onChange={(e) => setHealthGoal(e.target.value)}
                                label="Objectif de santé"
                            >
                                {healthGoalOptions.map((option) => (
                                    <MenuItem key={option.key} value={option.label}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Allergies</InputLabel>
                            <Select
                                multiple
                                value={allergies}
                                onChange={(e) => setAllergies(e.target.value)}
                                label="Allergies"
                            >
                                {allergyOptions.map((option) => (
                                    <MenuItem key={option.id} value={option.name}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Poids (kg)"
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Taille (cm)"
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Nourriture à éviter"
                            value={foodToAvoid}
                            onChange={(e) => setFoodToAvoid(e.target.value)}
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Spécialité culinaire</InputLabel>
                            <Select
                                multiple
                                value={cuisineType}
                                onChange={(e) => setCuisineType(e.target.value)}
                                label="Spécialité culinaire"
                            >
                                {cuisineTypeOptions.map((option) => (
                                    <MenuItem key={option.id} value={option.name}>
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 2,
                        marginTop: 3,
                    }}
                >
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        startIcon={<CheckCircle />}
                    >
                        Valider
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleReset}
                        startIcon={<Cancel />}
                    >
                        Annuler
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default function InformationsPage() {
    const theme = createTheme();
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <LeftMenu style={{ width: "250px" }} />
            <div style={{ flexGrow: 1 }}>
                <ThemeProvider theme={theme}>
                    <InformationsPageInputs />
                </ThemeProvider>
            </div>
        </div>
    );
}
