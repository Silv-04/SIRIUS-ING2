import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { GET_INFORMATIONS_BY_CUSTOMER_ID } from '../../constants/back';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { Select, MenuItem } from '@mui/material';
import { allergyOption } from '../../constants/allergyOption';

export default function InformationsPageInputs() {
    const [id, setId] = useState('');
    const [informations, setInformations] = useState([]);
    const [allergies, setAllergies] = useState([]);
    const location = useLocation();

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setAllergies(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    useEffect(() => {
        if (location.state?.inputValue) {
            setId(location.state.inputValue);
        }
    }, [location.state]);

    useEffect(() => {
        const readInformations = async () => {
            try {
                const response = await axios.get(`${GET_INFORMATIONS_BY_CUSTOMER_ID}/${id}`);
                console.log("Informations fetched", response.data);
                setInformations(response.data);
            } catch (error) {
                console.error("Error while reading data:", error);
            }
        };

        if (id) {
            readInformations();
        }
    }, [id]);

    return (
        <form>
            <TextField
                fullWidth
                margin='normal'
                label="Niveau d'activité"
                value={informations.activity_level}
            />
            <Select
                multiple
                value={allergies}
                onChange={handleChange}
            >
                {allergyOption.map((allergy) => (
                    <MenuItem>{allergy}</MenuItem>
                ))}
            </Select>
        </form>

    );
}