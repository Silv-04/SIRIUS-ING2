import { Box, Button, Flex, Grid, Heading } from "@chakra-ui/react";
import React, { useState } from "react";
import LeftMenu from "../../components/customers/LeftMenu";
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";
import { IoTrashBin } from "react-icons/io5";
import { Link as RouterLink } from "react-router-dom";

function NutritionalPreferencesPage() {

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

    const handleInputChange = (setter) => (e) => {
        let value = e.target.value.replace(/\D/g, "");
        setter(value ? Number(value) : 0);
    };

    const handleReset = () => {
        setMinGlucides();
        setMaxGlucides();
        setMinLipides();
        setMaxLipides();
        setMinGlucose();
        setMaxGlucose();
        setMinLactose();
        setMaxLactose();
        setMinMaltose();
        setMaxMaltose();
        setMinAmidon();
        setMaxAmidon();
        setMinFibres();
        setMaxFibres();
        setMinCholesterol();
        setMaxCholesterol();
        setMinSel();
        setMaxSel();
        setMinCalcium();
        setMaxCalcium();
        setMinCuivre();
        setMaxCuivre();
        setMinFer();
        setMaxFer();
        setMinProteines625();
        setMaxProteines625();
    };

    const handleSubmitChoice = () => {
        if (minGlucides) {
            localStorage.setItem("minGlucides", minGlucides);
        }
        if (maxGlucides) {
            localStorage.setItem("maxGlucides", maxGlucides);
        }
        if (minLipides) {
            localStorage.setItem("minLipides", minLipides);
        }
        if (maxLipides) {
            localStorage.setItem("maxLipides", maxLipides);
        }
        if (minGlucose) {
            localStorage.setItem("minGlucose", minGlucose);
        }
        if (maxGlucose) {
            localStorage.setItem("maxGlucose", maxGlucose);
        }
        if (minLactose) {
            localStorage.setItem("minLactose", minLactose);
        }
        if (maxLactose) {
            localStorage.setItem("maxLactose", maxLactose);
        }
        if (minMaltose) {
            localStorage.setItem("minMaltose", minMaltose);
        }
        if (maxMaltose) {
            localStorage.setItem("maxMaltose", maxMaltose);
        }
        if (minAmidon) {
            localStorage.setItem("minAmidon", minAmidon);
        }
        if (maxAmidon) {
            localStorage.setItem("maxAmidon", maxAmidon);
        }
        if (minFibres) {
            localStorage.setItem("minFibres", minFibres);
        }
        if (maxFibres) {
            localStorage.setItem("maxFibres", maxFibres);
        }
        if (minCholesterol) {
            localStorage.setItem("minCholesterol", minCholesterol);
        }
        if (maxCholesterol) {
            localStorage.setItem("maxCholesterol", maxCholesterol);
        }
        if (minSel) {
            localStorage.setItem("minSel", minSel);
        }
        if (maxSel) {
            localStorage.setItem("maxSel", maxSel);
        }
        if (minCalcium) {
            localStorage.setItem("minCalcium", minCalcium);
        }
        if (maxCalcium) {
            localStorage.setItem("maxCalcium", maxCalcium);
        }
        if (minCuivre) {
            localStorage.setItem("minCuivre", minCuivre);
        }
        if (maxCuivre) {
            localStorage.setItem("maxCuivre", maxCuivre);
        }
        if (minFer) {
            localStorage.setItem("minFer", minFer);
        }
        if (maxFer) {
            localStorage.setItem("maxFer", maxFer);
        }
        if (minProteines625) {
            localStorage.setItem("minProteines625", minProteines625);
        }
        if (maxProteines625) {
            localStorage.setItem("maxProteines625", maxProteines625);
        }
    };
    return (
        <Box mb={4} p={10}>
            <Heading fontWeight="bold" color="teal.700" mb={2}>Valeurs nutritionnelles (Min / Max)</Heading>

            <Grid templateColumns="repeat(2, 1fr)" gap={6} mb={4}>
                {[
                    { label: "Glucides", stateMin: minGlucides, setStateMin: setMinGlucides, stateMax: maxGlucides, setStateMax: setMaxGlucides },
                    { label: "Lipides", stateMin: minLipides, setStateMin: setMinLipides, stateMax: maxLipides, setStateMax: setMaxLipides },
                    { label: "Glucose", stateMin: minGlucose, setStateMin: setMinGlucose, stateMax: maxGlucose, setStateMax: setMaxGlucose },
                    { label: "Lactose", stateMin: minLactose, setStateMin: setMinLactose, stateMax: maxLactose, setStateMax: setMaxLactose },
                    { label: "Maltose", stateMin: minMaltose, setStateMin: setMinMaltose, stateMax: maxMaltose, setStateMax: setMaxMaltose },
                    { label: "Amidon", stateMin: minAmidon, setStateMin: setMinAmidon, stateMax: maxAmidon, setStateMax: setMaxAmidon },
                    { label: "Fibres", stateMin: minFibres, setStateMin: setMinFibres, stateMax: maxFibres, setStateMax: setMaxFibres },
                    { label: "Cholestérol", stateMin: minCholesterol, setStateMin: setMinCholesterol, stateMax: maxCholesterol, setStateMax: setMaxCholesterol },
                    { label: "Sel", stateMin: minSel, setStateMin: setMinSel, stateMax: maxSel, setStateMax: setMaxSel },
                    { label: "Calcium", stateMin: minCalcium, setStateMin: setMinCalcium, stateMax: maxCalcium, setStateMax: setMaxCalcium },
                    { label: "Cuivre", stateMin: minCuivre, setStateMin: setMinCuivre, stateMax: maxCuivre, setStateMax: setMaxCuivre },
                    { label: "Fer", stateMin: minFer, setStateMin: setMinFer, stateMax: maxFer, setStateMax: setMaxFer },
                    { label: "Protéines", stateMin: minProteines625, setStateMin: setMinProteines625, stateMax: maxProteines625, setStateMax: setMaxProteines625 }
                ].map((nutrient, index) => (
                    <Flex key={index} alignItems="center" mb={2}>
                        <label style={{ width: "150px", marginRight: "10px" }}>{nutrient.label} :</label>

                        <input
                            type="number"
                            value={nutrient.stateMin ?? ""}
                            placeholder="Min"
                            onChange={handleInputChange(nutrient.setStateMin)}
                            style={{
                                padding: "5px",
                                width: "80px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                marginRight: "10px"
                            }}
                        />
                        <input
                            type="number"
                            value={nutrient.stateMax ?? ""}
                            placeholder="Max"
                            onChange={handleInputChange(nutrient.setStateMax)}
                            style={{ padding: "5px", width: "80px", border: "1px solid #ccc", borderRadius: "5px" }}
                        />
                    </Flex>
                ))}
            </Grid>
            
            <Grid templateColumns={"repeat(3, 1fr)"} gap={4} padding={4}>
                    <Button
                        leftIcon={<IoMdArrowRoundBack />}
                        _hover={{ bg: "#4d648d" }}
                        color="white"
                        bg="#2C3A4F"
                        as={RouterLink}
                        to="/client/menu/">Retour</Button>
                    <Button
                        leftIcon={<IoTrashBin />}
                        _hover={{ bg: "#4d648d" }}
                        color="white"
                        bg="#2C3A4F"
                        onClick={handleReset}>Vider les champs</Button>
                    <Button
                        rightIcon={<IoMdArrowRoundForward />}
                        id='get-recipes-button'
                        _hover={{ bg: "#4d648d" }}
                        color="white"
                        bg="#2C3A4F"
                        onClick={handleSubmitChoice}>Valider</Button>
                </Grid>
        </Box>
    )
}

export default function NutritionalPreferences() {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ width: '250px' }}>
                <LeftMenu />
            </div>

            <div style={{ flexGrow: 1 }}>
                <NutritionalPreferencesPage />
            </div>
        </div>
    )
}