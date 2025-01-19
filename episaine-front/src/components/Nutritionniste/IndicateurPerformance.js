import React, { useEffect, useState } from "react";
import {
    Box,
    Flex,
    Heading,
    VStack,
    Button,
    Text,
    SimpleGrid,
    Icon,
} from "@chakra-ui/react";
import {
    FaWallet,
    FaUsers,
    FaCalendarAlt,
    FaBook,
    FaCog,
} from "react-icons/fa";
import { FEMALE_COUNT, MALE_COUNT, TOTAL_COUNT } from "../../constants/back";

export default function IndicateurPerformance() {
    const [stats, setStats] = useState({
        females: 0,
        males: 0,
        total: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);

                const [femaleRes, maleRes, totalRes] = await Promise.all([
                    fetch(FEMALE_COUNT),
                    fetch(MALE_COUNT),
                    fetch(TOTAL_COUNT),
                ]);

                if (!femaleRes.ok || !maleRes.ok || !totalRes.ok) {
                    throw new Error("Erreur lors de la récupération des statistiques.");
                }

                const [femaleCount, maleCount, totalCount] = await Promise.all([
                    femaleRes.json(),
                    maleRes.json(),
                    totalRes.json(),
                ]);

                setStats({
                    females: femaleCount,
                    males: maleCount,
                    total: totalCount,
                });

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <Text color="white">Chargement des statistiques...</Text>;
    }

    if (error) {
        return <Text color="red.400">Erreur : {error}</Text>;
    }

    return (
        <Flex height="100vh" bg="#1f2b3e" color="white">
            {/* Sidebar */}
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
                    <Heading size="md" color="#acc2ef">
                        EPISAINE
                    </Heading>
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
                        >
                            Tableau de bord
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
                        >
                            Clients
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
                            Rendez-vous
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
                            Bibliothèque recette
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
                            Paramètre
                        </Button>
                    </VStack>
                </VStack>
            </Box>

            {/* Main Content */}
            <Box flex="1" p={6} bg="#1f2b3e" color="white">
                <Heading mb={6} size="lg" color="#acc2ef">
                    Indicateurs de Performance
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                    <Box
                        bg="#292e3b"
                        p={6}
                        rounded="lg"
                        shadow="lg"
                        textAlign="center"
                        border="1px solid #4d648d"
                    >
                        <Text fontSize="lg" fontWeight="bold" color="#cee8ff">
                            Femmes
                        </Text>
                        <Heading size="xl" color="#FF4D4D">
                            👩 {stats.females}
                        </Heading>
                    </Box>
                    <Box
                        bg="#292e3b"
                        p={6}
                        rounded="lg"
                        shadow="lg"
                        textAlign="center"
                        border="1px solid #4d648d"
                    >
                        <Text fontSize="lg" fontWeight="bold" color="#cee8ff">
                            Hommes
                        </Text>
                        <Heading size="xl" color="#FF4D4D">
                            👨 {stats.males}
                        </Heading>
                    </Box>
                    <Box
                        bg="#292e3b"
                        p={6}
                        rounded="lg"
                        shadow="lg"
                        textAlign="center"
                        border="1px solid #4d648d"
                    >
                        <Text fontSize="lg" fontWeight="bold" color="#cee8ff">
                            Total
                        </Text>
                        <Heading size="xl" color="#FF4D4D">
                            👥 {stats.total}
                        </Heading>
                    </Box>
                </SimpleGrid>
            </Box>
        </Flex>
    );
}
