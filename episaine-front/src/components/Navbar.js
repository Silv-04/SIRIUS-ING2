<<<<<<< HEAD
import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import InsertCustomers from './customers/CreateCustomers';
import CustomerPage from './customers/CustomerPage';
import RecipesList from './RecipesList';

export default function LabTabs() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
=======
// src/components/Navbar.js
import React from 'react';
>>>>>>> main

const Navbar = () => {
    return (
<<<<<<< HEAD
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Insertion" value="1" />
                        <Tab label="Affichage" value="2" />
                        <Tab label="Recettes" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1"><InsertCustomers /></TabPanel>
                <TabPanel value="2"><CustomerPage /></TabPanel>
                <TabPanel value="3"><RecipesList /></TabPanel>
            </TabContext>
        </Box>
=======
        <nav className="navbar-gradient">
            <div>
                <h1>MonSite</h1>
            </div>
            <div>
                <a href="#accueil">Accueil</a>
                <a href="#services">Services</a>
                <a href="#contact">Contact</a>
            </div>
        </nav>
>>>>>>> main
    );
};

export default Navbar;
