// src/components/Nutritionniste/HomeNutritionniste.js
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
    Box,
    Flex,
    Heading,
    Button,
    Image,
    VStack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";

export default function HomeNutritionniste() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box>
            {/* Menu à gauche - Sidebar */}
            <Flex direction="row">
                {/* Sidebar */}
                <Box
                    w={{ base: "100%", md: "250px" }}
                    h="100vh"
                    bg="#2C3E50" // Couleur bleu marine
                    color="white"
                    p={4}
                    display={{ base: "none", md: "block" }} // Masquer sur mobile
                    borderRight="1px solid transparent" // Bordure droite transparente
                >
                    {/* Nom EPISAINE */}
                    <Box mb={6} textAlign="center">
                        <Text
                            fontSize="xl"
                            fontWeight="bold"
                            letterSpacing="wide"
                            color="white"
                        >
                            EPISAINE
                        </Text>
                    </Box>
                    <VStack align="start" spacing={4}>
                        <Button
                            as={RouterLink}
                            to="/dashboard"
                            variant="ghost"
                            color="white"
                            w="full"
                            bg="transparent" // Bouton transparent
                            border="1px solid transparent" // Bordure transparente
                            borderRadius="md"
                            _hover={{ bg: "rgba(255, 255, 255, 0.1)" }} // Effet de survol léger
                        >
                            Tableau de bord
                        </Button>
                        <Button
                            as={RouterLink}
                            to="/clients"
                            variant="ghost"
                            color="white"
                            w="full"
                            bg="transparent"
                            border="1px solid transparent"
                            borderRadius="md"
                            _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
                        >
                            Clients
                        </Button>
                        <Button
                            as={RouterLink}
                            to="/rendezvous"
                            variant="ghost"
                            color="white"
                            w="full"
                            bg="transparent"
                            border="1px solid transparent"
                            borderRadius="md"
                            _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
                        >
                            Rendez-vous
                        </Button>
                        <Button
                            as={RouterLink}
                            to="/bibliotheque-recette"
                            variant="ghost"
                            color="white"
                            w="full"
                            bg="transparent"
                            border="1px solid transparent"
                            borderRadius="md"
                            _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
                        >
                            La bibliothèque recette
                        </Button>
                        <Button
                            as={RouterLink}
                            to="/indicateur-performance"
                            variant="ghost"
                            color="white"
                            w="full"
                            bg="transparent"
                            border="1px solid transparent"
                            borderRadius="md"
                            _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
                        >
                            Indicateur de performance
                        </Button>
                        <Button
                            as={RouterLink}
                            to="/parametres"
                            variant="ghost"
                            color="white"
                            w="full"
                            bg="transparent"
                            border="1px solid transparent"
                            borderRadius="md"
                            _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
                        >
                            Paramètre
                        </Button>
                    </VStack>
                </Box>

                {/* Contenu principal */}
                <Box
                    w="full"
                    p={4}
                    bg="#2C3E50"
                    color="white"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                >
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
                </Box>
            </Flex>
        </Box>
    );
}
