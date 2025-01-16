// src/components/Nutritionniste/IndicateurPerformance.js
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
    Box,
    Flex,
    Heading,
    Button,
    VStack,
    HStack,
    Image,
    Text,
    Select,
    SimpleGrid,
    IconButton,
    useDisclosure,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

// Données simulées (à remplacer par des données réelles)
const dataClients = [
    { sexe: "Homme", nombre: 120 },
    { sexe: "Femme", nombre: 150 },
];

const dataAge = [
    { tranche: "18-25", nombre: 50 },
    { tranche: "26-35", nombre: 80 },
    { tranche: "36-45", nombre: 60 },
    { tranche: "46-55", nombre: 30 },
    { tranche: "56+", nombre: 10 },
];

const dataRecettes = [
    { mois: "Oct", nombre: 40 },
    { mois: "Nov", nombre: 60 },
    { mois: "Dec", nombre: 80 },
    { mois: "Jan", nombre: 70 },
    { mois: "Feb", nombre: 90 },
    { mois: "Mar", nombre: 100 },
];

const dataClientsApp = [
    { mois: "Oct", nombre: 20 },
    { mois: "Nov", nombre: 25 },
    { mois: "Dec", nombre: 30 },
    { mois: "Jan", nombre: 35 },
    { mois: "Feb", nombre: 40 },
    { mois: "Mar", nombre: 45 },
];

export default function IndicateurPerformance() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedMonth, setSelectedMonth] = useState("Mar");
    const [selectedYear, setSelectedYear] = useState("2025");

    // Fonction pour gérer les filtres (à implémenter selon vos besoins)
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        if (name === "month") {
            setSelectedMonth(value);
        } else if (name === "year") {
            setSelectedYear(value);
        }
        // Implémentez la logique pour filtrer les données en fonction des sélections
    };

    return (
        <Box>
            {/* Menu à gauche - sidebar */}
            <Flex direction="row">
                {/* Sidebar pour les écrans moyens et grands */}
                <Box
                    w={{ base: "100%", md: "250px" }}
                    h="100vh"
                    bg="#2C3E50"
                    color="white"
                    p={4}
                    display={{ base: "none", md: "block" }}
                >
                    <VStack align="start" spacing={4}>
                        <Button as={RouterLink} to="/dashboard" variant="link" color="white" w="full">
                            Tableau de bord
                        </Button>
                        <Button as={RouterLink} to="/clients" variant="link" color="white" w="full">
                            Clients
                        </Button>
                        <Button as={RouterLink} to="/rendezvous" variant="link" color="white" w="full">
                            Rendez-vous
                        </Button>
                        <Button as={RouterLink} to="/bibliotheque-recette" variant="link" color="white" w="full">
                            La bibliothèque recette
                        </Button>
                        <Button as={RouterLink} to="/indicateur-performance" variant="link" color="white" w="full">
                            Indicateur de performance
                        </Button>
                        <Button as={RouterLink} to="/parametres" variant="link" color="white" w="full">
                            Paramètre
                        </Button>
                    </VStack>
                </Box>

                {/* Menu mobile - Drawer */}
                <Box display={{ base: "block", md: "none" }} p={4}>
                    <IconButton
                        aria-label="Open Menu"
                        icon={<FiMenu />}
                        onClick={onOpen}
                        color="white"
                        bg="#2C3E50"
                        _hover={{ bg: "#1B2A32" }}
                    />
                    <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader bg="#2C3E50" color="white">
                                Menu
                            </DrawerHeader>
                            <DrawerBody bg="#2C3E50">
                                <VStack align="start" spacing={4} mt={4}>
                                    <Button as={RouterLink} to="/dashboard" variant="link" color="white" w="full" onClick={onClose}>
                                        Tableau de bord
                                    </Button>
                                    <Button as={RouterLink} to="/clients" variant="link" color="white" w="full" onClick={onClose}>
                                        Clients
                                    </Button>
                                    <Button as={RouterLink} to="/rendezvous" variant="link" color="white" w="full" onClick={onClose}>
                                        Rendez-vous
                                    </Button>
                                    <Button as={RouterLink} to="/bibliotheque-recette" variant="link" color="white" w="full" onClick={onClose}>
                                        La bibliothèque recette
                                    </Button>
                                    <Button as={RouterLink} to="/indicateur-performance" variant="link" color="white" w="full" onClick={onClose}>
                                        Indicateur de performance
                                    </Button>
                                    <Button as={RouterLink} to="/parametres" variant="link" color="white" w="full" onClick={onClose}>
                                        Paramètre
                                    </Button>
                                </VStack>
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                </Box>

                {/* Contenu Principal */}
                <Box
                    w="full"
                    p={4}
                    bg="#2C3E50"
                    color="white"
                    display="flex"
                    direction="column"
                    align="center"
                >
                    {/* Contenu principal ici */}
                    <Image
                        src="https://img.icons8.com/fluency/96/000000/vegetarian-food.png"
                        alt="Logo Episaine"
                        mb={8}
                        boxSize="100px"
                    />
                    <Heading
                        as="h1"
                        size="2xl"
                        bgGradient="linear(to-r, teal.300, green.400)"
                        bgClip="text"
                        fontWeight="extrabold"
                        mb={6}
                    >
                        Bienvenue, Nutritionniste !
                    </Heading>

                    {/* Indicateurs de Performance */}
                    <Box w="full" p={4} bg="gray.100" minH="100vh" mt={8} borderRadius="md" boxShadow="lg">
                        <VStack align="start" spacing={6}>
                            <Heading as="h2" size="xl" color="#2C3E50">
                                Indicateurs de Performance
                            </Heading>

                            {/* Indicateurs de base */}
                            <HStack spacing={8} w="full">
                                <Box
                                    p={4}
                                    bg="white"
                                    shadow="md"
                                    borderRadius="md"
                                    w="200px"
                                    textAlign="center"
                                >
                                    <Text fontSize="lg" color="gray.500">
                                        Nombre de Clients (Homme)
                                    </Text>
                                    <Text fontSize="2xl" fontWeight="bold">
                                        {dataClients[0].nombre}
                                    </Text>
                                </Box>
                                <Box
                                    p={4}
                                    bg="white"
                                    shadow="md"
                                    borderRadius="md"
                                    w="200px"
                                    textAlign="center"
                                >
                                    <Text fontSize="lg" color="gray.500">
                                        Nombre de Clients (Femme)
                                    </Text>
                                    <Text fontSize="2xl" fontWeight="bold">
                                        {dataClients[1].nombre}
                                    </Text>
                                </Box>
                            </HStack>

                            {/* Graphiques */}
                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full">
                                {/* Histogramme par tranche d'âge */}
                                <Box bg="white" p={4} shadow="md" borderRadius="md">
                                    <Heading as="h3" size="md" mb={4} color="#2C3E50">
                                        Répartition des Clients par Tranche d'Âge
                                    </Heading>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={dataAge}>
                                            <XAxis dataKey="tranche" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="nombre" fill="#3182CE" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </Box>

                                {/* Histogramme pour le nombre de recettes par mois */}
                                <Box bg="white" p={4} shadow="md" borderRadius="md">
                                    <Heading as="h3" size="md" mb={4} color="#2C3E50">
                                        Nombre de Recettes par Mois
                                    </Heading>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={dataRecettes}>
                                            <XAxis dataKey="mois" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="nombre" fill="#38A169" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </Box>

                                {/* Histogramme pour le nombre de clients intégrés par mois */}
                                <Box bg="white" p={4} shadow="md" borderRadius="md" colSpan={2}>
                                    <Heading as="h3" size="md" mb={4} color="#2C3E50">
                                        Nombre de Clients Intégrés par Mois
                                    </Heading>

                                    {/* Filtres */}
                                    <HStack spacing={4} mb={4}>
                                        <Select
                                            placeholder="Sélectionner un mois"
                                            name="month"
                                            value={selectedMonth}
                                            onChange={handleFilterChange}
                                            maxW="200px"
                                        >
                                            <option value="Oct">Octobre</option>
                                            <option value="Nov">Novembre</option>
                                            <option value="Dec">Décembre</option>
                                            <option value="Jan">Janvier</option>
                                            <option value="Feb">Février</option>
                                            <option value="Mar">Mars</option>
                                        </Select>
                                        <Select
                                            placeholder="Sélectionner une année"
                                            name="year"
                                            value={selectedYear}
                                            onChange={handleFilterChange}
                                            maxW="200px"
                                        >
                                            <option value="2024">2024</option>
                                            <option value="2025">2025</option>
                                        </Select>
                                    </HStack>

                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={dataClientsApp}>
                                            <XAxis dataKey="mois" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="nombre" fill="#D69E2E" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </Box>
                            </SimpleGrid>
                        </VStack>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
}
