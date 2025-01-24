import React, { useState } from "react";
import {
    Box,
    Grid,
    Typography,
    TextField,
    Button,
    Divider,
    ThemeProvider,
    createTheme,
    Paper,
} from "@mui/material";
import { AccountCircle, PersonAdd, Search } from "@mui/icons-material";
import LeftMenu from "../../components/customers/LeftMenu";
import { useNavigate, Link as RouterLink } from "react-router-dom";

function ExistingCustomerOrNot() {
    const [customerNumber, setCustomerNumber] = useState("");
    const navigate = useNavigate();

    const theme = createTheme({
        palette: {
            primary: { main: "#1976d2" },
            secondary: { main: "#ff9800" },
            success: { main: "#4caf50" },
            error: { main: "#f44336" },
        },
        typography: { fontFamily: "Roboto, Arial, sans-serif" },
    });

    const handleChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) setCustomerNumber(value);
    };

    const handleReset = () => setCustomerNumber("");
    const handleValidate = () => {
        if (customerNumber) {
            console.log("Customer number: ", customerNumber);
            navigate("/client/recettes/informations/", { state: { inputValue: customerNumber } });
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh",
                    backgroundColor: "#f5f7fa",
                }}
            >
                <Paper
                    elevation={6}
                    sx={{
                        padding: 4,
                        width: "80%",
                        borderRadius: 2,
                        backgroundColor: "#ffffff",
                    }}
                >
                    <Typography
                        variant="h4"
                        color="primary"
                        textAlign="center"
                        mb={4}
                        sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 1 }}
                    >
                        <AccountCircle fontSize="large" /> Bienvenue dans l'Espace Client
                    </Typography>
                    <Typography variant="body1" textAlign="center" mb={4} color="textSecondary">
                        Gérez vos profils clients ou recherchez un client existant. Choisissez une option pour continuer.
                    </Typography>
                    <Grid container spacing={4} alignItems="center" justifyContent="center">
                        <Grid item xs={12} sm={5} sx={{ textAlign: "center" }}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                component={RouterLink}
                                to="/client/recettes/creation_profil/"
                                startIcon={<PersonAdd />}
                                sx={{
                                    textTransform: "none",
                                    fontSize: "1.2rem",
                                    paddingX: 3,
                                    borderRadius: "8px",
                                }}
                            >
                                Création d'un profil client
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={1}>
                            <Divider orientation="vertical" flexItem />
                        </Grid>
                        <Grid item xs={12} sm={5}>
                            <Typography variant="h6" gutterBottom color="primary" sx={{ textAlign: "center" }}>
                                Client existant
                            </Typography>
                            <TextField
                                label="Numéro de client"
                                variant="outlined"
                                value={customerNumber}
                                onChange={handleChange}
                                fullWidth
                                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                                sx={{ marginBottom: 2 }}
                            />
                            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    startIcon={<Search />}
                                    onClick={handleValidate}
                                    fullWidth
                                    sx={{
                                        textTransform: "none",
                                        borderRadius: "8px",
                                    }}
                                >
                                    Valider
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={handleReset}
                                    fullWidth
                                    sx={{
                                        textTransform: "none",
                                        borderRadius: "8px",
                                    }}
                                >
                                    Annuler
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </ThemeProvider>
    );
}

export default function ExistingCustomer() {
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <div style={{ width: "250px" }}>
                <LeftMenu />
            </div>
            <div style={{ flexGrow: 1 }}>
                <ExistingCustomerOrNot />
            </div>
        </div>
    );
}
