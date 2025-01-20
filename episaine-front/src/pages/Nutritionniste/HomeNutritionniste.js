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
    useDisclosure,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    IconButton,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi"; // Icône pour le menu

export default function HomeNutritionniste() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box>
            {/* Menu à gauche - sidebar */}
            <Flex direction="row">
                {/* Sidebar */}
                <Box
                    w={{ base: "100%", md: "250px" }}
                    h="100vh"
                    bg="#2C3E50" // Bleu marine
                    color="white"
                    p={4}
                    display={{ base: "none", md: "block" }} // Masquer sur mobile
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

                {/* Menu mobile - Drawer (caché sur les grands écrans) */}
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
                    {/* Ajouter des sections ou des boutons supplémentaires ici si besoin */}
                </Box>
            </Flex>
        </Box>
    );
}
