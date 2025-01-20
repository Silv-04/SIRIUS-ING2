// src/components/Nutritionniste/Navbar.js
import React from "react";
import { Link as RouterLink } from "react-router-dom"; // Utilisation de RouterLink pour la navigation
import { Box, Flex, Button, HStack, Image, Spacer, Heading } from "@chakra-ui/react";

export default function Navbar({ hideNavbar }) {
    return (
        !hideNavbar && ( // Vérifie si la navbar doit être affichée
            <Box>
                {/* Header de la Navbar */}
                <Flex
                    as="header"
                    align="center"
                    justify="space-between"
                    p={4}
                    bg="#2C3E50" // Bleu marine
                    color="white"
                >
                    <HStack>
                        <Image
                            src="https://img.icons8.com/fluency/96/000000/vegetarian-food.png" // Logo
                            alt="Logo Episaine"
                            boxSize="40px"
                        />
                        <Heading size="md">Episaine</Heading>
                    </HStack>
                    <Spacer />
                    <HStack spacing={4}>
                        {/* Liens de navigation */}
                        <Button as={RouterLink} to="/dashboard" variant="link" color="white">
                            Tableau de bord
                        </Button>
                        <Button as={RouterLink} to="/clients" variant="link" color="white">
                            Clients
                        </Button>
                        <Button as={RouterLink} to="/rendezvous" variant="link" color="white">
                            Rendez-vous
                        </Button>
                        <Button as={RouterLink} to="/bibliotheque-recette" variant="link" color="white">
                            La bibliothèque recette
                        </Button>
                        <Button as={RouterLink} to="/indicateur-performance" variant="link" color="white">
                            Indicateur de performance
                        </Button>
                        <Button as={RouterLink} to="/parametres" variant="link" color="white">
                            Paramètre
                        </Button>
                    </HStack>
                </Flex>

                {/* Footer de la Navbar */}
                <Flex
                    as="footer"
                    width="100%"
                    padding={4}
                    bg="#2C3E50" // Bleu marine
                    color="white"
                    direction="column"
                    align="center"
                >
                    <Spacer />
                    <HStack spacing={4}>
                        <Button as={RouterLink} to="/about" variant="link" color="white">
                            À propos
                        </Button>
                        <Button as={RouterLink} to="/contact" variant="link" color="white">
                            Contact
                        </Button>
                        <Button as={RouterLink} to="/privacy" variant="link" color="white">
                            Politique de confidentialité
                        </Button>
                    </HStack>
                    <Box mt={4} color="gray.300" fontSize="sm">
                        &copy; {new Date().getFullYear()} Episaine. Tous droits réservés.
                    </Box>
                </Flex>
            </Box>
        )
    );
}
