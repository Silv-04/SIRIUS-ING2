import React, { useEffect, useState, useRef } from "react";
import {
    Box,
    Flex,
    Heading,
    Text,
    SimpleGrid,
    Button,
} from "@chakra-ui/react";
import { FEMALE_COUNT, MALE_COUNT, TOTAL_COUNT } from "../../constants/back";
import Navbar from "../../components/nutritionist/navbar";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export default function IndicateurPerformance() {
    const [stats, setStats] = useState({
        females: 0,
        males: 0,
        total: 0,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const contentRef = useRef(null); // Référence pour capturer le contenu

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

    const generatePDF = async () => {
        const content = contentRef.current; // Récupération du contenu principal
        const canvas = await html2canvas(content, { scale: 2 }); // Capture du contenu en canvas
        const imgData = canvas.toDataURL("image/png"); // Conversion en image
        const pdf = new jsPDF("p", "mm", "a4"); // Initialisation de jsPDF

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight); // Ajout de l'image au PDF
        pdf.save("indicateurs_performance.pdf"); // Téléchargement du fichier PDF
    };

    if (loading) {
        return <Text color="white">Chargement des statistiques...</Text>;
    }

    if (error) {
        return <Text color="red.400">Erreur : {error}</Text>;
    }

    return (
        <Flex height="100vh" bg="#1f2b3e" color="white">
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
                {/* Bouton pour générer le PDF */}
                <Button
                    colorScheme="teal"
                    onClick={generatePDF}
                    mb={6}
                >
                    Télécharger en PDF
                </Button>

                {/* Contenu principal capturé */}
                <Box ref={contentRef}>
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
            </Box>
        </Flex>
    );
}
