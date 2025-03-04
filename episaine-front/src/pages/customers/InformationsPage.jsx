import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import allergyOptions from '../../constants/allergyOptions';
import intoleranceOptions from '../../constants/intoleranceOptions';
import regimeOptions from '../../constants/regimeOptions';
import temperatureOptions from '../../constants/temperatureOptions';
import cuisineTypeOptions from '../../constants/cuisineTypeOptions';
import LeftMenu from '../../components/customers/LeftMenu';
import healthGoalOptions from '../../constants/healthGoalOptions';
import { Button, Grid, GridItem, Input, Select, Text } from '@chakra-ui/react';
import { MultiSelect } from 'chakra-multiselect';
import { updateCustomerInformation, createCustomerInformation, getCustomerInformationByCustomerId } from '../../api/customerAPI';

// path="/client/recettes/informations/"
// page to display and update the customer's informations if needed
function InformationsPageInputs() {
    const [informations, setInformations] = useState();
    const [new_information, setNewInformation] = useState();

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
            intolerances: Array.isArray(intolerances) ? intolerances.join(",") : "",
            allergies: Array.isArray(allergies) ? allergies.join(",") : "",
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
            navigate("/client/recettes/informations/choix/", { state: { inputValue: new_information.fk_customer_id } })
            return;
        }
        else {
            try {
                if (informations) {
                    console.log("Changes in informations detected");
                    await updateCustomerInformation(new_information);
                    console.log("Informations updated");
                } else {
                    console.log("No information found, creating new data");
                    await createCustomerInformation(new_information);
                    console.log("Informations created");
                }
            } catch (error) {
                console.error("Error while updating or creating data:", error);
            }
            navigate("/client/recettes/informations/choix/", { state: { inputValue: new_information.fk_customer_id } })
        }
    };

    // empty each input field
    const handleReset = () => {
        setAllergies([]);
        setIntolerances([]);
        setHealthGoal('maintien de poids');
        setDietaryRegime('');
        setMealsPerDay('');
        setWeight('');
        setHeight('');
        setFoodToAvoid('');
        setFoodTemperature('aucune préférence');
        setCuisineType([]);
    };


    // get data sent from the previous page (customer ID number)
    useEffect(() => {
        if (location.state?.inputValue) {
            setCustomerId(location.state.inputValue);
        }
    }, [location.state]);

    // get informations from customer's id once received from the previous page
    useEffect(() => {
        const readInformations = async () => {
            try {
                const response = await getCustomerInformationByCustomerId(customerId);
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

    const handleChangeMealsPerDay = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setMealsPerDay(value);
        }
    };
    const handleChangeWeight = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setWeight(value);
        }
    };
    const handleChangeHeight = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setHeight(value);
        }
    };

    return (
        <Grid gap={4} padding={4} >
            <GridItem>
                <Text textAlign={"center"} fontWeight={"bold"} fontSize={50}>Informations client</Text>
            </GridItem>
            <GridItem>
                <form autoComplete='off'>
                    <Grid templateColumns={"repeat(2, 1fr)"} gap={4} padding={4} >
                        <Grid templateRows={"repeat(5, 1fr)"} gap={4} padding={4}>
                            <GridItem>
                                <Text>Objectif de santé</Text>
                                <Select
                                    value={healthGoal}
                                    onChange={(e) => setHealthGoal(e.target.value)}>
                                    {healthGoalOptions.map((healthGoal) => (
                                        <option key={healthGoal.key} value={healthGoal.label}>{healthGoal.label}</option>
                                    ))}
                                </Select>
                            </GridItem>
                            <GridItem>
                                <Text>Allergies</Text>
                                <MultiSelect
                                    options={allergyOptions.map((allergy) => ({ value: allergy.name, label: allergy.name }))}
                                    onChange={(e) => setAllergies(e)}
                                    value={Array.isArray(allergies) ? allergies : []}
                                />
                            </GridItem>
                            <GridItem>
                                <Text>Intolérences</Text>
                                <MultiSelect
                                    options={intoleranceOptions.map((intolerance) => ({ value: intolerance.name, label: intolerance.name }))}
                                    onChange={(e) => setIntolerances(e)}
                                    value={Array.isArray(intolerances) ? intolerances : []}
                                />
                            </GridItem>
                            <GridItem>
                                <Text>Régime alimentaire</Text>
                                <Select
                                    value={dietaryRegime}
                                    onChange={(e) => setDietaryRegime(e.target.value)}>
                                    {regimeOptions.map((regime) => (
                                        <option key={regime.id} value={regime.name}>{regime.name}</option>
                                    ))}
                                </Select>
                            </GridItem>
                            <GridItem>
                                <Text>Nombre de repas par jour</Text>
                                <Input
                                    value={mealsPerDay}
                                    onChange={handleChangeMealsPerDay}
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}>
                                </Input>
                            </GridItem>
                        </Grid>
                        <Grid templateRows={"repeat(5, 1fr)"} gap={4} padding={4}>
                            <GridItem>
                                <Text>Poids (kg)</Text>
                                <Input
                                    value={weight}
                                    onChange={handleChangeWeight}
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}>
                                </Input>
                            </GridItem>
                            <GridItem>
                                <Text>Taille (cm)</Text>
                                <Input
                                    value={height}
                                    onChange={handleChangeHeight}
                                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}>
                                </Input>
                            </GridItem>
                            <GridItem>
                                <Text>Nourriture à éviter</Text>
                                <Input
                                    value={foodToAvoid}
                                    onChange={(e) => setFoodToAvoid(e.target.value)}>
                                </Input>
                            </GridItem>
                            <GridItem>
                                <Text>Température de plat</Text>
                                <Select
                                    value={foodTemperature}
                                    onChange={(e) => setFoodTemperature(e.target.value)}>
                                    {temperatureOptions.map((temperature) => (
                                        <option key={temperature.key} value={temperature.label}>{temperature.label}</option>
                                    ))}
                                </Select>
                            </GridItem>
                            <GridItem>
                                <Text>Spécialité culinaire</Text>
                                <MultiSelect
                                    options={cuisineTypeOptions.map((cuisineType) => ({ value: cuisineType.name, label: cuisineType.name }))}
                                    onChange={(e) => setCuisineType(e)}
                                    value={Array.isArray(cuisineType) ? cuisineType : []}
                                />
                            </GridItem>
                        </Grid>
                    </Grid>
                    <Grid rowSpan={3} templateColumns={"repeat(3, 1fr)"} gap={4} padding={4}>
                        <Button
                            _hover={{ bg: "#4d648d" }}
                            color="white"
                            bg="#2C3A4F"
                            onClick={handleSubmit}>Choisir mes recettes</Button>
                        <Button
                            _hover={{ bg: "#4d648d" }}
                            color="white"
                            bg="#2C3A4F"
                            onClick={handleReset}>Vider les champs</Button>
                        <Button
                            _hover={{ bg: "#4d648d" }}
                            color="white"
                            bg="#2C3A4F"
                        >Obtenir un programme</Button>
                    </Grid>
                </form>
            </GridItem>
        </Grid>
    );
}

export default function InformationsPage() {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ width: '250px' }}>
                <LeftMenu />
            </div>

            <div style={{ flexGrow: 1 }}>
                <InformationsPageInputs />
            </div>
        </div>
    )
}