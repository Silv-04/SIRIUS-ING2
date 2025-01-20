// src/components/customers/Customers.js
import React from "react";
import { Flex, Box, Heading, Text } from "@chakra-ui/react";

export default function Customers() {
    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            minH="100vh"
            bg="green.50"
            p={4}
        >
            <Box
                bg="white"
                p={8}
                rounded="md"
                shadow="lg"
                maxW="800px"
                width="100%"
            >
                <Heading as="h1" size="2xl" mb={4} color="green.700">
                    Bienvenue, Client !
                </Heading>
                <Text fontSize="lg" color="gray.700">
                    Ici, vous pouvez planifier vos repas, suivre votre nutrition et accéder à des recettes personnalisées.
                </Text>
            </Box>
        </Flex>
    );
}
