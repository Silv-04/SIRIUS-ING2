import React, { useEffect, useState } from "react";
import LeftMenu from "../../components/customers/LeftMenu";
import { Button, Grid, GridItem, Input, Text } from "@chakra-ui/react";
import { projection } from "../../api/customerAPI";
import { useLocation } from "react-router-dom";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function ProjectionPage() {

    const location = useLocation();
    const [value, setValue] = useState(0)
    const [id, setId] = useState([]);
    const [weightsListGenerated, setWeightsListGenerated] = useState([]);

    // receive informations from previous page
    useEffect(() => {
        if (location.state?.inputValue) {
            console.log("Id received: ", location.state.inputValue);
            setId(location.state.inputValue);
        }
    }, [location.state]);

    const handleValidate = async (e) => {
        e.preventDefault();
        console.log("Id: ", id);
        console.log("Value: ", value);

        const weightList = await projection(id, value);
        setWeightsListGenerated(Object.keys(weightList.data).map((key) => ({ day: Number(key), weight: weightList.data[key].toFixed(2) })));
        console.log("Weight list generated: ", weightsListGenerated);
    }

    return (
        <Grid templateRows={"repeat(2, 1fr)"} gap={6} p={10}>
            <form onSubmit={handleValidate}>
                <GridItem>
                    <Text fontSize={"30"} fontWeight={"bold"} textAlign={"center"}>Obtenir ma courbe de progresion</Text>
                    <Grid templateColumns="repeat(3, 1fr)" gap={6} alignItems={"center"} justifyContent={"center"} paddingTop={20}>
                        <Text>Objectf de poids (kg) :</Text>
                        <Input
                            type="number"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Objectif de poids"
                        />
                    </Grid >
                </GridItem>
                <GridItem>
                    <Button _hover={{ bg: "#4d648d" }} color="white" bg="#2C3A4F" type='submit'>Obtenir ma projection</Button>
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
                        <Line type="monotone" dataKey="weight" stroke="#8884d8" activeDot={{ r: 8 }} name="Poids (kg)"/>
                    </LineChart>
                </ResponsiveContainer>
            </GridItem>
        </Grid>
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