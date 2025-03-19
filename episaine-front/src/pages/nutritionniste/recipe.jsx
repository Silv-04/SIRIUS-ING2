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
}