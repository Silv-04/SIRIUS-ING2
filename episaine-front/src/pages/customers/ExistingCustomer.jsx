import React, { useState } from "react";
import LeftMenu from "../../components/customers/LeftMenu";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Box, Button, Divider, Grid, GridItem, Input, Text } from "@chakra-ui/react";

// path="/client/recettes/
// page to redirect whether we want to create a customer or fetch informations from an existing customer
function ExistingCustomerOrNot() {
    const [customerNumber, setCustomerNumber] = useState("");
    const navigate = useNavigate();

    // handle the action of allowing only numbers in textfield
    const handleChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setCustomerNumber(value);
        }
    };

    // reset the textfield when the button is clicked
    const handleReset = () => {
        setCustomerNumber("");
    };

    // validate button's action
    const handleValidate = () => {
        if (customerNumber) {
            console.log("Customer number: ", customerNumber);
            navigate("/client/recettes/informations/", { state: { inputValue: customerNumber } });
        }
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Grid templateRows={"repeat(2, 1fr)"} gap={6}>
                <Text fontSize={"30"} fontWeight={"bold"} textAlign={"center"}>Choix de connexion</Text>
                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <GridItem paddingTop={8}>
                        <Button as={RouterLink} to="/client/recettes/creation_profil/">Création d'un profil client</Button>
                    </GridItem>
                    <GridItem paddingLeft={20}>
                        <Divider orientation="vertical" />
                    </GridItem>
                    <GridItem>
                        <Grid gap={3}>
                            <Text fontWeight={"bold"} textAlign={"center"}>Client existant</Text>
                            <Input
                                placeholder="Numéro client"
                                value={customerNumber}
                                onChange={handleChange}
                                fullWidth
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            />
                            <Grid align={"center"} templateColumns={"repeat(2, 1fr"}>
                                <GridItem gridColumn={1}><Button bgColor={"#bbf7d0"} onClick={handleValidate}>Valider</Button></GridItem>
                                <GridItem gridColumn={2}><Button bgColor={"#fca5a5"} onClick={handleReset}>Annuler</Button></GridItem>
                            </Grid>
                        </Grid>
                    </GridItem>
                </Grid>
            </Grid>
        </Box>
    );
}

export default function ExistingCustomer() {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ width: '250px' }}>
                <LeftMenu />
            </div>

            <div style={{ flexGrow: 1 }}>
                <ExistingCustomerOrNot />
            </div>
        </div>
    );
}
