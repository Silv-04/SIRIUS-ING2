import React from 'react';
import { Box, Button, Grid, Text } from '@chakra-ui/react';
import LeftMenu from '../../components/customers/LeftMenu';
import { CgProfile } from "react-icons/cg";
import { FaBowlFood } from "react-icons/fa6";
import { VscGraphLine } from "react-icons/vsc";
import { Link as RouterLink } from "react-router-dom";

// path = "/client/menu/"
function MainPage() {
    return (
        <Box alignItems="center" display="flex" flexDirection="column" height="100vh" paddingTop={10}>

            <Text fontWeight={"bold"} fontSize={30}>Ajustez votre profil et obtenez des recettes adaptées à vos besoins !</Text>
            <Box alignContent={"center"} display="flex" flexDirection="column" height={"70%"} justifyContent={"center"}>
                <Grid templateRows={"repeat(3, 1fr)"} gap={6} justifyContent={"center"} alignItems={"center"}>
                    <Button
                        as={RouterLink}
                        to="/client/profil/"
                        _hover={{ bg: "#4d648d" }}
                        color="white"
                        bg="#2C3A4F"
                        leftIcon={<CgProfile size={24} />}>
                        Modifier le profil
                    </Button>
                    <Button
                        as={RouterLink}
                        to="/client/nutrition/"
                        _hover={{ bg: "#4d648d" }}
                        color="white"
                        bg="#2C3A4F"
                        leftIcon={<FaBowlFood size={24} />}
                    >
                        Préciser des valeurs nutritionnelles
                    </Button>
                    <Button
                        as={RouterLink}
                        to="/client/recettes/"
                        _hover={{ bg: "#4d648d" }}
                        color="white"
                        bg="#2C3A4F"
                        leftIcon={<FaBowlFood size={24} />}
                    >
                        Obtenir des recettes
                    </Button>
                    <Button
                        as={RouterLink}
                        to="/client/projection/"
                        _hover={{ bg: "#4d648d" }}
                        color="white"
                        bg="#2C3A4F"
                        leftIcon={<VscGraphLine size={24} />}
                    >
                    Obtenir ma projection

                    </Button>
                </Grid>
            </Box>
        </Box >
    )
}


export default function CustomerMainPage() {

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ width: '250px' }}>
                <LeftMenu />
            </div>

            <div style={{ flexGrow: 1 }}>
                <MainPage />
            </div>
        </div>
    )
}