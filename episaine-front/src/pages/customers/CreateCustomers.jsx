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
import { CREATE_CUSTOMER } from "../../constants/back";
import genderOptions from '../../constants/genderOptions.json';
import frLocale from "date-fns/locale/fr";
import LeftMenu from "../../components/customers/LeftMenu";
import { useNavigate } from "react-router-dom";

// path="/client/recettes/creation_profil/" 
// page used to create a customer
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
    
        if (!customer_lastname) {
            newErrors.customer_lastname = "Nom de famille requis.";
        } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(customer_lastname)) {
            newErrors.customer_lastname = "Le nom doit contenir que des lettres.";
        }
    
        if (!customer_firstname) {
            newErrors.customer_firstname = "Prénom requis.";
        } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(customer_firstname)) {
            newErrors.customer_firstname = "Le prénom doit contenir que des lettres.";
        }
    
        if (!customer_birthdate) {
            newErrors.customer_birthdate = "Date de naissance requise.";
        }
    
        if (!gender) {
            newErrors.gender = "Genre requis.";
        }
    
        if (!customer_phone_number) {
            newErrors.customer_phone_number = "Numéro de téléphone requis.";
        } else if (!/^(\+33|0)[1-9]\d{8}$/.test(customer_phone_number)) {
            newErrors.customer_phone_number = "Numéro de téléphone non valide. Format : 0XXXXXXXXX";
        }
    
        if (!customer_mail) {
            newErrors.customer_mail = "Adresse mail requise.";
        } else if (!/\S+@\S+\.\S+/.test(customer_mail)) {
            newErrors.customer_mail = "Adresse mail non valide. Format : exemple@exemple.com.";
        }
    
        if (!postal_code) {
            newErrors.postal_code = "Code postal requis.";
        } else if (!/^\d{5}$/.test(postal_code)) {
            newErrors.postal_code = "Code postal non valide.";
        }
    
        if (!city) {
            newErrors.city = "Ville requise.";
        }
    
        if (!address) {
            newErrors.address = "Adresse requise.";
        }
    
        setErrors(newErrors);
    
        if (Object.keys(newErrors).length > 0) {
            console.log("Formulaire invalide !");
            return;
        }
    
        try {
            const date_creation = new Date().toISOString().split('T')[0];
            console.log("Date de création du client : ", date_creation);
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
                date_creation
            });
    
            console.log("ID du client créé : ", response.data);
            navigate("/client/recettes/informations/", { state: { inputValue: response.data } });
        } catch (error) {
            console.error("Erreur lors de la création du client : ", error);
        }
    };
    

    const handleBlur = useCallback((field) => {
        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            if (field === "customer_lastname") {
                if (!customer_lastname) {
                    newErrors.customer_lastname = "Nom de famille requis.";
                } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(customer_lastname)) {
                    newErrors.customer_lastname = "Le nom doit contenir que des lettres.";
                } else { delete newErrors.customer_lastname; }
            }
            if (field === "customer_firstname") {
                if (!customer_firstname) {
                    newErrors.customer_firstname = "Prénom requis.";
                } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(customer_firstname)) {
                    newErrors.customer_firstname = "Le prénom doit contenir que des lettres.";
                } else { delete newErrors.customer_firstname; }
            }
            if (field === "customer_birthdate") {
                if (!customer_birthdate) {
                    newErrors.customer_birthdate = "Date de naissance requise";
                } else { delete newErrors.customer_birthdate }
            }
            if (field === "gender") {
                if (!gender) {
                    newErrors.gender = "Genre requis";
                } else { delete newErrors.gender }
            }
            if (field === "customer_phone_number") {
                if (!customer_phone_number) {
                    newErrors.customer_phone_number = "Numéro de téléphone requis";
                } else if (!/^(\+33|0)[1-9]\d{8}$/.test(customer_phone_number)) {
                    newErrors.customer_phone_number =
                        "Numéro de téléphone non valide. Format : 0XXXXXXXXX";
                } else { delete newErrors.customer_phone_number }
            }
            if (field === "customer_mail") {
                if (!customer_mail) {
                    newErrors.customer_mail = "Adresse mail requis";
                } else if (!/\S+@\S+\.\S+/.test(customer_mail)) {
                    newErrors.customer_mail = "Adresse mail non valide. Format : exemple@exemple.com.";
                } else { delete newErrors.customer_mail }
            }
            if (field === "postal_code") {
                if (!postal_code) {
                    newErrors.postal_code = "Code postal requis.";
                } else if (!/^\d{5}$/.test(postal_code)) {
                    newErrors.postal_code = "Code postal non valide.";
                } else { delete newErrors.postal_code }
            }
            if (field === "city") {
                if (!city) {
                    newErrors.city = "Ville requise.";
                } else { delete newErrors.city }
            }
            if (field === "address") {
                if (!address) {
                    newErrors.address = "Adresse requise.";
                } else { delete newErrors.address }
            }

            return newErrors;
        });
    }, [
        customer_lastname,
        customer_firstname,
        customer_birthdate,
        gender,
        customer_phone_number,
        customer_mail,
        postal_code,
        city,
        address,
    ]);


    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="md" style={{ marginTop: "40px" }}>
                <Grid container justifyContent="center" alignItems="center" style={{ marginBottom: "20px" }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Formulaire client
                    </Typography>
                </Grid>
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
                                onBlur={() => handleBlur("customer_lastname")}
                                error={Boolean(errors.customer_lastname && errors.customer_lastname !== "")}
                                helpertext={errors.customer_lastname}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Prénom"
                                variant="outlined"
                                value={customer_firstname}
                                onChange={(e) => setCustomerFirstName(e.target.value)}
                                onBlur={() => handleBlur("customer_firstname")}
                                error={Boolean(errors.customer_firstname && errors.customer_firstname !== "")}
                                helpertext={errors.customer_firstname}
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={frLocale}>
                                <DatePicker
                                    label="Date de naissance"
                                    value={customer_birthdate}
                                    onChange={(newValue) => setCustomerBirthDate(newValue)}
                                    onBlur={() => handleBlur("customer_birthdate")}
                                    format="dd-MM-yyyy"
                                    shouldDisableDate={(date) => date >= new Date()}
                                    slotProps={{
                                        textField: {
                                            error: Boolean(errors.customer_birthdate && errors.customer_birthdate !== ""),
                                            helperText: errors.customer_birthdate,
                                            fullWidth: true,
                                            margin: "normal",
                                        },
                                    }}
                                />
                            </LocalizationProvider>
                            <FormControl fullWidth variant="outlined" margin="normal" error={Boolean(errors.gender && errors.gender !== "")}>
                                <InputLabel>Genre</InputLabel>
                                <Select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    label="Genre"
                                    onBlur={() => handleBlur("gender")}
                                >
                                    {genderOptions.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.gender && errors.gender !== "" && <FormHelperText>{errors.gender}</FormHelperText>}
                            </FormControl>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Numéro de téléphone"
                                variant="outlined"
                                value={customer_phone_number}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                error={Boolean(errors.customer_phone_number && errors.customer_phone_number !== "")}
                                helpertext={errors.customer_phone_number}
                                onBlur={() => handleBlur("customer_phone_number")}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Email"
                                variant="outlined"
                                value={customer_mail}
                                onChange={(e) => setEmail(e.target.value)}
                                error={Boolean(errors.customer_mail && errors.customer_mail !== "")}
                                helpertext={errors.customer_mail}
                                onBlur={() => handleBlur("customer_mail")}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Ville"
                                variant="outlined"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                error={Boolean(errors.city && errors.city !== "")}
                                helpertext={errors.city}
                                onBlur={() => handleBlur("city")}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Adresse"
                                variant="outlined"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                error={Boolean(errors.address && errors.address !== "")}
                                helpertext={errors.address}
                                onBlur={() => handleBlur("address")}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Code postal"
                                variant="outlined"
                                value={postal_code}
                                onChange={(e) => setPostalCode(e.target.value)}
                                error={Boolean(errors.postal_code && errors.postal_code !== "")}
                                helpertext={errors.postal_code}
                                onBlur={() => handleBlur("postal_code")}
                            />
                        </Grid>
                    </Grid>
                    <Grid container justifyContent="center" style={{ marginTop: "20px" }}>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                        >
                            Valider
                        </Button>
                    </Grid>
                </form>
            </Container>
        </ThemeProvider>
    );
}

export default function CreateCustomers() {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ width: '250px' }}>
                <LeftMenu />
            </div>

            <div style={{ flexGrow: 1 }}>
                <Customers />
            </div>
        </div>
    );
}
