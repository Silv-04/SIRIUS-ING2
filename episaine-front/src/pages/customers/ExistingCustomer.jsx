import React, { useState } from "react";
import LeftMenu from "../../components/customers/LeftMenu";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Box, Button, Divider, Grid, GridItem, Input, Text } from "@chakra-ui/react";
import { getCustomerInformationByCustomerId } from "../../api/customerAPI";

// path="/client/
// page to redirect whether we want to create a customer or fetch informations from an existing customer
function ExistingCustomerOrNot() {
    const [customerNumber, setCustomerNumber] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const cancelRef = React.useRef();

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
    const handleValidate = async (e) => {
        e.preventDefault();
        if (customerNumber) {
            try {
                const customer = await getCustomerInformationByCustomerId(customerNumber);
                if (customer.data) {
                    console.log("Informations fetched", customer.data);
                    localStorage.setItem("customer data", JSON.stringify(customer.data));
                    navigate("/client/menu/");
                }
                else {
                    setIsOpen(true);
                }
            }
            catch (error) {
                setIsOpen(true);
                console.error("Error fetching customer information", error);

            }
        }
    }

    return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Grid templateRows={"repeat(2, 1fr)"} gap={6}>
                <Text fontSize={"30"} fontWeight={"bold"} textAlign={"center"}>Choix de connexion</Text>
                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                    <GridItem paddingTop={8}>
                        <Button
                            _hover={{ bg: "#4d648d" }}
                            color="white"
                            bg="#2C3A4F"
                            as={RouterLink} to="/client/creation_profil/">Création d'un profil client</Button>
                    </GridItem>
                    <GridItem paddingLeft={20}>
                        <Divider orientation="vertical" />
                    </GridItem>
                    <GridItem>
                        <form onSubmit={handleValidate}>
                            <Text fontWeight={"bold"} textAlign={"center"}>Client existant</Text>
                            <Input
                                id="customer-number"
                                placeholder="Numéro client"
                                value={customerNumber}
                                onChange={handleChange}
                                fullWidth
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            />
                            <Grid align={"center"} templateColumns={"repeat(2, 1fr"}>
                                <GridItem gridColumn={1}><Button bgColor={"#bbf7d0"} type={"submit"} id="validateCustomerId">Valider</Button></GridItem>
                                <AlertDialog
                                    isOpen={isOpen}
                                    onClose={() => setIsOpen(false)}
                                    leastDestructiveRef={cancelRef}
                                >
                                    <AlertDialogOverlay>
                                        <AlertDialogContent>
                                            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                                Erreur
                                            </AlertDialogHeader>
                                            <AlertDialogBody textAlign={"center"}>
                                                Numéro de client invalide, veuillez réessayer.
                                            </AlertDialogBody>
                                            <AlertDialogFooter>
                                                <Button colorScheme="red" ref={cancelRef} onClick={() => setIsOpen(false)}>
                                                    Annuler
                                                </Button>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialogOverlay>
                                </AlertDialog>
                                <GridItem gridColumn={2}><Button bgColor={"#fca5a5"} onClick={handleReset}>Annuler</Button></GridItem>
                            </Grid>
                        </form>
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
