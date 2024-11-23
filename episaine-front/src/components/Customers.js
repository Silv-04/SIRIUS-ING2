import React from "react";
import axios from "axios";
import {
    TextField,
    Button,
    Container,
    Typography,
    Grid,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LOCAL_HOST_EPISAINE, ADD_CUSTOMER } from "../constants/back";

export default function Customers() {
    const [customer_lastname, setCustomerLastName] = React.useState("");
    const [customer_firstname, setCustomerFirstName] = React.useState("");
    const [customer_birthdate, setCustomerBirthDate] = React.useState(null);
    const [gender, setGender] = React.useState("");
    const [customer_phone_number, setPhoneNumber] = React.useState("");
    const [customer_mail, setEmail] = React.useState("");
    const [city, setCity] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [postal_code, setPostalCode] = React.useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const customer = {
            customer_lastname,
            customer_firstname,
            customer_birthdate,
            gender,
            customer_phone_number,
            customer_mail,
            city,
            address,
            postal_code,
        };

        axios.post(LOCAL_HOST_EPISAINE + ADD_CUSTOMER, customer)
            .then(() => {
                console.log("Submitted Data:", customer);
            })
            .catch((error) => {
                console.error("Error while submitting data:", error);
            });
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
                Customer Form
            </Typography>
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <Grid container spacing={2}>
                    {/* Colonne gauche */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Last Name"
                            variant="outlined"
                            value={customer_lastname}
                            onChange={(e) => setCustomerLastName(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="First Name"
                            variant="outlined"
                            value={customer_firstname}
                            onChange={(e) => setCustomerFirstName(e.target.value)}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Birth Date"
                                value={customer_birthdate}
                                onChange={(newValue) => setCustomerBirthDate(newValue)}
                                inputFormat="yyyy-MM-dd"
                            />
                        </LocalizationProvider>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Gender"
                            variant="outlined"
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Phone Number"
                            variant="outlined"
                            value={customer_phone_number}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </Grid>

                    {/* Colonne droite */}
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            variant="outlined"
                            value={customer_mail}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="City"
                            variant="outlined"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Address"
                            variant="outlined"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Postal Code"
                            variant="outlined"
                            value={postal_code}
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ marginTop: "20px" }}
                >
                    Submit
                </Button>
            </form>
        </Container>
    );
}
