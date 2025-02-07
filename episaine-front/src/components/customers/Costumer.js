import React, { useEffect, useState } from "react";
import {
    Box,
    Flex,
    Heading,
    Spinner,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Input,
    InputGroup,
    InputLeftElement,
    Icon
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Navbar from "../../Pages/navbar";
import { CUSTOMER_INFORMATION } from "../../constants/back";

export default function Customer() {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fonction pour calculer l'IMC
    //Source :https://www.topsante.com/outils/imc
    const calculateIMC = (poids, taille) => {
        const tailleEnMetres = taille / 100;
        return tailleEnMetres > 0 ? (poids / (tailleEnMetres * tailleEnMetres)).toFixed(1) : null;
    };

    // Fonction pour classer l'IMC avec des couleurs pour l'état actuel
    const classifyIMC = (imc) => {
        if (imc < 18.5) return { label: "Maigreur", color: "yellow.300" };
        if (imc >= 18.5 && imc <= 25.99) return { label: "Normal", color: "green.300" };
        if (imc >= 26) return { label: "Surpoids", color: "red.300" };
        return { label: "N/A", color: "gray.300" };
    };

    // Récupérer les données des clients
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

    // Filtrer les clients en fonction du texte recherché (Nom et Prénom uniquement)
    const filteredCustomers = customers.filter((client) => {
        const nom = client.customer?.customerLastname?.toLowerCase() || "";
        const prenom = client.customer?.customerFirstname?.toLowerCase() || "";
        return nom.includes(searchTerm.toLowerCase()) || prenom.includes(searchTerm.toLowerCase());
    });

    return (
        <Box bg="#1f2b3e" minHeight="100vh">
            {/* Navbar FIXE */}
            <Box position="fixed" w="250px" h="100vh" bg="#0F1C2E" zIndex="1000">
                <Navbar />
            </Box>

            {/* Contenu principal */}
            <Box
                ml="250px"
                w="calc(100vw - 250px)"
                minHeight="100vh"
                overflowX="auto"
                overflowY="auto"
                p={6}
                bg="white"
            >
                {/* Titre Centré */}
                <Heading mb={6} size="lg" color="teal.800" textAlign="center" fontWeight="bold">
                    Liste des Clients
                </Heading>

                {/* Barre de Recherche */}
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
                                {filteredCustomers.length > 0 ? (
                                    filteredCustomers.map((client) => {
                                        const imc = calculateIMC(client.weight, client.height);
                                        const { label, color } = classifyIMC(imc);

                                        return (
                                            <Tr key={client.informationId} _hover={{ bg: "gray.50" }}>
                                                <Td textAlign="center">{client.customer?.customerLastname || "N/A"}</Td>
                                                <Td textAlign="center">{client.customer?.customerFirstname || "N/A"}</Td>
                                                <Td textAlign="center">{client.age || "N/A"}</Td>
                                                <Td textAlign="center">{client.weight || "N/A"}</Td>
                                                <Td textAlign="center">{client.height || "N/A"}</Td>
                                                <Td textAlign="center">
                                                    <Box px={3} py={1} display="inline-flex" fontSize="sm" fontWeight="semibold" rounded="full" bg="teal.100" color="teal.800">
                                                        {client.healthGoal || "N/A"}
                                                    </Box>
                                                </Td>
                                                <Td textAlign="center">{imc || "N/A"}</Td>
                                                <Td textAlign="center">
                                                    <Box px={3} py={1} display="inline-flex" fontSize="sm" fontWeight="bold" rounded="full" bg={color}>
                                                        {label}
                                                    </Box>
                                                </Td>
                                            </Tr>
                                        );
                                    })
                                ) : (
                                    <Tr>
                                        <Td colSpan={8} textAlign="center">Aucun client trouvé</Td>
                                    </Tr>
                                )}
                            </Tbody>
                        </Table>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
