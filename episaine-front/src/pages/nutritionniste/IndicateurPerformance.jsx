import React, { useEffect, useState, useRef } from "react";
import {Box, Flex, Heading, Text, SimpleGrid, Button,} from "@chakra-ui/react";
import Navbar from "../../components/nutritionist/navbar";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { ScatterChart ,LineChart,Scatter, BarChart,ReferenceLine  , Bar ,Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FEMALE_COUNT, MALE_COUNT, TOTAL_COUNT, MONTHLY_CUSTOMER_COUNT, AGE_DISTRIBUTION,AVG_IMC_CUSTOMER,ACM_RESULT} from "../../constants/back";

export default function IndicateurPerformance() {
    const [stats, setStats] = useState({females: 0, males: 0, total: 0,});
    const [monthlyData, setMonthlyData] = useState([]);
    const [ageDistributionData, setAgeDistributionData] = useState([]);
    const [loadingStats, setLoadingStats] = useState(true);
    const [loadingMonthly, setLoadingMonthly] = useState(true);
    const [loadingAge, setLoadingAge] = useState(true);
    const [errorStats, setErrorStats] = useState(null);
    const [errorMonthly, setErrorMonthly] = useState(null);
    const [errorAge, setErrorAge] = useState(null);
    const contentRef = useRef(null);



    // Adding cont for IMC

    const [imcData, setImcData] = useState([]);
    const [loadingImc, setLoadingImc] = useState(true);
    const [errorImc, setErrorImc] = useState(null);


    // Adding Const for ACM


    const [acmData, setAcmData] = useState([]);
    const [loadingAcm, setLoadingAcm] = useState(true);
    const [errorAcm, setErrorAcm] = useState(null);
    const ageOrder = ["18-25", "26-35", "36-45", "46-55", "56-64", "+65"];
    const sortedAcmData = [...acmData].sort(
        (a, b) => ageOrder.indexOf(a.ageGroup) - ageOrder.indexOf(b.ageGroup));


    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [femaleRes, maleRes, totalRes] = await Promise.all([
                    fetch(FEMALE_COUNT),
                    fetch(MALE_COUNT),
                    fetch(TOTAL_COUNT),
                ]);

                if (!femaleRes.ok || !maleRes.ok || !totalRes.ok) {
                    throw new Error("Impossible de récupérer les datas globales.");
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
                const monthlyRes = await fetch(MONTHLY_CUSTOMER_COUNT);

                if (!monthlyRes.ok) {
                    throw new Error("Impossible de récupérer les datas globales.");
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
                setErrorMonthly(err.message);
            } finally {
                setLoadingMonthly(false);
            }
        };

        const fetchAgeDistribution = async () => {
            try {
                console.log("URL utilisée :", AGE_DISTRIBUTION);
                const ageRes = await fetch(AGE_DISTRIBUTION);
                if (!ageRes.ok) {
                    const errorText = await ageRes.text();
                    throw new Error("Impossible de récupérer les datas par tranche d'âge.");
                }

                const rawAgeData = await ageRes.json();
                console.log("Données brutes reçues :", rawAgeData);

                // Age groups in the desired order

                const ageOrder = ["18-25", "26-35", "36-45", "46-55", "56-64", "+65"];
                const ageFormatted = Object.entries(rawAgeData).map(([ageGroup, count]) => ({ageGroup, count,})).sort((a, b) => ageOrder.indexOf(a.ageGroup) - ageOrder.indexOf(b.ageGroup));
                console.log("Données formatées (triées) :", ageFormatted);

                setAgeDistributionData(ageFormatted);
                setErrorAge(null);
            } catch (err) {

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

                setAgeDistributionData(mockFormattedData);} finally {
                setLoadingAge(false);
            }

            const fetchAcmData = async () => {
                try {
                    const res = await fetch(ACM_RESULT);
                    if (!res.ok) throw new Error("Erreur API : Impossible de récupérer les datas ACM.");
                    const data = await res.json();
                    const cleanedData = data.filter(item => item.ageGroup);
                    setAcmData(cleanedData);
                    setErrorAcm(null);
                } catch (err) {
                    console.error("Erreur ACM:", err.message);
                    setErrorAcm(err.message);
                } finally {
                    setLoadingAcm(false);
                }
            };

            fetchAcmData();

            const fetchImcData = async () => {
            try {
                const res = await fetch(AVG_IMC_CUSTOMER);
                if (!res.ok) {
                    throw new Error("Erreur API : Impossible de récupérer les data d'IMC.");
                }

                const rawData = await res.json();

                // Sorted according to the logical order of age groups

                const ageOrder = ["18-25", "26-35", "36-45", "46-55", "56-64", "+65"];
                const sortedData = rawData
                    .map(item => ({
                        ageGroup: item.ageGroup,
                        imc: item.imc,
                        averageWeight: item.averageWeight,
                        averageHeight: item.averageHeight,
                    }))
                    .sort((a, b) => ageOrder.indexOf(a.ageGroup) - ageOrder.indexOf(b.ageGroup));
                setImcData(sortedData);
                setErrorImc(null);} catch (err) {
                setErrorImc("Impossible de récupérer les données IMC.");
            } finally {
                setLoadingImc(false);
            }
        };

        fetchImcData();
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

    const colorMap = {
        C1: "#4C9AFF",
        C2: "#FFA500",
        C3: "#AA66CC",
    };

    const regimeParTranche = {
        "18-25": "Omnivore",
        "26-35": "Omnivore",
        "36-45": "Sans gluten",
        "46-55": "Végétarien",
        "56-64": "Végan",
        "+65": "Sans gluten"
    };

    const regimeColor = {
        "Omnivore": "#4C9AFF",
        "Sans gluten": "#FFBB28",
        "Végétarien": "#4CAF50",
        "Végan": "#AA66CC"
    };


    const flatComposantesData = sortedAcmData.map((item) => ({
        ageGroup: item.ageGroup.trim(),
        regime: regimeParTranche[item.ageGroup.trim()],
        x: item.U[0], // C1
        y: item.U[1], // C2
        fill: regimeColor[regimeParTranche[item.ageGroup.trim()]],
    }));


    sortedAcmData.forEach((item, ageIndex) => {
        ["C1", "C2", "C3"].forEach((key, index) => {
            flatComposantesData.push({
                index: ageIndex,
                ageGroup: item.ageGroup.trim(),
                composante: key,
                value: item.U[index],
                label: `${key}: ${item.U[index].toFixed(3)}`,
                fill: colorMap[key],
            });
        });
    });


    return (
        <Box bg="#1f2b3e" minHeight="100vh">
            <Flex height="100%" color="#eeeee4">
                <Navbar />

                <Box flex="1" p={6} bg="#1f2b3e" color="#1f2b3e" maxWidth="1200px" mx="auto" w="calc(100% - 250px)" ml="250px">
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
                                <Text color="white">Chargement des statistiques globales...</Text>) : errorStats ? (
                                <Text color="red.400">{errorStats}</Text>) : (<>
                                    <Box bg="#292e3b" p={6} rounded="lg" shadow="lg" textAlign="center" border="1px solid #4d648d">
                                        <Text fontSize="lg" fontWeight="bold" color="#cee8ff">Femmes</Text>
                                        <Heading size="xl" color="#FD6C9E">👩 {stats.females}</Heading>
                                    </Box>

                                    <Box bg="#292e3b" p={6} rounded="lg" shadow="lg" textAlign="center" border="1px solid #4d648d">
                                        <Text fontSize="lg" fontWeight="bold" color="#cee8ff">Hommes</Text>
                                        <Heading size="xl" color="#1E7FCB">👨 {stats.males}</Heading>
                                    </Box>

                                    <Box bg="#292e3b" p={6} rounded="lg" shadow="lg" textAlign="center" border="1px solid #4d648d">
                                        <Text fontSize="lg" fontWeight="bold" color="#cee8ff">Total</Text>
                                        <Heading size="xl" color="#FF4D4D">👥 {stats.total}</Heading>
                                    </Box>
                                </>
                            )}
                        </SimpleGrid>

                        {/* Distribution by Age Group */}

                        <Box bg="#292e3b" p={6} rounded="lg" shadow="lg" mt={6}>
                            <Heading size="md" mb={4} color="#cee8ff">
                                Répartition des clients par tranche d'âge
                            </Heading>
                            {loadingAge ? (<Text color="white">Chargement des données par tranche d'âge...</Text>) : errorAge ? (
                                <Text color="red.400">{errorAge}</Text>) : (
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

                        {/* Average BMI, Weight and Height by age group */}

                        <Box bg="#292e3b" p={6} rounded="lg" shadow="lg" mt={6}>
                            <Heading size="md" mb={4} color="#cee8ff">
                                IMC, Poids et Taille moyen par tranche d'âge
                            </Heading>{loadingImc ? (
                                <Text color="white">Chargement des données IMC...</Text>) : errorImc ? (
                                <Text color="red.400">{errorImc}</Text>) : (
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={imcData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="ageGroup" tickFormatter={(value) => value}/>
                                        <YAxis tickFormatter={(value) => value.toFixed(1)}/>
                                        <Tooltip formatter={(value) => value.toFixed(1)}/>
                                        <Legend />
                                        <Line type="monotone" dataKey="imc" stroke="#00C49F" name="IMC moyen" strokeWidth={3} />
                                        <Line type="monotone" dataKey="averageWeight" stroke="#FFBB28" name="Poids moyen" strokeWidth={4}/>
                                        <Line type="monotone" dataKey="averageHeight" stroke="#FF8042" name="Taille moyenne" strokeWidth={4} />
                                    </LineChart>
                                </ResponsiveContainer>)}
                        </Box>

                        <Box bg="#292e3b" p={6} rounded="lg" shadow="lg" mt={6}>
                            <Heading size="md" mb={2} color="#cee8ff">Résultats ACM : Composantes principales par tranche d'âge</Heading>
                            <Text fontSize="sm" mb={4} color="gray.400">
                                <strong>Vert</strong> : valeur positive &nbsp;|&nbsp;
                                <strong>Rouge</strong> : valeur négative <br />
                            </Text>{loadingAcm ? (
                                <Text color="white">Chargement des données ACM...</Text>) : errorAcm ? (
                                <Text color="red.400">{errorAcm}</Text>) : (
                                <Box overflowX="auto">
                                    <table style={{ width: "100%", color: "#eee", borderCollapse: "collapse" }}>
                                        <thead style={{ backgroundColor: "#1E2A38" }}>
                                        <tr>
                                            <th style={{ padding: "8px", borderBottom: "1px solid #4d648d", textAlign: "center" }}>Tranche d'âge</th>
                                            <th style={{ padding: "8px", borderBottom: "1px solid #4d648d", textAlign: "center" }}>Composante 1 (Taille)</th>
                                            <th style={{ padding: "8px", borderBottom: "1px solid #4d648d", textAlign: "center" }}>Composante 2 (Poids)</th>
                                            <th style={{ padding: "8px", borderBottom: "1px solid #4d648d", textAlign: "center" }}>Composante 3 (IMC)</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {sortedAcmData.map((item, index) => (
                                            <tr key={index}><td style={{padding: "8px", borderBottom: "1px solid #4d648d", textAlign: "center"}}>{item.ageGroup}
                                                </td>
                                                <td style={{padding: "8px", borderBottom: "1px solid #4d648d", textAlign: "center", color: item.U[0] >= 0 ? "#4CAF50" : "#FF4C4C", fontWeight: "bold"}} title={item.U[0] >= 0 ? "Taille élevée" : "Taille plus faible"}>{item.U[0].toFixed(3)}</td>
                                                <td style={{padding: "8px", borderBottom: "1px solid #4d648d", textAlign: "center", color: item.U[1] >= 0 ? "#4CAF50" : "#FF4C4C", fontWeight: "bold"}} title={item.U[1] >= 0 ? "Poids plus léger" : "Poids élevé"}>{item.U[1].toFixed(3)}</td>
                                                <td style={{padding: "8px", borderBottom: "1px solid #4d648d", textAlign: "center", color: item.U[2] >= 0 ? "#4CAF50" : "#FF4C4C", fontWeight: "bold"}} title={item.U[2] >= 0 ? "IMC normal ou bas" : "IMC élevé"}>
                                                    {item.U[2].toFixed(3)}
                                                </td>
                                            </tr>))}
                                        </tbody>
                                    </table>
                                </Box>
                            )}
                        </Box>
                        {/* ACM KPI */}
                        <Box
                            bg="white"
                            p={6}
                            rounded="lg"
                            shadow="lg"
                            mt={6}
                            textAlign="center"
                        >
                            <Text fontSize="xl" fontWeight="bold" mb={2} color="gray.800">
                                Composantes principales par tranche d’âge
                            </Text>
                            <Text fontSize="sm" mb={4} color="gray.600">
                                Représentation des composantes C1 (Taille) et C2 (Poids) par intervalle d’âge, avec régime dominant affiché
                            </Text>
                            <Text fontSize="sm" color="gray.600" mb={4}>
                                <span style={{ color: "#1f77b4", fontWeight: "bold" }}>C1 (Taille)</span>,{" "}
                                <span style={{ color: "#ff7f0e", fontWeight: "bold" }}>C2 (Poids)</span>
                            </Text>

                            <ResponsiveContainer width="100%" height={400}>
                                <ScatterChart margin={{ top: 20, right: 40, bottom: 40, left: 40 }}>
                                    <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                                    <XAxis
                                        type="number"
                                        dataKey="x"
                                        name="Composante 1 (Taille)"
                                        stroke="#333"
                                    />
                                    <YAxis
                                        type="number"
                                        dataKey="y"
                                        name="Composante 2 (Poids)"
                                        stroke="#333"
                                    />
                                    <Tooltip
                                        cursor={{ strokeDasharray: "3 3" }}
                                        formatter={(value, name) => [value.toFixed(3), name === "x" ? "C1 (Taille)" : "C2 (Poids)",]}
                                        labelFormatter={(val, props) => {const p = props[0]?.payload;return `${p.ageGroup} - ${p.regime}`;}}/>
                                    <Legend />
                                    <ReferenceLine y={0} stroke="#aaa" strokeDasharray="3 3" />
                                    <ReferenceLine x={0} stroke="#aaa" strokeDasharray="3 3" />
                                    <Scatter
                                        name="Tranches d'âge"
                                        data={flatComposantesData}
                                        shape={(props) => {
                                            const { cx, cy, payload } = props;
                                            return (
                                                <>
                                                    <text x={cx + 10} y={cy + 4} textAnchor="start" fontSize={12} fill="#333">
                                                        {`${payload.ageGroup} : ${payload.regime}`}
                                                    </text>
                                                    <circle cx={cx} cy={cy} r={7} fill={payload.fill} stroke="#fff" strokeWidth={1.5}/>
                                                </>
                                            );
                                        }}
                                    />
                                </ScatterChart>
                            </ResponsiveContainer>
                        </Box>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
}
