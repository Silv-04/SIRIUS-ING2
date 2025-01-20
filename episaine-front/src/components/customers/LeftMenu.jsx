import { Box, Icon } from '@chakra-ui/react';
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
        <Flex height="100vh" color="white">
            <Box
                w="250px"
                bg="#0F1C2E"
                p={6}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                borderRight="1px solid #4d648d"
            >
                <VStack align="start" spacing={8}>
                    <Button as={RouterLink} to="/" variant="link">
                        <Image
                            src="https://img.icons8.com/fluency/96/000000/vegetarian-food.png"
                            alt="Logo Episaine"
                            boxSize="40px"
                        />
                        <Heading size="md">Episaine</Heading>
                    </Button>
                    <VStack align="start" spacing={4}>
                        <Button
                            variant="ghost"
                            justifyContent="flex-start"
                            leftIcon={<Icon as={FaWallet} />}
                            _hover={{ bg: "#4d648d" }}
                            color="white"
                            bg="#2C3A4F"
                            borderRadius="8px"
                            w="100%"
                            as={RouterLink} to="/client/"
                        >
                            Page d'accueil
                        </Button>
                        <Button
                            variant="ghost"
                            justifyContent="flex-start"
                            leftIcon={<Icon as={FaUsers} />}
                            _hover={{ bg: "#4d648d" }}
                            color="white"
                            bg="#2C3A4F"
                            borderRadius="8px"
                            w="100%"
                            as={RouterLink} to="/client/recettes/"
                        >
                            Recherche de recettes
                        </Button>
                        <Button
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
                        <Button
                            variant="ghost"
                            justifyContent="flex-start"
                            leftIcon={<Icon as={FaCog} />}
                            _hover={{ bg: "#4d648d" }}
                            color="white"
                            bg="#2C3A4F"
                            borderRadius="8px"
                            w="100%"
                        >
                            TBA
                        </Button>
                    </VStack>
                </VStack>
            </Box>
        </Flex>
    )
}