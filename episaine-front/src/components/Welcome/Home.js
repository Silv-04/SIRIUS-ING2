// src/components/Welcome/Home.js
import React from "react";
import {
    Flex,
    VStack,
    Heading,
    Button,
    Box,
    Image,
    Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom"; // Importer RouterLink

export default function Home() {
    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            minH="100vh"
            bg="#2C3E50" // Bleu marine de fond
            p={4}
            color="white"
        >
            {/* Logo */}
            <Image
                src="https://img.icons8.com/fluency/96/000000/vegetarian-food.png"
                alt="Logo Episaine"
                mb={8}
                boxSize="100px"
            />

            {/* Section Bienvenue */}
            <VStack spacing={6} textAlign="center" maxW="600px">
                <Heading
                    as="h1"
                    size="2xl"
                    bgGradient="linear(to-r, teal.300, green.400)"
                    bgClip="text"
                    fontWeight="extrabold"
                >
                    Bienvenue sur Episaine !
                </Heading>
                <Text fontSize="lg" color="gray.200">
                    Chez Episaine, nous croyons que manger sainement ne devrait pas
                    être compliqué. Notre application vous accompagne dans la planification
                    de repas équilibrés, adaptés à vos besoins et préférences alimentaires.
                    Que vous soyez un particulier cherchant à améliorer votre alimentation ou
                    un nutritionniste souhaitant offrir des conseils personnalisés à vos
                    clients, Episaine est là pour vous simplifier la vie.
                </Text>
            </VStack>

            {/* Section Qui êtes-vous ? */}
            <Box
                bg="whiteAlpha.200"
                p={8}
                rounded="md"
                shadow="lg"
                border="1px"
                borderColor="whiteAlpha.300"
                mt={12}
                width={{ base: "90%", md: "400px" }}
            >
                <Heading
                    as="h2"
                    fontSize="2xl"
                    textAlign="center"
                    color="white"
                    mb={6}
                >
                    Qui êtes-vous ?
                </Heading>

                <Flex
                    gap={6}
                    align="center"
                    justify="center"
                    direction={{ base: "column", md: "row" }}
                >
                    {/* Bouton Client */}
                    <Button
                        as={RouterLink}
                        to="/customers" // Assurez-vous que cette route est définie dans App.js
                        colorScheme="teal"
                        variant="solid"
                        size="lg"
                        leftIcon={
                            <Image
                                src="https://img.icons8.com/ios-filled/50/ffffff/user.png"
                                boxSize="20px"
                                alt="Client"
                            />
                        }
                        _hover={{ bg: "teal.600" }}
                        width={{ base: "100%", md: "150px" }}
                    >
                        Client
                    </Button>

                    {/* Bouton Nutritionniste */}
                    <Button
                        as={RouterLink}
                        to="/nutritionniste" // Rediriger vers la page HomeNutritionniste
                        colorScheme="green"
                        variant="solid"
                        size="lg"
                        leftIcon={
                            <Image
                                src="https://img.icons8.com/ios-filled/50/ffffff/health-checkup.png"
                                boxSize="20px"
                                alt="Nutritionniste"
                            />
                        }
                        _hover={{ bg: "green.600" }}
                        width={{ base: "100%", md: "150px" }}
                    >
                        Nutritionniste
                    </Button>
                </Flex>
            </Box>
        </Flex>
    );
}
