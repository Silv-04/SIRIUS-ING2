import React from "react";
import { Box, VStack, Button, Icon, Spacer, Heading } from "@chakra-ui/react";
import {
    FaWallet,
    FaUsers,
    FaCalendarAlt,
    FaBook,
    FaCog,
    FaChartLine,
} from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";

export default function Navbar() {
    return (
        <Box
            w="250px"
            bg="#0F1C2E"
            p={6}
            display="flex"
            flexDirection="column"
            borderRight="1px solid #4d648d"
            height="100vh"
            position="fixed"
            zIndex="1000"
        >
            <Box textAlign="center" mb={8}>
                <Heading size="md" color="#acc2ef">
                    EPISAINE
                </Heading>
            </Box>

            {/* Navabar */}
            <VStack align="start" spacing={4}>
                <Button
                    as={RouterLink}
                    to="/dashboard/"
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
                    to="/components/nutritionniste/customer/"
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
                    to="/components/nutritionniste/rdv/"
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
                    id="btn-recipe-lib"
                    as={RouterLink}
                    to="/components/nutritionniste/recipe/"
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
                    to="/IndicateurPerformance/"
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

            <Spacer />

            <Button
                as={RouterLink}
                to="/components/nutritionniste/Parametre/"
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
    );
}
