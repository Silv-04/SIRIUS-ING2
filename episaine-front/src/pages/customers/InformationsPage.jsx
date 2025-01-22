import React, { useEffect, useState } from 'react';
import { CREATE_INFORMATIONS, GET_INFORMATIONS_BY_CUSTOMER_ID, UPDATE_INFORMATIONS } from '../../constants/back';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import allergyOptions from '../../constants/allergyOptions';
import intoleranceOptions from '../../constants/intoleranceOptions';
import regimeOptions from '../../constants/regimeOptions';
import temperatureOptions from '../../constants/temperatureOptions';
import cuisineTypeOptions from '../../constants/cuisineTypeOptions';
import LeftMenu from '../../components/customers/LeftMenu';
import healthGoalOptions from '../../constants/healthGoalOptions';
import { Box, Button, createTheme, FormControl, Grid, InputLabel, MenuItem, Select, TextField, ThemeProvider, Typography } from '@mui/material';

// path="/client/recettes/informations/"
// page to display and update the customer's informations if needed
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

    // submit the new informations, check whether or not the informations was updated, and move to the next page
    const handleSubmit = async (e) => {
        e.preventDefault();
        const new_information = {
            information_id: informationId,
            health_goal: healthGoal,
            allergies: Array.isArray(allergies) ? allergies.join(",") : "",
            intolerances: Array.isArray(intolerances) ? intolerances.join(",") : "",
            dietary_regime: dietaryRegime,
            meals_per_day: mealsPerDay,
            weight: weight,
            height: height,
            prohibited_food: foodToAvoid,
            recipe_temperature: foodTemperature,
            cuisine_type: Array.isArray(cuisineType) ? cuisineType.join(",") : "",
            fk_customer_id: customerId
        };

        if (informations && JSON.stringify(informations) === JSON.stringify(new_information)) {
            console.log("No changes detected");
            navigate("/client/recettes/informations/choix/", { state: { inputValue: informations.fk_customer_id } });
            return;
        }

        try {
            if (informations) {
                console.log("Changes in informations detected");
                await axios.post(UPDATE_INFORMATIONS, new_information);
                console.log("Informations updated");
            } else {
                console.log("No information found, creating new data");
                await axios.post(CREATE_INFORMATIONS, new_information);
                console.log("Informations created");
            }

            navigate("/client/recettes/informations/choix/", { state: { inputValue: new_information.fk_customer_id } });

        } catch (error) {
            console.error("Error while updating or creating data:", error);
        }
    };

    // empty each input field
    const handleReset = () => {
        setAllergies([]);
        setIntolerances([]);
        setHealthGoal('');
        setDietaryRegime('');
        setMealsPerDay('');
        setWeight('');
        setHeight('');
        setFoodToAvoid('');
        setFoodTemperature('');
        setCuisineType([]);
        setCustomerId('');
        setInformationId('');
    };
    

    // get data sent from the previous page
    useEffect(() => {
        if (location.state?.inputValue) {
            setCustomerId(location.state.inputValue);
        }
    }, [location.state]);

    // get informations from customer's id once received from the previous page
    useEffect(() => {
        const readInformations = async () => {
            try {
                const response = await axios.get(GET_INFORMATIONS_BY_CUSTOMER_ID + "/" + customerId);
                console.log("Informations fetched", response.data);
                setInformations(response.data);
            } catch (error) {
                console.error("Error while reading data:", error);
            }
        };

        if (customerId) {
            readInformations();
        }
    }, [customerId]);

    // once informations received, update each fields
    useEffect(() => {
        if (informations) {
            setAllergies(informations.allergies || []);
            setIntolerances(informations.intolerances || []);
            setHealthGoal(informations.health_goal || '');
            setDietaryRegime(informations.dietary_regime || '');
            setMealsPerDay(informations.meals_per_day || '');
            setWeight(informations.weight || '');
            setHeight(informations.height || '');
            setFoodToAvoid(informations.prohibited_food || '');
            setFoodTemperature(informations.recipe_temperature || '');
            setCuisineType(informations.cuisine_type || []);
            setCustomerId(informations.fk_customer_id || '');
            setInformationId(informations.information_id || '');
        }
    }, [informations]);

    return (
        <Grid>
            <Grid container justifyContent="center" alignItems="center" style={{ marginTop: "20px" }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Informations client
                </Typography>
            </Grid>
            <form onSubmit={handleSubmit} autoComplete='off'>
                <Box>
                    <Grid container spacing={2} sx={{ width: '90%', height: 'auto', marginLeft: "50px" }}>
                        <Grid item xs={12} sm={6} sx={{ width: '30%', height: 'auto', paddingRight: "20px" }}>
                            <FormControl fullWidth margin='normal' sx={{ height: 'auto' }}>
                                <InputLabel>Objectif de santé</InputLabel>
                                <Select
                                    value={healthGoal}
                                    onChange={(e) => setHealthGoal(e.target.value)}
                                    label="Objectif de santé"
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: 200,
                                            },
                                        },
                                    }}
                                >
                                    {healthGoalOptions.map((healthGoal) => (
                                        <MenuItem key={healthGoal.key} value={healthGoal.label}>{healthGoal.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin='normal' sx={{ height: 'auto' }}>
                                <InputLabel>Allergies</InputLabel>
                                <Select
                                    multiple
                                    value={Array.isArray(allergies) ? allergies : []}
                                    onChange={(e) => setAllergies(e.target.value)}
                                    label="Allergies"
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: 200,
                                            },
                                        },
                                    }}
                                >
                                    {allergyOptions.map((allergy) => (
                                        <MenuItem key={allergy.id} value={allergy.name}>{allergy.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin='normal' sx={{ height: 'auto' }}>
                                <InputLabel>Intolérances</InputLabel>
                                <Select
                                    multiple
                                    value={Array.isArray(intolerances) ? intolerances : []}
                                    onChange={(e) => setIntolerances(e.target.value)}
                                    label="Intolérances"
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: 200,
                                            },
                                        },
                                    }}
                                >
                                    {intoleranceOptions.map((intolerance) => (
                                        <MenuItem key={intolerance.id} value={intolerance.name}>{intolerance.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin='normal' sx={{ height: 'auto' }}>
                                <InputLabel>Régime alimentaire</InputLabel>
                                <Select
                                    value={dietaryRegime}
                                    onChange={(e) => setDietaryRegime(e.target.value)}
                                    label="Régime alimentaire"
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: 200,
                                            },
                                        },
                                    }}
                                >
                                    {regimeOptions.map((regime) => (
                                        <MenuItem key={regime.id} value={regime.name}>{regime.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                label="Nombre de repas par jour"
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                type="number"
                                fullWidth
                                margin='normal'
                                value={mealsPerDay}
                                onChange={(e) => setMealsPerDay(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ width: '30%', height: 'auto', paddingLeft: "20px" }}>
                            <TextField
                                label="Poids (kg)"
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                type="number"
                                fullWidth
                                margin='normal'
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                            /><TextField
                                label="Taille (cm)"
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                type="number"
                                fullWidth
                                margin='normal'
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                            />
                            <TextField
                                label="Nourriture à éviter"
                                variant='outlined'
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                margin='normal'
                                value={foodToAvoid}
                                onChange={(e) => setFoodToAvoid(e.target.value)}
                            />
                            <FormControl fullWidth margin='normal' sx={{ height: 'auto' }}>
                                <InputLabel>Température de plat</InputLabel>
                                <Select
                                    value={foodTemperature}
                                    onChange={(e) => setFoodTemperature(e.target.value)}
                                    label="Température de plat"
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: 200,
                                            },
                                        },
                                    }}
                                >
                                    {temperatureOptions.map((temperature) => (
                                        <MenuItem key={temperature.key} value={temperature.label}>{temperature.label}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl fullWidth margin='normal' sx={{ height: 'auto' }}>
                                <InputLabel>Spécialité culinaire</InputLabel>
                                <Select
                                    multiple
                                    value={Array.isArray(cuisineType) ? cuisineType : []}
                                    onChange={(e) => setCuisineType(e.target.value)}
                                    label="Spécialité culinaire"
                                    MenuProps={{
                                        PaperProps: {
                                            style: {
                                                maxHeight: 200,
                                            },
                                        },
                                    }}
                                >
                                    {cuisineTypeOptions.map((cuisineType) => (
                                        <MenuItem key={cuisineType.id} value={cuisineType.name}>{cuisineType.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center" alignItems="center" spacing={5} paddingLeft={4} marginTop={3}>
                        <Button type="submit" variant="contained" color="primary" sx={{ marginRight: '10px' }}>Valider</Button>
                        <Button variant="contained" color="secondary" onClick={handleReset} sx={{ marginLeft: '10px' }}>Annuler</Button>
                    </Grid>
                </Box>
            </form>
        </Grid>
    );
}

export default function InformationsPage() {
    const theme = createTheme();
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ width: '250px' }}>
                <LeftMenu />
            </div>

            <div style={{ flexGrow: 1 }}>
                <ThemeProvider theme={theme}>
                    <InformationsPageInputs />
                </ThemeProvider>
            </div>
        </div>
    )
}