import React from "react";
import { Box, Heading, Button, Text } from "@chakra-ui/react";
import Navbar from "../../Pages/navbar";
import { useNavigate } from "react-router-dom";

export default function Parametre() {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <Box display="flex" height="100vh" bg="#1f2b3e" color="white">
            <Navbar />

            {/*Content */}
            <Box
                flex="1"
                p={6}
                bg="#1f2b3e"
                color="white"
                maxWidth="1200px"
                mx="auto"
                w="calc(100% - 250px)"
                ml="250px"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
            >
                <Heading
                    as="h1"
                    size="2xl"
                    bgGradient="linear(to-r, teal.300, green.400)"
                    bgClip="text"
                    fontWeight="extrabold"
                    mb={6}
                >
                    Paramètres
                </Heading>
                <Text fontSize="xl" color="#cee8ff" mb={4}>
                </Text>
                <Button
                    size="lg"
                    bg="#9eb5e5"
                    color="white"
                    _hover={{ bg: "#1b6cc2" }}
                    borderRadius="12px"
                    px={12}
                    py={6}
                    onClick={handleLogout}
                >Se Déconnecter
                </Button>
            </Box>
        </Box>
    );
}
