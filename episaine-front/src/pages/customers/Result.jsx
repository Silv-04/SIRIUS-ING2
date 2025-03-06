import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import LeftMenu from "../../components/customers/LeftMenu";
import recipesListTableHeader from "../../constants/recipesListTableHeader.json";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Box, Button, Center, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

// path="/client/recettes/informations/choix/resultat/"
function ResultPage() {
    const [recipesList, setRecipesList] = useState([]);
    const location = useLocation();
    const pdfRef = useRef();

    // generate a pdf
    const generatePDF = () => {
        const input = pdfRef.current;
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const imgWidth = 210;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
            pdf.save("recipes_list.pdf");
        });
    };

    // receive data from previous page
    useEffect(() => {
        if (location.state?.inputValue) {
            console.log("Recipes List: ", location.state.inputValue);
            setRecipesList(location.state.inputValue);
        }
    }, [location.state]);

    return (
        <Box sx={{ paddingLeft: "20px", paddingTop: "20px" }}>
            <TableContainer sx={{ overflowY: "auto" }} height={"50vh"} width={"100%"}>
                <Table ref={pdfRef} width={"100%"} layout={"fixed"}>
                    <Thead position={"sticky"} top={0} zIndex={1} background={"white"}>
                        <Tr>
                            {recipesListTableHeader.map((header) => (
                                <Th key={header.value} align="left">
                                    {header.value === 'recipeId' ? 'Numéro de jour' : header.label}
                                </Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {recipesList.map((recipes, index) => (
                            recipes[0].map((recipe) => (
                                <Tr key={index}>
                                    {recipesListTableHeader.map(({ value }) => (
                                        <Td key={value} align="left" style={{ whiteSpace: 'pre-wrap' }}>
                                            {value === 'recipeId' ? recipes[1] : (recipe[value] || 'N/A')}
                                        </Td>
                                    ))}
                                </Tr>

                            ))
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
            <Center><Button _hover={{ bg: "#4d648d" }} color="white" bg="#2C3A4F" onClick={generatePDF}>
                Enregistrer en PDF
            </Button></Center>
        </Box>
    )
}

export default function Result() {
    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ width: '250px' }}>
                <LeftMenu />
            </div>

            <div style={{ flexGrow: 1 }}>
                <ResultPage />
            </div>
        </div>
    )
}