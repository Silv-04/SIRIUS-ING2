import React, { useEffect, useState } from "react";
import {Box, Flex, Heading, Spinner, Table, Thead, Tbody, Tr, Th, Td, Input, InputGroup, InputLeftElement, Icon, Button} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Navbar from "../../Pages/navbar";
import { CUSTOMER_INFORMATION } from "../../constants/back";

export default function Customer() {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [customersPerPage, setCustomersPerPage] = useState(10);
    const maxPageNumbers = 8; // Nombre max de numéros de page affichés

    // Function to calculate BMI
    const calculateIMC = (poids, taille) => {
        const tailleEnMetres = taille / 100;
        return tailleEnMetres > 0 ? (poids / (tailleEnMetres * tailleEnMetres)).toFixed(1) : null;
    };

    // Function to classify BMI with colors for current status
    const classifyIMC = (imc) => {
        if (imc < 18.5) return { label: "Maigreur", color: "yellow.300" };
        if (imc >= 18.5 && imc <= 25.99) return { label: "Normal", color: "green.300" };
        if (imc >= 26) return { label: "Surpoids", color: "red.300" };
        return { label: "N/A", color: "gray.300" };
    };

    // Adjust pagination to screen size
    useEffect(() => {
        const updateCustomersPerPage = () => {
            if (window.innerWidth > 1200) {
                setCustomersPerPage(15); // Grand écran
            } else if (window.innerWidth > 800) {
                setCustomersPerPage(10); // Taille moyenne
            } else {
                setCustomersPerPage(5); // Petit écran
            }
        };

        updateCustomersPerPage();
        window.addEventListener("resize", updateCustomersPerPage);

        return () => window.removeEventListener("resize", updateCustomersPerPage);
    }, []);

    // Retrieve customer data
    useEffect(() => {
        setLoading(true);
        fetch(CUSTOMER_INFORMATION)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Erreur HTTP ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                setCustomers(data);
                setError(null);
            })
            .catch((err) => {
                console.error("Erreur lors du chargement des données :", err.message);
                setError("Impossible de récupérer les données des clients.");
            })
            .finally(() => setLoading(false));
    }, []);

    // Filter customers based on search text (First and Last Name only)
    const filteredCustomers = customers.filter((client) => {
        const nom = client.customer?.customerLastname?.toLowerCase() || "";
        const prenom = client.customer?.customerFirstname?.toLowerCase() || "";
        return nom.includes(searchTerm.toLowerCase()) || prenom.includes(searchTerm.toLowerCase());
    });

    // Paging
    const totalPages = Math.ceil(filteredCustomers.length / customersPerPage);
    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = filteredCustomers.slice(indexOfFirstCustomer, indexOfLastCustomer);

    // Manage displayed page numbers
    const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
    const endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);
    const pageNumbers = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
        <Box bg="#1f2b3e" minHeight="100vh">
            {/* Navbar FIXE */}
            <Box position="fixed" w="250px" h="100vh" bg="#0F1C2E" zIndex="1000">
                <Navbar />
            </Box>

            {/* Main content */}
            <Box
                ml="250px"
                w="calc(100vw - 250px)"
                minHeight="100vh"
                overflowX="auto"
                overflowY="auto"
                p={6}
                bg="white"
            >
                {/* Title */}
                <Heading mb={6} size="lg" color="teal.800" textAlign="center" fontWeight="bold">
                    Liste des Clients
                </Heading>

                {/* Search Bar */}
                <Flex justifyContent="center" mb={4}>
                    <InputGroup width="50%">
                        <InputLeftElement pointerEvents="none">
                            <Icon as={SearchIcon} color="gray.500" />
                        </InputLeftElement>
                        <Input
                            type="text"
                            placeholder="Rechercher par Nom ou Prénom..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            bg="gray.100"
                            borderRadius="md"
                        />
                    </InputGroup>
                </Flex>

                {loading ? (
                    <Box textAlign="center" color="black">
                        <Spinner size="xl" />
                        <Heading mt={4} size="md">Chargement des données...</Heading>
                    </Box>
                ) : error ? (
                    <Heading color="red.400" size="md">{error}</Heading>
                ) : (
                    <>
                        {/* Table Customers */}
                        <Box bg="white" rounded="xl" shadow="lg" overflowX="auto" width="100%" border="1px solid #d6d6d6">
                            <Table variant="simple" width="100%">
                                <Thead bg="gray.100">
                                    <Tr>
                                        <Th fontWeight="bold" textAlign="center">Nom</Th>
                                        <Th fontWeight="bold" textAlign="center">Prénom</Th>
                                        <Th fontWeight="bold" textAlign="center">Âge</Th>
                                        <Th fontWeight="bold" textAlign="center">Poids (kg)</Th>
                                        <Th fontWeight="bold" textAlign="center">Taille (cm)</Th>
                                        <Th fontWeight="bold" textAlign="center">Objectif Santé</Th>
                                        <Th fontWeight="bold" textAlign="center">IMC</Th>
                                        <Th fontWeight="bold" textAlign="center">État Actuel</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {currentCustomers.length > 0 ? (
                                        currentCustomers.map((client) => {
                                            const imc = calculateIMC(client.weight, client.height);
                                            const { label, color } = classifyIMC(imc);

                                            return (
                                                <Tr key={client.informationId} _hover={{ bg: "gray.50" }}>
                                                    <Td textAlign="center">{client.customer?.customerLastname || "N/A"}</Td>
                                                    <Td textAlign="center">{client.customer?.customerFirstname || "N/A"}</Td>
                                                    <Td textAlign="center">{client.age || "N/A"}</Td>
                                                    <Td textAlign="center">{client.weight || "N/A"}</Td>
                                                    <Td textAlign="center">{client.height || "N/A"}</Td>
                                                    <Td textAlign="center">{client.healthGoal || "N/A"}</Td>
                                                    <Td textAlign="center">{imc || "N/A"}</Td>
                                                    <Td textAlign="center">
                                                        <Box px={3} py={1} fontSize="sm" fontWeight="bold" rounded="full" bg={color}>
                                                            {label}
                                                        </Box>
                                                    </Td>
                                                </Tr>
                                            );
                                        })
                                    ) : (
                                        <Tr><Td colSpan={8} textAlign="center">Aucun client trouvé</Td></Tr>
                                    )}
                                </Tbody>
                            </Table>
                        </Box>

                        {/* Paging */}
                        <Flex justifyContent="center" mt={4} wrap="wrap">
                            <Button onClick={() => setCurrentPage(currentPage - 1)} isDisabled={currentPage === 1} mx={2}>
                                Précédent
                            </Button>
                            {pageNumbers.map((num) => (
                                <Button key={num} onClick={() => setCurrentPage(num)} mx={1} colorScheme={num === currentPage ? "teal" : "gray"}>
                                    {num}
                                </Button>
                            ))}
                            <Button onClick={() => setCurrentPage(currentPage + 1)} isDisabled={currentPage === totalPages} mx={2}>
                                Suivant
                            </Button>
                        </Flex>
                    </>
                )}
            </Box>
        </Box>
    );
}
