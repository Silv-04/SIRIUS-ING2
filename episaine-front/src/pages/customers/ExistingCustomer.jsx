import React, { useState } from "react";
import { Box, Grid, Typography, TextField, Button, Divider, ThemeProvider, createTheme } from "@mui/material";
import LeftMenu from "../../components/customers/LeftMenu";
import { useNavigate, Link as RouterLink } from "react-router-dom";

// path="/client/recettes/
// page to redirect whether we want to create a customer or fetch informations from an existing customer
function ExistingCustomerOrNot() {
    const [customerNumber, setCustomerNumber] = useState("");
    const navigate = useNavigate();

    const theme = createTheme();

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
            navigate("/client/recettes/informations/", { state: {inputValue: customerNumber} });
        }
    }

    return (
        <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Grid container sx={{ width: "70%", padding: 4 }}>

                <Grid sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Button variant="contained" color="primary" size="large" component={RouterLink} to="/client/recettes/creation_profil/">Création d'un profil client</Button>
                </Grid>

                <Grid sx={{marginX: 10}}>
                    <Divider orientation="vertical" sx={{ height: "100%" }} />
                </Grid>

                <Grid sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography variant="h6" gutterBottom>Client existant</Typography>
                    <TextField
                        label="Numéro de client"
                        variant="outlined"
                        value={customerNumber}
                        onChange={handleChange}
                        fullWidth
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    />
                    <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", marginTop: 2 }}>
                        <Button variant="contained" color="success" onClick={handleValidate}>Valider</Button>
                        <Button variant="outlined" color="error" onClick={handleReset}>Annuler</Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>

        </ThemeProvider>
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
