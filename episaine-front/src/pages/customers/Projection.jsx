import React, { useEffect, useState } from "react";
import LeftMenu from "../../components/customers/LeftMenu";
import { Box, Button, CircularProgress, Grid, GridItem, Input, Text } from "@chakra-ui/react";
import { getCustomerProgression, projection, saveCustomerProgression, updateCustomerInformation, updateCustomerProgression } from "../../api/customerAPI";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useNavigate } from "react-router-dom";

function ProjectionPage() {

    const [value, setValue] = useState()
    const [mealsPerDay, setValueMeals] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState([]);
    const [weightsListGenerated, setWeightsListGenerated] = useState([]);
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
    const [customerProgress, setCustomerProgress] = useState({});
    const [exist, setExist] = useState(false);

    const [startDay, setStartDay] = useState(0);
    const [tempWeightValue, setTempWeightValue] = useState(null);
    const [tempWeightsList, setTempWeightsList] = useState([]);

    const [informationsValues, setInformationsValues] = useState([]);

    // receive informations from previous page
    useEffect(() => {
        const informations = JSON.parse(localStorage.getItem("customer data"));
        if (informations) {
            setInformationsValues(informations);
            console.log("Id received: ", informations.fk_customer_id);
            setId(informations.fk_customer_id);

            const fetchProgression = async () => {
                try {
                    const response = await getCustomerProgression(informations.fk_customer_id);
                    setWeightsListGenerated(Object.keys(response.data.weight_forecast).map((key) => ({
                        day: Number(key),
                        weight: response.data.weight_forecast[key].toFixed(2)
                    })));
                    console.log("Progression data: ", response.data);
                    setExist(true);
                } catch (error) {
                    console.error("Error fetching customer progression:", error);
                }
            }
            fetchProgression();
        }
        else {
            console.log("No customer data found in local storage.");
        }
    }, []);

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

    const handleValidate = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        const values = await projection(id, value, mealsPerDay,
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
            maxProteines625);

        setWeightsListGenerated(Object.keys(values.data.weightProjection).map((key) => ({
            day: Number(key),
            weight: values.data.weightProjection[key].toFixed(2)
        })));

        const weightForecast = Object.keys(values.data.weightProjection).reduce((acc, key) => {
            acc[key] = parseFloat(values.data.weightProjection[key].toFixed(2));
            return acc;
        }, {});

        const customerProgress = {
            customerId: id,
            weightForecast: weightForecast
        }

        setCustomerProgress(customerProgress);

        setRecipesList((values.data.recipes).map(recipes => [[recipes.value1], recipes.value0 + 1]));
        console.log("Recettes: ", recipesList);

        setIsLoading(false);
    }

    // sent saved recipes to the next page
    const handleGetRecipes = () => {
        navigate("/client/recettes/resultat/", { state: { inputValue: recipesList } });
    }

    const handleSave = async (e) => {
        e.preventDefault();
        if (!exist) {
            try {
                await saveCustomerProgression(customerProgress);
                console.log("Projection saved successfully!");
            }
            catch (error) {
                console.error("Error saving projection:", error);
            }
        }
        else {
            try {
                await updateCustomerProgression(customerProgress);
                console.log("Projection updated successfully!");
            }
            catch (error) {
                console.error("Error updating projection:", error);
            }
        }
    }

    const handleTemp = async (e) => {
        e.preventDefault();
        const weight = informationsValues.weight;

        try {
            informationsValues.weight = tempWeightValue;
            await updateCustomerInformation(informationsValues).then(
                console.log("Customer information updated successfully:" + informationsValues.weight)
            ).catch((error) => {
                console.error("Error updating customer information:", error);
            });
        } catch (error) {
            console.error("Error updating customer information:", error);
        }

        setIsLoading(true);
        let values;
        try {
            values = await projection(id, value, mealsPerDay,
            startDay,
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
            maxProteines625);
        } catch (error) {
            console.error("Error fetching projection data:", error);
            setIsLoading(false);
            return;
        }

        setTempWeightsList(Object.keys(values.data.weightProjection).map((key) => ({
            day: Number(key),
            weight: values.data.weightProjection[key].toFixed(2)
        })));

        const weightForecast = Object.keys(values.data.weightProjection).reduce((acc, key) => {
            acc[key] = parseFloat(values.data.weightProjection[key].toFixed(2));
            return acc;
        }, {});

        const customerProgress = {
            customerId: id,
            weightForecast: weightForecast
        }

        setCustomerProgress(customerProgress);

        setRecipesList((values.data.recipes).map(recipes => [[recipes.value1], recipes.value0 + 1]));
        console.log("Recettes: ", recipesList);

        informationsValues.weight = weight;
        try {
            await updateCustomerInformation(informationsValues);
            console.log("Customer information updated successfully:" + informationsValues.weight)
        } catch (error) {
            console.error("Error updating customer information:", error);
        }
        setIsLoading(false);
    }

    const mergeWeightLists = (list1, list2) => {
        const allDays = new Set([
            ...list1.map(item => item.day),
            ...list2.map(item => item.day),
        ]);

        return Array.from(allDays).sort((a, b) => a - b).map(day => {
            const item1 = list1.find(item => item.day === day);
            const item2 = list2.find(item => item.day === day);

            return {
                day,
                weight: item1 ? parseFloat(item1.weight) : null,
                tempWeight: item2 ? parseFloat(item2.weight) : null,
            };
        });
    };


    return (
        <Box width={"100%"}>
            <Grid templateRows={"repeat(2, 1fr)"} gap={6} p={10}>
                <form onSubmit={handleValidate}>
                    <GridItem>
                        <Text fontSize={"30"} fontWeight={"bold"} textAlign={"center"}>Obtenir ma courbe de progresion</Text>
                        <Grid templateColumns="repeat(5, 1fr)" gap={6} alignItems={"center"} justifyContent={"center"} paddingTop={20}>
                            <Text>Objectf de poids (kg) :</Text>
                            <Input
                                id="weight-value"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                placeholder="Objectif de poids"
                            />
                            <Text>Nombre de repas par jour :</Text>
                            <Input
                                id="number-of-days"
                                value={mealsPerDay}
                                onChange={(e) => setValueMeals(e.target.value)}
                                placeholder="Repas par jour"
                            />
                        </Grid >
                    </GridItem>

                    <GridItem>
                        <Grid templateColumns="repeat(5, 1fr)" gap={6} alignItems={"center"} justifyContent={"center"} >
                            <Button _hover={{ bg: "#4d648d" }} color="white" bg="#2C3A4F" type='submit' id="validate-projection">Obtenir ma projection</Button>
                            {isLoading && <CircularProgress isIndeterminate color='green.300' />}
                            <Button _hover={{ bg: "#4d648d" }} color="white" bg="#2C3A4F" onClick={handleSave} id="save-projection">Enregistrer ma projection</Button>
                        </Grid>
                    </GridItem>
                </form>
                <GridItem>
                    <ResponsiveContainer >
                        <LineChart
                            width={500}
                            height={300}
                            data={mergeWeightLists(weightsListGenerated, tempWeightsList)}
                            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={"day"} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="weight"
                                stroke="#8884d8"
                                name="Projection de base"
                                activeDot={{ r: 8 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="tempWeight"
                                stroke="#82ca9d"
                                name="Évolution actuelle"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </GridItem>
                <Button _hover={{ bg: "#4d648d" }} color="white" bg="#2C3A4F" onClick={handleGetRecipes}>Obtenir les recettes</Button>
                <Grid templateColumns="repeat(4, 1fr)" gap={6} alignItems={"center"} justifyContent={"center"} >
                    <Text>Jour numéro :</Text>
                    <Input
                        id="temp-day-value"
                        value={startDay}
                        onChange={(e) => setStartDay(e.target.value)}
                        placeholder="Jour actuel"
                    />
                    <Text>Poids actuel :</Text>
                    <Input
                        id="temp-weight-value"
                        value={tempWeightValue}
                        onChange={(e) => setTempWeightValue(e.target.value)}
                        placeholder="Poids actuel"
                    />
                    <Button _hover={{ bg: "#4d648d" }} color="white" bg="#2C3A4F" onClick={(handleTemp)}>Afficher mon évolution</Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default function Projection() {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div>
                <LeftMenu />
            </div>
            <div>
                <ProjectionPage />
            </div>
        </div>
    )
}