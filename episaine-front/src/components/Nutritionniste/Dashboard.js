// src/components/Nutritionniste/Dashboard.js
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
    Box,
    Flex,
    Heading,
    VStack,
    Button,
    Icon,
    Spacer,
    Text,
} from "@chakra-ui/react";
import {
    FaWallet,
    FaUsers,
    FaCalendarAlt,
    FaBook,
    FaCog,
    FaChartLine,
} from "react-icons/fa";

export default function Dashboard() {
    return (
        <Flex height="100vh" bg="#1f2b3e" color="white">
            {/* Sidebar */}
            <Box
                w="250px"
                bg="#0F1C2E"
                p={6}
                display="flex"
                flexDirection="column"
                borderRight="1px solid #4d648d"
            >
                {/* Titre EPISAINE */}
                <Box textAlign="center" mb={8}>
                    <Heading size="md" color="#acc2ef">
                        EPISAINE
                    </Heading>
                </Box>

                {/* Navigation */}
                <VStack align="start" spacing={4}>
                    <Button
                        as={RouterLink}
                        to="/dashboard"
                        variant="ghost"
                        justifyContent="flex-start"
                        leftIcon={<Icon as={FaWallet} />}
                        _hover={{ bg: "#4d648d" }}
                        color="white"
                        bg="#2C3A4F"
                        borderRadius="8px"
                        w="100%"
                    >
                        Tableau de bord
                    </Button>
                    <Button
                        as={RouterLink}
                        to="/components/Nutritionniste/Costumer"
                        variant="ghost"
                        justifyContent="flex-start"
                        leftIcon={<Icon as={FaUsers} />}
                        _hover={{ bg: "#4d648d" }}
                        color="white"
                        bg="#2C3A4F"
                        borderRadius="8px"
                        w="100%"
                    >
                        Clients
                    </Button>
                    <Button
                        as={RouterLink}
                        to="/components/Nutritionniste/rdv"
                        variant="ghost"
                        justifyContent="flex-start"
                        leftIcon={<Icon as={FaCalendarAlt} />}
                        _hover={{ bg: "#4d648d" }}
                        color="white"
                        bg="#2C3A4F"
                        borderRadius="8px"
                        w="100%"
                    >
                        Rendez-vous
                    </Button>
                    <Button
                        as={RouterLink}
                        to="/components/Nutritionniste/recipe"
                        variant="ghost"
                        justifyContent="flex-start"
                        leftIcon={<Icon as={FaBook} />}
                        _hover={{ bg: "#4d648d" }}
                        color="white"
                        bg="#2C3A4F"
                        borderRadius="8px"
                        w="100%"
                    >
                        Bibliothèque recette
                    </Button>
                    <Button
                        as={RouterLink}
                        to="/IndicateurPerformance"
                        variant="ghost"
                        justifyContent="flex-start"
                        leftIcon={<Icon as={FaChartLine} />}
                        _hover={{ bg: "#4d648d" }}
                        color="white"
                        bg="#2C3A4F"
                        borderRadius="8px"
                        w="100%"
                    >
                        KPI
                    </Button>
                </VStack>

                {/* Spacer to push "Paramètres" to the bottom */}
                <Spacer />

                <Button
                    as={RouterLink}
                    to="/components/Nutritionniste/Parametre"
                    variant="ghost"
                    justifyContent="flex-start"
                    leftIcon={<Icon as={FaCog} />}
                    _hover={{ bg: "#4d648d" }}
                    color="white"
                    bg="#2C3A4F"
                    borderRadius="8px"
                    w="100%"
                    mt={4}
                >
                    Paramètres
                </Button>
            </Box>

            {/* Main Content */}
            <Box
                flex="1"
                p={6}
                bg="#1f2b3e"
                color="white"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="center"
            >
                <Box>
                    <Heading
                        as="h1"
                        size="2xl"
                        bgGradient="linear(to-r, teal.300, green.400)"
                        bgClip="text"
                        fontWeight="extrabold"
                        mb={6}
                    >
                        Tableau de Bord
                    </Heading>
                    <Text fontSize="lg" color="#cee8ff" textAlign="center">
                        Le nutritionniste joue un rôle crucial en aidant les patients à atteindre une alimentation équilibrée et à adopter un mode de vie sain. Il fournit des conseils personnalisés, analyse les besoins nutritionnels et suit les progrès pour garantir des résultats optimaux.
                    </Text>
                </Box>

                <Button
                    size="lg"
                    bg="#FF4D4D"
                    color="white"
                    _hover={{ bg: "#d43c3c" }}
                    borderRadius="12px"
                    px={12}
                    py={6}
                >
                    TBD (in the future)
                </Button>
            </Box>
        </Flex>
    );
}
