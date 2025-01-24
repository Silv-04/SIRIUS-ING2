import {
    Box,
    Button,
    createTheme,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    ThemeProvider,
    Typography,
} from "@mui/material";
import { PictureAsPdf } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import LeftMenu from "../../components/customers/LeftMenu";
import recipesListTableHeader from "../../constants/recipesListTableHeader.json";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function ResultPage() {
    const [recipesList, setRecipesList] = useState([]);
    const location = useLocation();
    const pdfRef = useRef();
    const theme = createTheme();

    // Generate PDF
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

    // Receive data from previous page
    useEffect(() => {
        if (location.state?.inputValue) {
            setRecipesList(location.state.inputValue);
        }
    }, [location.state]);

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    padding: 4,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                    backgroundColor: "#f9f9f9",
                    minHeight: "100vh",
                }}
            >
                <Typography
                    variant="h4"
                    color="primary"
                    sx={{ fontWeight: "bold", marginBottom: 3 }}
                >
                    Résultats des Recettes
                </Typography>

                <TableContainer
                    sx={{
                        maxHeight: "500px",
                        width: "100%",
                        backgroundColor: "#fff",
                        borderRadius: 2,
                        boxShadow: 3,
                        overflowY: "auto",
                    }}
                >
                    <Table stickyHeader ref={pdfRef}>
                        <TableHead>
                            <TableRow>
                                {recipesListTableHeader.map((header) => (
                                    <TableCell key={header.value} align="left">
                                        {header.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recipesList.flat().map((recipe, index) => (
                                <TableRow key={index}>
                                    {recipesListTableHeader.map(({ value }) => (
                                        <TableCell key={value} align="left">
                                            {recipe[value] || "N/A"}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Button
                    variant="contained"
                    color="primary"
                    onClick={generatePDF}
                    startIcon={<PictureAsPdf />}
                    sx={{ padding: "10px 20px" }}
                >
                    Enregistrer en PDF
                </Button>
            </Box>
        </ThemeProvider>
    );
}

export default function Result() {
    return (
        <div style={{ display: "flex", height: "100vh" }}>
            <div style={{ width: "250px" }}>
                <LeftMenu />
            </div>

            <div style={{ flexGrow: 1 }}>
                <ResultPage />
            </div>
        </div>
    );
}
