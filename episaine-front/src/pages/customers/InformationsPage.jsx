import { Button, FormControl, InputLabel, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CREATE_INFORMATIONS, GET_INFORMATIONS_BY_CUSTOMER_ID, UPDATE_INFORMATIONS } from '../../constants/back';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Select, MenuItem } from '@mui/material';
import { Box, Grid } from '@mui/system';
import allergyOptions from '../../constants/allergyOptions';
import intoleranceOptions from '../../constants/intoleranceOptions';
import regimeOptions from '../../constants/regimeOptions';
import temperatureOptions from '../../constants/temperatureOptions';
import cuisineTypeOptions from '../../constants/cuisineTypeOptions';
import LeftMenu from '../../components/customers/LeftMenu';
import healthGoalOptions from '../../constants/healthGoalOptions';

function InformationsPageInputs() {
    const [id, setId] = useState('');
    const [informations, setInformations] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const [healthGoal, setHealthGoal] = useState('');
    const [allergies, setAllergies] = useState([]);
    const [intolerances, setIntolerances] = useState([]);
    const [dietaryRegime, setDietaryRegime] = useState('');
    const [mealsPerDay, setMealsPerDay] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [foodToAvoid, setFoodToAvoid] = useState('');
    const [foodTemperature, setFoodTemperature] = useState('');
    const [cuisineType, setCuisineType] = useState([]);
    const [customerId, setCustomerId] = useState('');
    const [informationId, setInformationId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const new_information = {
            information_id: informationId,
            health_goal: healthGoal,
            allergies: allergies.join(", "),
            intolerances: intolerances.join(", "),
            dietary_regime: dietaryRegime,
            meals_per_day: mealsPerDay,
            weight: weight,
            height: height,
            prohibited_food: foodToAvoid,
            recipe_temperature: foodTemperature,
            cuisine_type: cuisineType.join(", "),
            fk_customer_id: customerId
        }
    
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
    };

    useEffect(() => {
        if (location.state?.inputValue) {
            setId(location.state.inputValue);
        }
    }, [location.state]);

    useEffect(() => {
        const readInformations = async () => {
            try {
                const response = await axios.get(GET_INFORMATIONS_BY_CUSTOMER_ID + "/" + id);
                console.log("Informations fetched", response.data);
                setInformations(response.data);
            } catch (error) {
                console.error("Error while reading data:", error);
            }
        };

        if (id) {
            readInformations();
        }
    }, [id]);

    useEffect(() => {
        if (informations) {
            setAllergies(informations.allergies ? informations.allergies.split(", ").map(value => value.trim()) : []);
            setIntolerances(informations.intolerances ? informations.intolerances.split(", ").map(value => value.trim()) : []);
            setHealthGoal(informations.health_goal || '');
            setDietaryRegime(informations.dietary_regime || '');
            setMealsPerDay(informations.meals_per_day || '');
            setWeight(informations.weight || '');
            setHeight(informations.height || '');
            setFoodToAvoid(informations.prohibited_food || '');
            setFoodTemperature(informations.recipe_temperature || '');
            setCuisineType(informations.cuisine_type ? informations.cuisine_type.split(", ").map(value => value.trim()) : []);
            setCustomerId(informations.fk_customer_id);
            setInformationId(informations.information_id);
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
                <Grid container spacing={2} sx={{ height: 'auto', marginLeft: "50px" }}>
                    <Grid xs={12} sm={6} sx={{ width: '500px', height: 'auto' }}>
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
                                value={allergies}
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
                                value={intolerances}
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
                            type="number"
                            fullWidth
                            margin='normal'
                            value={mealsPerDay}
                            onChange={(e) => setMealsPerDay(e.target.value)}
                        />
                    </Grid>
                    <Grid xs={12} sm={6} sx={{ width: '500px', height: 'auto' }}>
                        <TextField
                            label="Poids (kg)"
                            type="number"
                            fullWidth
                            margin='normal'
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                        /><TextField
                            label="Taille (cm)"
                            type="number"
                            fullWidth
                            margin='normal'
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                        />
                        <TextField
                            label="Nourriture à éviter"
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
                                value={cuisineType}
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
                <Grid container justifyContent="center" alignItems="center" spacing={5} marginRight={3}>
                    <Button type="submit" variant="contained" color="primary">Valider</Button>
                    <Button variant="contained" color="secondary" onClick={handleReset}>Annuler</Button>
                </Grid>
            </form>
        </Grid>

    );
}

export default function InformationsPage() {
    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <Grid sx={{ width: 250 }}>
                <LeftMenu />
            </Grid>

            <Grid sx={{ flexGrow: 1 }}>
                <InformationsPageInputs />
            </Grid>
        </Box>
    )
}