import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import Navbar from "../../Pages/navbar";
import {GrInProgress} from "react-icons/gr";

export default function Dashboard() {
    return (
        <Box display="flex" height="100vh" bg="#1f2b3e" color="white">
            {/* Navbar */}
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
                    Tableau de Bord
                </Heading>
                <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg="#9eb5e5"
                    color="white"
                    borderRadius="12px"
                    p={6}
                    textAlign="center"
                    fontSize="2xl"
                    fontWeight="bold"
                    flexDirection="column"
                >
                    <GrInProgress size={80} color="white" />
                    TBD (in the future)
                </Box>

            </Box>
        </Box>
    );
}
