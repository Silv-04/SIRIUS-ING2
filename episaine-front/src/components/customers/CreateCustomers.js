import React, { useState } from "react";
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
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { CREATE_CUSTOMER } from "../../constants/back";
import genderOptions from '../../constants/genderOptions.json';

export default function Customers() {
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

    const validateFields = () => {
        const newErrors = {};
        // Last Name
        if (!customer_lastname) {
            newErrors.customer_lastname = "Last Name is required";
        }
        else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(customer_lastname)) {
            newErrors.customer_lastname = "Last name must contain only letters.";
        }

        // First Name
        if (!customer_firstname) {
            newErrors.customer_firstname = "First Name is required";
        }
        else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(customer_firstname)) {
            newErrors.customer_firstname = "First name must contain only letters.";
        }
        // Birth Date
        if (!customer_birthdate) {
            newErrors.customer_birthdate = "Birth Date is required";
        }
        // Gender
        if (!gender) {
            newErrors.gender = "Gender is required"
        }
        // Phone number
        if (!customer_phone_number) {
            newErrors.customer_phone_number = "Phone Number is required";
        }
        else if (!/^(\+33|0)[1-9]\d{8}$/.test(customer_phone_number)) {
            newErrors.customer_phone_number = "Phone number not valid. Format : 0XXXXXXXXX";
        }
        // Email
        if (!customer_mail) {
            newErrors.customer_mail = "Email is required";
        }
        else if (!/\S+@\S+\.\S+/.test(customer_mail)) {
            newErrors.customer_mail = "Email not valid.";
        }
        // Postal code
        if (!postal_code) {
            newErrors.postal_code = "Postal Code is required";
        }
        else if (!/^\d{5}$/.test(postal_code)) {
            newErrors.postal_code = "Postal code not valid.";
        }
        // City
        if (!city) {
            newErrors.city = "City is required";
        }
        // Address
        if (!address) {
            newErrors.address = "Address is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateFields()) {
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
            }
        axios.post(CREATE_CUSTOMER, customer)
            .then(() => {
                console.log("Submitted Data:", customer);
            })
            .catch((error) => {
                console.error("Error while submitting data:", error);
            });
        }
        else {
            console.error("Invalid data");
        }
    };

    const handleInputChange = (e, field) => {
        let value = e.target.value;
        switch (field) {
            case "customer_lastname":
                setCustomerLastName(value);
                break;
            case "customer_firstname":
                setCustomerFirstName(value);
                break;
            case "customer_phone_number":
                value = value.replace(/\s/g, '');
                setPhoneNumber(value);
                break;
            case "customer_mail":
                setEmail(value);
                break;
            case "city":
                setCity(value);
                break;
            case "address":
                setAddress(value);
                break;
            case "postal_code":
                setPostalCode(value);
                break;
            case "gender":
                setGender(value);
                break;
            case "customer_birthdate":
                setCustomerBirthDate(value);
                break;
            default:
                break;
        }

        validateFields();
    };

    const isFormValid = Object.keys(errors).length === 0;

    return (
        <Container maxWidth="md" style={{ marginTop: "40px" }}>
            <Grid container justifyContent="center" alignItems="center" style={{ marginBottom: "20px" }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Customer Form
                </Typography>
            </Grid>
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Last Name"
                            variant="outlined"
                            value={customer_lastname}
                            onChange={(e) => handleInputChange(e, "customer_lastname")}
                            error={Boolean(errors.customer_lastname)}
                            helperText={errors.customer_lastname}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="First Name"
                            variant="outlined"
                            value={customer_firstname}
                            onChange={(e) => handleInputChange(e, "customer_firstname")}
                            error={Boolean(errors.customer_firstname)}
                            helperText={errors.customer_firstname}
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Birth Date"
                                value={customer_birthdate}
                                onChange={(newValue) => handleInputChange({target : {value : newValue}}, "customer_birthdate")}
                                error={Boolean(errors.customer_birthdate)}
                                helperText={errors.customer_birthdate}
                                format="dd-MM-yyyy"
                                inputFormat="dd-MM-yyyy"
                                shouldDisableDate={(date) => date >= new Date()}
                            />
                        </LocalizationProvider>
                        <FormControl fullWidth variant="outlined" margin="normal">
                            <InputLabel>Gender</InputLabel>
                            <Select
                                value={gender}
                                onChange={(e) => handleInputChange(e, "gender")}
                                label="Gender"
                                error={Boolean(errors.gender)}
                            >
                                {genderOptions.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Phone Number"
                            variant="outlined"
                            value={customer_phone_number}
                            onChange={(e) => handleInputChange(e, "customer_phone_number")}
                            error={!!errors.customer_phone_number}
                            helperText={errors.customer_phone_number}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            variant="outlined"
                            value={customer_mail}
                            onChange={(e) => handleInputChange(e, "customer_mail")}
                            error={Boolean(errors.customer_mail)}
                            helperText={errors.customer_mail}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="City"
                            variant="outlined"
                            value={city}
                            onChange={(e) => handleInputChange(e, "city")}
                            error={Boolean(errors.city)}
                            helperText={errors.city}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Address"
                            variant="outlined"
                            value={address}
                            onChange={(e) => handleInputChange(e, "address")}
                            error={Boolean(errors.address)}
                            helperText={errors.address}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Postal Code"
                            variant="outlined"
                            value={postal_code}
                            onChange={(e) => handleInputChange(e, "postal_code")}
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
                        disabled={!isFormValid}
                    >
                        Submit
                    </Button>
                </Grid>
            </form>
        </Container>
    );
}
