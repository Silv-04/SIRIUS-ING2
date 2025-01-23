import React, { useEffect, useState, useRef } from "react";
import {
    Box,
    Flex,
    Heading,
    Text,
    SimpleGrid,
    Button,
} from "@chakra-ui/react";
import Navbar from "../../components/nutritionist/navbar";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FEMALE_COUNT, MALE_COUNT, TOTAL_COUNT, MONTHLY_CUSTOMER_COUNT, AGE_DISTRIBUTION } from "../../constants/back";

export default function IndicateurPerformance() {
    const [stats, setStats] = useState({
        females: 0,
        males: 0,
        total: 0,
    });
    const [monthlyData, setMonthlyData] = useState([]);
    const [ageDistributionData, setAgeDistributionData] = useState([]);
    const [loadingStats, setLoadingStats] = useState(true);
    const [loadingMonthly, setLoadingMonthly] = useState(true);
    const [loadingAge, setLoadingAge] = useState(true);
    const [errorStats, setErrorStats] = useState(null);
    const [errorMonthly, setErrorMonthly] = useState(null);
    const [errorAge, setErrorAge] = useState(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                console.log("Fetching global stats...");
                const [femaleRes, maleRes, totalRes] = await Promise.all([
                    fetch(FEMALE_COUNT),
                    fetch(MALE_COUNT),
                    fetch(TOTAL_COUNT),
                ]);

                if (!femaleRes.ok || !maleRes.ok || !totalRes.ok) {
                    throw new Error("Erreur API : Impossible de récupérer les statistiques globales.");
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
                setErrorStats(null);
            } catch (err) {
                console.error(err.message);
                setErrorStats(err.message);
            } finally {
                setLoadingStats(false);
            }
        };

        const fetchMonthlyData = async () => {
            try {
                console.log("Fetching monthly data...");
                const monthlyRes = await fetch(MONTHLY_CUSTOMER_COUNT);

                if (!monthlyRes.ok) {
                    throw new Error("Erreur API : Impossible de récupérer les données mensuelles.");
                }

                const rawMonthlyData = await monthlyRes.json();
                const monthsMap = [];

                rawMonthlyData.forEach((item) => {
                    const [year, month] = item.month.split("-");
                    const existingMonth = monthsMap.find(
                        (data) => data.year === parseInt(year, 10) && data.month === parseInt(month, 10)
                    );

                    if (existingMonth) {
                        if (item.gender === "Male") {
                            existingMonth.males += item.count;
                        } else if (item.gender === "Female") {
                            existingMonth.females += item.count;
                        }
                    } else {
                        monthsMap.push({
                            year: parseInt(year, 10),
                            month: parseInt(month, 10),
                            males: item.gender === "Male" ? item.count : 0,
                            females: item.gender === "Female" ? item.count : 0,
                        });
                    }
                });

                monthsMap.sort((a, b) => {
                    if (a.year === b.year) {
                        return a.month - b.month;
                    }
                    return a.year - b.year;
                });

                setMonthlyData(monthsMap);
                setErrorMonthly(null);
            } catch (err) {
                console.error(err.message);
                setErrorMonthly(err.message);
            } finally {
                setLoadingMonthly(false);
            }
        };

        const fetchAgeDistribution = async () => {
            try {
                console.log("Fetching age distribution...");
                console.log("URL utilisée :", AGE_DISTRIBUTION);

                const ageRes = await fetch(AGE_DISTRIBUTION);

                console.log("Statut de la réponse API :", ageRes.status);
                if (!ageRes.ok) {
                    const errorText = await ageRes.text();
                    console.log("Erreur API détaillée :", errorText);
                    throw new Error("Erreur API : Impossible de récupérer les données par tranche d'âge.");
                }

                const rawAgeData = await ageRes.json();
                console.log("Données brutes reçues :", rawAgeData);

                // // Age groups in the desired order
                const ageOrder = ["18-25", "26-35", "36-45", "46-55", "56-64", "+65"];
                const ageFormatted = Object.entries(rawAgeData)
                    .map(([ageGroup, count]) => ({
                        ageGroup,
                        count,
                    }))
                    .sort((a, b) => ageOrder.indexOf(a.ageGroup) - ageOrder.indexOf(b.ageGroup));

                console.log("Données formatées (triées) :", ageFormatted);

                setAgeDistributionData(ageFormatted);
                setErrorAge(null);
            } catch (err) {
                console.error("Erreur lors de la récupération des données :", err.message);
                setErrorAge("Impossible de récupérer les données par tranche d'âge. Utilisation de données factices.");

                // Fallback to dummy data
                const mockAgeData = {
                    "18-25": 0,
                    "26-35": 0,
                    "36-45": 0,
                    "46-55": 0,
                    "56-64": 0,
                    "+65": 0,
                };
                const ageOrder = ["18-25", "26-35", "36-45", "46-55", "56-64", "+65"];
                const mockFormattedData = Object.entries(mockAgeData)
                    .map(([ageGroup, count]) => ({
                        ageGroup,
                        count,
                    }))
                    .sort((a, b) => ageOrder.indexOf(a.ageGroup) - ageOrder.indexOf(b.ageGroup));

                setAgeDistributionData(mockFormattedData);
            } finally {
                setLoadingAge(false);
            }
        };

        fetchStats();
        fetchMonthlyData();
        fetchAgeDistribution();
    }, []);

    const generatePDF = async () => {
        const content = contentRef.current;
        const canvas = await html2canvas(content, { scale: 2 });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("indicateurs_performance.pdf");
    };

    return (
        <Box bg="#1f2b3e" minHeight="100vh">
            <Flex height="100vh" color="#1f2b3e">
                <Navbar />

                <Box
                    flex="1"
                    p={6}
                    bg="#1f2b3e"
                    color="#1f2b3e"
                    maxWidth="1200px"
                    mx="auto"
                    w="calc(100% - 250px)"
                    ml="250px"
                >
                    <Button colorScheme="teal" onClick={generatePDF} mb={6}>
                        Télécharger en PDF
                    </Button>

                    <Box ref={contentRef}>
                        <Heading mb={6} size="lg" color="#acc2ef">
                            Indicateurs de Performance
                        </Heading>

                        {/* Statistiques Globales */}
                        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
                            {loadingStats ? (
                                <Text color="white">Chargement des statistiques globales...</Text>
                            ) : errorStats ? (
                                <Text color="red.400">{errorStats}</Text>
                            ) : (
                                <>
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
                                        <Heading size="xl" color="#FD6C9E">
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
                                        <Heading size="xl" color="#1E7FCB">
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
                                </>
                            )}
                        </SimpleGrid>

                        {/* Répartition par Mois */}
                        <Box bg="#292e3b" p={6} rounded="lg" shadow="lg" mt={6}>
                            <Heading size="md" mb={4} color="#cee8ff">
                                Répartition des clients par mois
                            </Heading>
                            {loadingMonthly ? (
                                <Text color="white">Chargement des données mensuelles...</Text>
                            ) : errorMonthly ? (
                                <Text color="red.400">{errorMonthly}</Text>
                            ) : (
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={monthlyData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis
                                            dataKey="month"
                                            tickFormatter={(value, index) =>
                                                `${monthlyData[index].year}-${String(value).padStart(2, "0")}`
                                            }
                                        />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="males" fill="#1E7FCB" name="Hommes" />
                                        <Bar dataKey="females" fill="#FD6C9E" name="Femmes" />
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </Box>

                        {/* Répartition par Tranche d'Âge */}
                        <Box bg="#292e3b" p={6} rounded="lg" shadow="lg" mt={6}>
                            <Heading size="md" mb={4} color="#cee8ff">
                                Répartition des clients par tranche d'âge
                            </Heading>
                            {loadingAge ? (
                                <Text color="white">Chargement des données par tranche d'âge...</Text>
                            ) : errorAge ? (
                                <Text color="red.400">{errorAge}</Text>
                            ) : (
                                <ResponsiveContainer width="100%" height={300}>
                                    <BarChart data={ageDistributionData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="ageGroup" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Bar dataKey="count" fill="#FFA500" name="Clients" />
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </Box>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
}
