import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LeftMenu from "../../components/customers/LeftMenu";
import recipesListTableHeader from "../../constants/recipesListTableHeader.json";
import { Box, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";


// path="/client/recettes/informations/choix/resultat/"
function ResultPage() {
    const [recipesList, setRecipesList] = useState([]);
    const location = useLocation();

    // receive data from previous page
    useEffect(() => {
        if (location.state?.inputValue) {
            console.log("Recipes List: ", location.state.inputValue);
            setRecipesList(location.state.inputValue);
        }
    }, [location.state]);

    return (
        <Box sx={{ paddingLeft: "20px", paddingTop: "20px", height: "100vh"}}>
            <TableContainer overflowY="auto" height="80%" width={"100%"}>
                <Table width={"100%"} layout={"fixed"}>
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