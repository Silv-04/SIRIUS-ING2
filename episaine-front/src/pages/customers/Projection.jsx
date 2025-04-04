import React, { useEffect, useState } from "react";
import LeftMenu from "../../components/customers/LeftMenu";
import { Box, Button, Grid, GridItem, Input, Text } from "@chakra-ui/react";
import { projection } from "../../api/customerAPI";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useNavigate } from "react-router-dom";

function ProjectionPage() {

    const [value, setValue] = useState()
    const [id, setId] = useState([]);
    const [weightsListGenerated, setWeightsListGenerated] = useState([]);
    const [recipesList, setRecipesList] = useState([]);
    const navigate = useNavigate();

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

    const handleValidate = async (e) => {
        e.preventDefault();

        const values = await projection(id, value);

        setWeightsListGenerated(Object.keys(values.data.weightProjection).map((key) => ({
            day: Number(key),
            weight: values.data.weightProjection[key].toFixed(2)
        })));

        setRecipesList((values.data.recipes).map(recipes => [[recipes.value1], recipes.value0+1]));
        console.log("Recettes: ", recipesList);
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
                        </Grid >
                    </GridItem>
                    <GridItem>
                        <Button _hover={{ bg: "#4d648d" }} color="white" bg="#2C3A4F" type='submit' id="validate-projection">Obtenir ma projection</Button>
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