import React, { useCallback, useState } from "react";
import axios from "axios";
import {
    TextField,
    Button,
    Container,
    Typography,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    createTheme,
    ThemeProvider,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Person, Mail, Phone, LocationCity, Home, CheckCircle } from "@mui/icons-material";
import frLocale from "date-fns/locale/fr";
import LeftMenu from "../../components/customers/LeftMenu";
import { useNavigate } from "react-router-dom";
import genderOptions from "../../constants/genderOptions.json";
import { CREATE_CUSTOMER } from "../../constants/back";

function Customers() {
    const [customer_lastname, setCustomerLastName] = useState("");
    const [customer_firstname, setCustomerFirstName] = useState("");
    const [customer_birthdate, setCustomerBirthDate] = useState(null);
    const [gender, setGender] = useState("");
    const [customer_phone_number, setPhoneNumber] = useState("");
    const [customer_mail, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [postal_code, setPostalCode] = useState("");
    const [errors, setErrors] = useState({});
    const theme = createTheme();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!customer_lastname) newErrors.customer_lastname = "Nom de famille requis.";
        if (!customer_firstname) newErrors.customer_firstname = "Prénom requis.";
        if (!customer_birthdate) newErrors.customer_birthdate = "Date de naissance requise.";
        if (!gender) newErrors.gender = "Genre requis.";
        if (!customer_phone_number) newErrors.customer_phone_number = "Numéro de téléphone requis.";
        if (!customer_mail) newErrors.customer_mail = "Adresse mail requise.";
        if (!city) newErrors.city = "Ville requise.";
        if (!address) newErrors.address = "Adresse requise.";
        if (!postal_code) newErrors.postal_code = "Code postal requis.";

        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        try {
            const date_creation = new Date().toISOString().split("T")[0];
            const response = await axios.post(CREATE_CUSTOMER, {
                customer_lastname,
                customer_firstname,
                customer_birthdate,
                gender,
                customer_phone_number,
                customer_mail,
                city,
                address,
                postal_code,
                date_creation,
            });
            navigate("/client/recettes/informations/", { state: { inputValue: response.data } });
        } catch (error) {
            console.error("Erreur lors de la création du client :", error);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md" style={{ marginTop: "40px" }}>
                <Typography
                    variant="h4"
                    color="primary"
                    textAlign="center"
                    gutterBottom
                    sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "center" }}
                >
                    <Person /> Formulaire de Création de Client
                </Typography>
                <Typography
                    variant="body1"
                    color="textSecondary"
                    textAlign="center"
                    mb={4}
                >
                    Remplissez les informations nécessaires pour créer un nouveau profil client.
                </Typography>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Nom de famille"
                                variant="outlined"
                                value={customer_lastname}
                                onChange={(e) => setCustomerLastName(e.target.value)}
                                error={Boolean(errors.customer_lastname)}
                                helperText={errors.customer_lastname}
                                InputProps={{
                                    startAdornment: <Person sx={{ mr: 1 }} />,
                                }}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Prénom"
                                variant="outlined"
                                value={customer_firstname}
                                onChange={(e) => setCustomerFirstName(e.target.value)}
                                error={Boolean(errors.customer_firstname)}
                                helperText={errors.customer_firstname}
                                InputProps={{
                                    startAdornment: <Person sx={{ mr: 1 }} />,
                                }}
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={frLocale}>
                                <DatePicker
                                    label="Date de naissance"
                                    value={customer_birthdate}
                                    onChange={(newValue) => setCustomerBirthDate(newValue)}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            fullWidth
                                            margin="normal"
                                            error={Boolean(errors.customer_birthdate)}
                                            helperText={errors.customer_birthdate}
                                        />
                                    )}
                                />
                            </LocalizationProvider>
                            <FormControl fullWidth margin="normal" error={Boolean(errors.gender)}>
                                <InputLabel>Genre</InputLabel>
                                <Select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    label="Genre"
                                >
                                    {genderOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.gender && <FormHelperText>{errors.gender}</FormHelperText>}
                            </FormControl>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Numéro de téléphone"
                                variant="outlined"
                                value={customer_phone_number}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                error={Boolean(errors.customer_phone_number)}
                                helperText={errors.customer_phone_number}
                                InputProps={{
                                    startAdornment: <Phone sx={{ mr: 1 }} />,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Adresse email"
                                variant="outlined"
                                value={customer_mail}
                                onChange={(e) => setEmail(e.target.value)}
                                error={Boolean(errors.customer_mail)}
                                helperText={errors.customer_mail}
                                InputProps={{
                                    startAdornment: <Mail sx={{ mr: 1 }} />,
                                }}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Ville"
                                variant="outlined"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                error={Boolean(errors.city)}
                                helperText={errors.city}
                                InputProps={{
                                    startAdornment: <LocationCity sx={{ mr: 1 }} />,
                                }}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Adresse"
                                variant="outlined"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                error={Boolean(errors.address)}
                                helperText={errors.address}
                                InputProps={{
                                    startAdornment: <Home sx={{ mr: 1 }} />,
                                }}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Code postal"
                                variant="outlined"
                                value={postal_code}
                                onChange={(e) => setPostalCode(e.target.value)}
                                error={Boolean(errors.postal_code)}
                                helperText={errors.postal_code}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            startIcon={<CheckCircle />}
                            sx={{ textTransform: "none", fontSize: "1rem", paddingX: 4 }}
                        >
                            Créer le client
                        </Button>
                    </Grid>
                </form>
            </Container>
        </ThemeProvider>
    );
}

export default function CreateCustomers() {
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <div style={{ width: "250px" }}>
                <LeftMenu />
            </div>
            <div style={{ flexGrow: 1 }}>
                <Customers />
            </div>
        </div>
    );
}
