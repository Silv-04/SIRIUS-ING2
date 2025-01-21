import { Box, Icon, Spacer } from '@chakra-ui/react';
import React from 'react';
import { Flex, VStack, Button, Image, Heading } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import {
    FaWallet,
    FaUsers,
    FaCalendarAlt,
    FaBook,
    FaCog,
} from "react-icons/fa";

export default function LeftMenu() {

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
                    Page d'accueil client
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
                    Obtenir des recettes
                </Button>
                <Button
                    as={RouterLink}
                    to="/"
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
                    to="/"
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
                    to="/"
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
            </VStack>

            <Spacer/>

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
    )
}