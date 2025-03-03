import React, { useState } from "react";
import LeftMenu from "../../components/customers/LeftMenu";
import { Grid, Input, Text } from "@chakra-ui/react";

function ProjectionPage() {
    const [value, setValue] = useState(0)
    return (
        <Grid templateRows={"repeat(2, 1fr)"} gap={6} p={10}>
            <Text fontSize={"30"} fontWeight={"bold"} textAlign={"center"}>Obtenir ma courbe de progresion</Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={6} alignItems={"center"} justifyContent={"center"}>
                <Text>Objectf de poids (kg) :</Text>
                <Input
                    type="number"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Objectif de poids"
                />
            </Grid>
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