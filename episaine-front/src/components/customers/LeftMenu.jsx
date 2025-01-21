import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
    Box,
    Flex,
    Heading,
    Button,
    VStack,
    Icon,
    Spacer,
} from "@chakra-ui/react";
import {
    FaWallet,
    FaUsers,
    FaCalendarAlt,
    FaBook,
    FaCog,
} from "react-icons/fa";

export default function HomeNutritionniste() {
    return (
        <Flex height="100vh" color="white">
            <Box
                w="250px"
                bg="#0F1C2E"
                p={6}
                display="flex"
                flexDirection="column"
                borderRight="1px solid #4d648d"
            >
                <Box textAlign="center" mb={8}>
                    <Heading size="md" color="#acc2ef">
                        EPISAINE
                    </Heading>
                </Box>
                <VStack align="start" spacing={4}>
                    <Button
                        as={RouterLink}
                        to="/client/"
                        variant="ghost"
                        justifyContent="flex-start"
                        leftIcon={<Icon as={FaWallet} />}
                        _hover={{ bg: "#4d648d" }}
                        color="white"
                        bg="#2C3A4F"
                        borderRadius="8px"
                        w="100%"
                    >
                        Page d'accueil
                    </Button>
                    <Button
                        as={RouterLink}
                        to="/client/recettes/"
                        variant="ghost"
                        justifyContent="flex-start"
                        leftIcon={<Icon as={FaUsers} />}
                        _hover={{ bg: "#4d648d" }}
                        color="white"
                        bg="#2C3A4F"
                        borderRadius="8px"
                        w="100%"
                    >
                        Obtenir mes recettes
                    </Button>
                    <Button
                        as={RouterLink}
                        to="/client/"
                        variant="ghost"
                        justifyContent="flex-start"
                        leftIcon={<Icon as={FaCalendarAlt} />}
                        _hover={{ bg: "#4d648d" }}
                        color="white"
                        bg="#2C3A4F"
                        borderRadius="8px"
                        w="100%"
                    >
                        TBA
                    </Button>
                    <Button
                        as={RouterLink}
                        to="/client/"
                        variant="ghost"
                        justifyContent="flex-start"
                        leftIcon={<Icon as={FaBook} />}
                        _hover={{ bg: "#4d648d" }}
                        color="white"
                        bg="#2C3A4F"
                        borderRadius="8px"
                        w="100%"
                    >
                        TBA
                    </Button>
                </VStack>

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
        </Flex>
    );
}
