import React, { useEffect, useState } from "react";
import LeftMenu from "../../components/customers/LeftMenu";
import { Box, Button, CircularProgress, Grid, GridItem, Input, Text } from "@chakra-ui/react";
import { projection } from "../../api/customerAPI";
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

    // receive informations from previous page
    useEffect(() => {
        const informations = JSON.parse(localStorage.getItem("customer data"));
        if (informations) {
            console.log("Id received: ", informations.fk_customer_id);
            setId(informations.fk_customer_id);
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

        setRecipesList((values.data.recipes).map(recipes => [[recipes.value1], recipes.value0+1]));
        console.log("Recettes: ", recipesList);

        setIsLoading(false);
    }

    // sent saved recipes to the next page
    const handleGetRecipes = () => {
        navigate("/client/recettes/resultat/", { state: { inputValue: recipesList } });
    }

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
                        <Button _hover={{ bg: "#4d648d" }} color="white" bg="#2C3A4F" type='submit' id="validate-projection">Obtenir ma projection</Button>
                        {isLoading && <CircularProgress isIndeterminate color='green.300' />}
                    </GridItem>
                </form>
                <GridItem>
                    <ResponsiveContainer >
                        <LineChart
                            width={500}
                            height={300}
                            data={weightsListGenerated}
                            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey={"day"} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 8 }} name="Poids (kg)" />
                        </LineChart>
                    </ResponsiveContainer>
                </GridItem>
                <Button _hover={{ bg: "#4d648d" }} color="white" bg="#2C3A4F" onClick={handleGetRecipes}>Obtenir les recettes</Button>
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