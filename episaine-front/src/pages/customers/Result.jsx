import { Box, Button, Container, createTheme, Grid2, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LeftMenu from "../../components/customers/LeftMenu";
import recipesListTableHeader from "../../constants/recipesListTableHeader.json";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// path="/client/recettes/informations/choix/resultat/"
function ResultPage() {
    const [recipesList, setRecipesList] = useState([]);
    const location = useLocation();
    const pdfRef = useRef();
    const theme = createTheme();
    const navigate = useNavigate();

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

    // handle the validation of the recipes list
    const handleValidate = () => {
        console.log("Recipes List: ", recipesList);
        navigate("/client/recettes/informations/choix/resultat/projection/", { state: { inputValue: recipesList } });
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ paddingLeft: "20px", paddingTop: "20px" }}>
                <TableContainer sx={{ maxHeight: "400px", overflowY: "auto" }}>
                    <Table stickyHeader ref={pdfRef}>
                        <TableHead>
                            <TableRow>
                                {recipesListTableHeader.map((header) => (
                                    <TableCell key={header.value} align="left">
                                        {header.value === 'recipeId' ? 'Numéro de jour' : header.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recipesList.map((recipes, index) => (
                                recipes[0].map((recipe) => (
                                    <TableRow key={index}>
                                        {recipesListTableHeader.map(({ value }) => (
                                            <TableCell key={value} align="left">
                                                {value === 'recipeId' ? recipes[1] : (recipe[value] || 'N/A')}
                                            </TableCell>
                                        ))}
                                    </TableRow>

                                ))
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid2 paddingTop={5} gap={5} container>
                    <Button variant="contained" color="primary" onClick={generatePDF}>
                        Enregistrer en PDF
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleValidate}>Obtenir la projection</Button>
                </Grid2>
            </Box>
        </ThemeProvider>
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