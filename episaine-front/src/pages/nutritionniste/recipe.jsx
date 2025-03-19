import React, {useState } from "react";
import {Box, Flex, Heading, Spinner, Table, Thead, Tbody, Tr, Th, Td, Button, Select, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Text
} from "@chakra-ui/react";
import Navbar from "../../components/nutritionist/navbar";
import {GENERATE_RECIPE } from "../../constants/back";

/**
 * Main component to display and manage the list of recipes.
 */
export default function Recipe() {
    // State variables for managing recipes and UI state

    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [recipeCount, setRecipeCount] = useState(1);
    const [dietaryRegime, setDietaryRegime] = useState("");
    const [minCalories, setMinCalories] = useState(0);
    const [maxCalories, setMaxCalories] = useState(1000);
    const [error, setError] = useState("");

    // State for nutrients

    const [minGlucides, setMinGlucides] = useState(null);
    const [maxGlucides, setMaxGlucides] = useState(null);
    const [minLipides, setMinLipides] = useState(null);
    const [maxLipides, setMaxLipides] = useState(null);
    const [minGlucose, setMinGlucose] = useState(null);
    const [maxGlucose, setMaxGlucose] = useState(null);
    const [minLactose, setMinLactose] = useState(null);
    const [maxLactose, setMaxLactose] =useState(null);
    const [minMaltose, setMinMaltose] = useState(null);
    const [maxMaltose, setMaxMaltose] = useState(null);
    const [minAmidon, setMinAmidon] = useState(null);
    const [maxAmidon, setMaxAmidon] = useState(null);
    const [minFibres, setMinFibres] = useState(null);
    const [maxFibres, setMaxFibres] = useState(null);
    const [minCholesterol, setMinCholesterol] = useState(null);
    const [maxCholesterol, setMaxCholesterol] = useState(null);
    const [minSel, setMinSel] = useState(null);
    const [maxSel, setMaxSel] = useState(null);
    const [minCalcium, setMinCalcium] = useState(null);
    const [maxCalcium, setMaxCalcium] = useState(null);
    const [minCuivre, setMinCuivre] = useState(null);
    const [maxCuivre, setMaxCuivre] = useState(null);
    const [minFer, setMinFer] = useState(null);
    const [maxFer, setMaxFer] = useState(null);
    const [minProteines625, setMinProteines625] = useState(null);
    const [maxProteines625, setMaxProteines625] = useState(null);}