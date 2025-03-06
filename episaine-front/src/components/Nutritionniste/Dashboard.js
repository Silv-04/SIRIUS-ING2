import React from "react";
import {
    Box,
    Flex,
    Heading,
    Text,
    SimpleGrid,
    Image,
} from "@chakra-ui/react";
import {ShieldCheck, Trophy, Leaf, Heart } from "lucide-react";
import Navbar from "../../Pages/navbar";
import LogoCarrefour from "../../Asset/Logo_Carrefour.png";
import LogoLidl from "../../Asset/Lidl.png";
import LogoAuchan from "../../Asset/Auchan.png";
import LogoLeclerc from "../../Asset/Leclerc.png";

// Presentation of SuperMarket
const partnerships = [
    {
        id: 1,
        name: "Carrefour",
        logo: LogoCarrefour,
        description: "Présent dans plus de 30 pays",
        products: "Produits frais et bio",
        details: "Carrefour propose une gamme variée de produits bio et locaux, favorisant une alimentation saine et équilibrée."
    },
    {
        id: 2,
        name: "Auchan",
        logo: LogoAuchan,
        description: "Un réseau de plus de 600 magasins",
        products: "Épicerie bio et produits frais",
        details: "Auchan met un point d'honneur à offrir des produits sans pesticides et issus de circuits courts."
    },
    {
        id: 3,
        name: "Lidl",
        logo: LogoLidl,
        description: "Rapport qualité/prix imbattable",
        products: "Produits locaux et discounts",
        details: "Lidl s'engage à proposer des produits accessibles tout en respectant les standards de qualité et d'éthique."
    },
    {
        id: 4,
        name: "E leclerc",
        logo: LogoLeclerc,
        description: "Supermarché de proximité",
        products: "Produits de saison et bio",
        details: "E leclerc favorise les circuits courts et met en avant des producteurs régionaux pour une consommation responsable."
    }
];

// Engagement qualité
const features = [
    {
        icon: <Leaf className="w-8 h-8 text-emerald-500" />,
        title: "Produits Bio Certifiés",
        description: "Nos partenaires offrent des produits bio certifiés garantissant une alimentation saine."
    },
    {
        icon: <ShieldCheck className="w-8 h-8 text-emerald-500" />,
        title: "Qualité Garantie",
        description: "Des contrôles qualité rigoureux assurent la fraîcheur et la sécurité des aliments."
    },
    {
        icon: <Trophy className="w-8 h-8 text-emerald-500" />,
        title: "Excellence Reconnue",
        description: "Nos partenaires sont récompensés pour leur engagement dans une alimentation durable."
    },
    {
        icon: <Heart className="w-8 h-8 text-emerald-500" />,
        title: "Impact Social",
        description: "Nous collaborons pour améliorer l’accès à une alimentation équilibrée pour tous."
    }
];

export default function Dashboard() {
    return (
        <Box bg="#1f2b3e" minHeight="auto">
            <Flex height="100vh" color="white">
                {/* Navbar FIXE */}
                <Navbar />

                {/* Contenu principal */}
                <Box flex="1" p={6} bg="#1f2b3e" color="white" w="calc(100% - 250px)" ml="250px">
                    {/* Titre Principal */}
                    <Heading mb={6} size="lg" color="#acc2ef" textAlign="center">
                        Nos Partenaires de Confiance
                    </Heading>

                    {/* Partenaires Grid */}
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={12}>
                        {partnerships.map((partner) => (
                            <Box
                                key={partner.id}
                                bg="white"
                                p={6}
                                rounded="xl"
                                shadow="lg"
                                textAlign="center"
                                border="1px solid #4d648d"
                                color="black"
                            >
                                <Image src={partner.logo} alt={partner.name} boxSize="100px" mx="auto" mb={4} />
                                <Heading size="md" mb={2}>{partner.name}</Heading>
                                <Text fontSize="sm" color="gray.600" mb={2}>{partner.description}</Text>
                                <Text fontSize="sm" color="teal.500" fontWeight="bold">{partner.products}</Text>
                                <Text fontSize="xs" color="gray.500" mt={2}>{partner.details}</Text>
                            </Box>
                        ))}
                    </SimpleGrid>

                    {/* Engagement Qualité */}
                    <Box bg="white" p={6} rounded="xl" shadow="lg" textAlign="center" color="black">
                        <Heading size="md" mb={4} color="black">Notre Engagement Qualité</Heading>
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
                            {features.map((feature, index) => (
                                <Box key={index} textAlign="center">
                                    <Box display="flex" justifyContent="center" mb={4}>
                                        {feature.icon}
                                    </Box>
                                    <Heading size="sm" color="gray.800">{feature.title}</Heading>
                                    <Text fontSize="xs" color="gray.600">{feature.description}</Text>
                                </Box>
                            ))}
                        </SimpleGrid>
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
}
