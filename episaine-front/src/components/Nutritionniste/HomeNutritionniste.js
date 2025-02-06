import React from "react";
import {Box, Heading} from "@chakra-ui/react";
import Navbar from "../../Pages/navbar";

export default function HomeNutritionniste() {
    return (
        <Box display="flex" height="100vh" bg="#1f2b3e" color="white">
            <Navbar />

            {/* Content */}
            <Box
                flex="1"
                p={6}
                bg="#1f2b3e"
                color="white"
                maxWidth="1200px"
                mx="auto"
                w="calc(100% - 250px)"
                ml="250px"
            >
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
        </Box>
    );
}
