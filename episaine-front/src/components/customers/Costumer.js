import React, { useEffect, useState } from "react";
import React, { useEffect, useState } from "react";
import {Box, Flex, Heading, Spinner, Table, Thead, Tbody, Tr, Th, Td, Input, InputGroup, InputLeftElement, Icon, Button} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Navbar from "../../Pages/navbar";
import { CUSTOMER_INFORMATION } from "../../constants/back";

// Main component to display the list of customers
export default function Customer() {
    // State variables :
    // List of customers
    const [customers, setCustomers] = useState([]);
    // Search term for filtering
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    // Pagination control
    const [currentPage, setCurrentPage] = useState(1);
    // Number of customers per page
    const customersPerPage = 20;

    // Function to calculate Body Mass Index (BMI)
    // https://www.topsante.com/outils/imc
    const calculateIMC = (weight, height) => {
        if (height > 0) {
            const heightInMeters = height / 100;
            return (weight / (heightInMeters * heightInMeters)).toFixed(1);
        }
        return null;
    };

    // Function to classify the BMI value into categories
    // https://www.topsante.com/outils/imc
    const classifyIMC = (imc) => {
        if (imc < 18.5) {
            return { label: "Maigreur", color: "yellow.300" };
        } else if (imc >= 18.5 && imc <= 25.99) {
            return { label: "Normal", color: "green.300" };
        } else if (imc >= 26) {
            return { label: "Surpoids", color: "red.300" };
        } else {
            return { label: "N/A", color: "gray.300" };
        }
    };

    // Fetch customer data from the API when the component mounts
    // Reference: https://react.dev/reference/react/useEffect
    useEffect(() => {
        setLoading(true); // Enable loading spinner
        // Fetch data from API
        fetch(CUSTOMER_INFORMATION)
            .then((response) => {
                if (response.ok) {
                    // Parse response as JSON
                    return response.json();
                }
                throw new Error("Problème dans le chargement des données");
            })
            .then((data) => {
                setCustomers(data); // Update state with fetched data
            })
            .catch((err) => {
                console.error("Erreur ", err);
                // Handle errors
                setError("Problème dans le chargement de données");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);
    // Filter customers based on the search term
    const filteredCustomers = customers.filter((client) => {
        const lastName = client.customer?.customerLastname?.toLowerCase() || "";
        const firstName = client.customer?.customerFirstname?.toLowerCase() || "";
        return lastName.includes(searchTerm.toLowerCase()) || firstName.includes(searchTerm.toLowerCase());
    });
    // Pagination: Calculate indices for current page of customers
    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);
    const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);

    return (
        <Box bg="#1f2b3e" minHeight="100vh">
            <Box position="fixed" w="250px" h="100vh" bg="#0F1C2E" zIndex="1000">
                <Navbar />
            </Box>

            <Box ml="250px" p={6} bg="white" minHeight="100vh">
                <Heading mb={6} size="lg" color="teal.800" textAlign="center">
                    Liste des Clients
                </Heading>

                <Flex justifyContent="center" mb={4}>
                    <InputGroup width="50%">
                        <InputLeftElement pointerEvents="none">
                            <Icon as={SearchIcon} color="gray.500" />
                        </InputLeftElement>
                        <Input
                            placeholder="Rechercher par Nom ou Prénom..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            bg="gray.100"
                        />
                    </InputGroup>
                </Flex>

                {loading ? (
                    <Spinner size="xl" color="black" />
                ) : error ? (
                    <Heading color="red.400" size="md">{error}</Heading>
                ) : (
                    <>
                        <Table variant="simple">
                            <Thead bg="gray.100">
                                <Tr>
                                    <Th textAlign="center">Nom</Th>
                                    <Th textAlign="center">Prénom</Th>
                                    <Th textAlign="center">Âge</Th>
                                    <Th textAlign="center">Poids</Th>
                                    <Th textAlign="center">Taille</Th>
                                    <Th textAlign="center">Objectif Santé</Th>
                                    <Th textAlign="center">IMC</Th>
                                    <Th textAlign="center">État Actuel</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {currentCustomers.map((client) => {
                                    const imc = calculateIMC(client.weight, client.height);
                                    const { label, color } = classifyIMC(imc);
                                    return (
                                        <Tr key={client.informationId}>
                                            <Td textAlign="center">{client.customer?.customerLastname}</Td>
                                            <Td textAlign="center">{client.customer?.customerFirstname}</Td>
                                            <Td textAlign="center">{client.age}</Td>
                                            <Td textAlign="center">{client.weight}</Td>
                                            <Td textAlign="center">{client.height}</Td>
                                            <Td textAlign="center">{client.healthGoal}</Td>
                                            <Td textAlign="center">{imc}</Td>
                                            <Td textAlign="center">
                                                <Box bg={color} p={1} rounded="md" borderRadius="8px">
                                                    {label}
                                                </Box>
                                            </Td>
                                        </Tr>
                                    );
                                })}
                            </Tbody>
                        </Table>

                        <Flex justifyContent="center" mt={4}>
                            <Button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                isDisabled={currentPage === 1}
                                mx={2}
                            >
                                Précédent
                            </Button>
                            <Button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                isDisabled={currentPage === totalPages}
                                mx={2}
                            >
                                Suivant
                            </Button>
                        </Flex>
                    </>
                )}
            </Box>
        </Box>
    );
}