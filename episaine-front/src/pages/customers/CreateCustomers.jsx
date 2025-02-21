import React, { useState } from "react";
import axios from "axios";
import { CREATE_CUSTOMER } from "../../constants/back";
import genderOptions from '../../constants/genderOptions.json';
import LeftMenu from "../../components/customers/LeftMenu";
import { useNavigate } from "react-router-dom";
import { FaPhoneAlt, FaArrowRight } from "react-icons/fa";
import { Button, Container, Grid, GridItem, Input, InputGroup, InputLeftElement, Select, Text } from "@chakra-ui/react";

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
    // const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const newErrors = {};

        // if (!customer_lastname) {
        //     newErrors.customer_lastname = "Nom de famille requis.";
        // } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(customer_lastname)) {
        //     newErrors.customer_lastname = "Le nom doit contenir que des lettres.";
        // }

        // if (!customer_firstname) {
        //     newErrors.customer_firstname = "Prénom requis.";
        // } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(customer_firstname)) {
        //     newErrors.customer_firstname = "Le prénom doit contenir que des lettres.";
        // }

        // if (!customer_birthdate) {
        //     newErrors.customer_birthdate = "Date de naissance requise.";
        // }

        // if (!gender) {
        //     newErrors.gender = "Genre requis.";
        // }

        // if (!customer_phone_number) {
        //     newErrors.customer_phone_number = "Numéro de téléphone requis.";
        // } else if (!/^(\+33|0)[1-9]\d{8}$/.test(customer_phone_number)) {
        //     newErrors.customer_phone_number = "Numéro de téléphone non valide. Format : 0XXXXXXXXX";
        // }

        // if (!customer_mail) {
        //     newErrors.customer_mail = "Adresse mail requise.";
        // } else if (!/\S+@\S+\.\S+/.test(customer_mail)) {
        //     newErrors.customer_mail = "Adresse mail non valide. Format : exemple@exemple.com.";
        // }

        // if (!postal_code) {
        //     newErrors.postal_code = "Code postal requis.";
        // } else if (!/^\d{5}$/.test(postal_code)) {
        //     newErrors.postal_code = "Code postal non valide.";
        // }

        // if (!city) {
        //     newErrors.city = "Ville requise.";
        // }

        // if (!address) {
        //     newErrors.address = "Adresse requise.";
        // }

        // setErrors(newErrors);

        // if (Object.keys(newErrors).length > 0) {
        //     console.log("Formulaire invalide !");
        //     return;
        // }

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

    
    // Retiré parce que apparemment c'est suspect alors que ça marche a moitié ...

    // const handleBlur = useCallback((field) => {
    //     setErrors((prevErrors) => {
    //         const newErrors = { ...prevErrors };
    //         if (field === "customer_lastname") {
    //             if (!customer_lastname) {
    //                 newErrors.customer_lastname = "Nom de famille requis.";
    //             } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(customer_lastname)) {
    //                 newErrors.customer_lastname = "Le nom doit contenir que des lettres.";
    //             } else { delete newErrors.customer_lastname; }
    //         }
    //         if (field === "customer_firstname") {
    //             if (!customer_firstname) {
    //                 newErrors.customer_firstname = "Prénom requis.";
    //             } else if (!/^[A-Za-zÀ-ÖØ-öø-ÿ]+$/.test(customer_firstname)) {
    //                 newErrors.customer_firstname = "Le prénom doit contenir que des lettres.";
    //             } else { delete newErrors.customer_firstname; }
    //         }
    //         if (field === "customer_birthdate") {
    //             if (!customer_birthdate) {
    //                 newErrors.customer_birthdate = "Date de naissance requise";
    //             } else { delete newErrors.customer_birthdate }
    //         }
    //         if (field === "gender") {
    //             if (!gender) {
    //                 newErrors.gender = "Genre requis";
    //             } else { delete newErrors.gender }
    //         }
    //         if (field === "customer_phone_number") {
    //             if (!customer_phone_number) {
    //                 newErrors.customer_phone_number = "Numéro de téléphone requis";
    //             } else if (!/^(\+33|0)[1-9]\d{8}$/.test(customer_phone_number)) {
    //                 newErrors.customer_phone_number =
    //                     "Numéro de téléphone non valide. Format : 0XXXXXXXXX";
    //             } else { delete newErrors.customer_phone_number }
    //         }
    //         if (field === "customer_mail") {
    //             if (!customer_mail) {
    //                 newErrors.customer_mail = "Adresse mail requis";
    //             } else if (!/\S+@\S+\.\S+/.test(customer_mail)) {
    //                 newErrors.customer_mail = "Adresse mail non valide. Format : exemple@exemple.com.";
    //             } else { delete newErrors.customer_mail }
    //         }
    //         if (field === "postal_code") {
    //             if (!postal_code) {
    //                 newErrors.postal_code = "Code postal requis.";
    //             } else if (!/^\d{5}$/.test(postal_code)) {
    //                 newErrors.postal_code = "Code postal non valide.";
    //             } else { delete newErrors.postal_code }
    //         }
    //         if (field === "city") {
    //             if (!city) {
    //                 newErrors.city = "Ville requise.";
    //             } else { delete newErrors.city }
    //         }
    //         if (field === "address") {
    //             if (!address) {
    //                 newErrors.address = "Adresse requise.";
    //             } else { delete newErrors.address }
    //         }

    //         return newErrors;
    //     });
    // }, [
    //     customer_lastname,
    //     customer_firstname,
    //     customer_birthdate,
    //     gender,
    //     customer_phone_number,
    //     customer_mail,
    //     postal_code,
    //     city,
    //     address,
    // ]);


    return (
        <Grid templateRows={"repeat(2, 1fr)"} gap={6} paddingLeft={50} paddingRight={50}>
            <GridItem>
                <Text textAlign={"center"} fontWeight={"Bold"} fontSize={50} paddingTop={30}>
                    Formulaire client
                </Text>
            </GridItem>
            <GridItem>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
                    <Grid templateColumns={"repeat(2, 1fr)"} gap={6}>
                        <Grid templateRows={"repeat(5, 1fr)"} gap={2}>
                            <GridItem>
                                <Input
                                    placeholder="Nom de famille"
                                    fullWidth
                                    margin="normal"
                                    value={customer_lastname}
                                    onChange={(e) => setCustomerLastName(e.target.value)}
                                    type="text"
                                />
                            </GridItem>
                            <GridItem>
                                <Input
                                    fullWidth
                                    margin="normal"
                                    placeholder="Prénom"
                                    value={customer_firstname}
                                    onChange={(e) => setCustomerFirstName(e.target.value)}
                                    type="text"
                                />
                            </GridItem>
                            <GridItem>
                                <Input
                                    fullWidth
                                    margin="normal"
                                    placeholder="Date de naissance"
                                    value={customer_birthdate}
                                    onChange={(newValue) => setCustomerBirthDate(newValue)}
                                    type='date'
                                    format="dd-MM-yyyy"
                                />
                            </GridItem>
                            <GridItem>
                                <Select
                                    placeholder="Genre"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    {genderOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </Select>
                            </GridItem>
                            <GridItem>
                                <InputGroup>
                                    <InputLeftElement pointerEvents='none'>
                                        <FaPhoneAlt color='gray.300' />
                                    </InputLeftElement>
                                    <Input
                                        fullWidth
                                        margin="normal"
                                        placeholder="Numéro de téléphone"
                                        value={customer_phone_number}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        type="tel"
                                        pattern="(\+33|0)[1-9]{9}" required
                                    />
                                </InputGroup>
                            </GridItem>
                        </Grid>
                        <Grid templateRows={"repeat(5, 1fr)"} gap={2}>
                            <GridItem>
                                <Input
                                    fullWidth
                                    margin="normal"
                                    placeholder="Email"
                                    value={customer_mail}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                />
                            </GridItem>
                            <GridItem>
                                <Input
                                    fullWidth
                                    margin="normal"
                                    placeholder="Ville"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </GridItem>
                            <GridItem>
                                <Input
                                    fullWidth
                                    margin="normal"
                                    placeholder="Adresse"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </GridItem>
                            <GridItem>
                                <Input
                                    fullWidth
                                    margin="normal"
                                    placeholder="Code postal"
                                    value={postal_code}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                />
                            </GridItem>
                        </Grid>
                    </Grid>
                    <Container paddingLeft={200} paddingTop={10}>
                        <Button
                            type="submit"
                            bgColor={"#bbf7d0"}
                            variant='outline'
                            colorScheme="teal"
                            rightIcon={<FaArrowRight />}
                        >
                            Valider
                        </Button>
                    </Container>
                </form>
            </GridItem>
        </Grid >
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