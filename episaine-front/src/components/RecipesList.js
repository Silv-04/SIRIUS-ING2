import {
    Button,
    TextField
} from '@mui/material';
import { Container, Grid } from '@mui/system';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GET_RECIPES_BY_CUSTOMER } from '../constants/back';

export default function RecipesList() {
    const [customer_id, setCustomer_id] = useState('');
    const [numberOfDays, setNumberOfDays] = useState('');
    const [allRecipesList, setAllRecipesList] = useState([]);

    const getRecipes = async () => {
        try {
            const response = await axios.get(GET_RECIPES_BY_CUSTOMER + "/" + customer_id +"?numberOfDays=" + numberOfDays);
            console.log("Recipes fetched");
            setAllRecipesList(response.data);
        } catch (error) {
            console.error("Error while reading data:", error);
        }
    }

    return (
        <Container>
            <div className="input">
                <Grid>
                    <form onSubmit={(e) => { e.preventDefault(); getRecipes(); }} noValidate autoComplete='off'>
                        <TextField
                            fullWidth
                            margin='normal'
                            label='Numéro de client'
                            variant='outlined'
                            value={customer_id}
                            onChange={(e) => setCustomer_id(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            margin='normal'
                            label='Nombre de jours'
                            variant='outlined'
                            value={numberOfDays}
                            onChange={(e) => setNumberOfDays(e.target.value)}
                            type='number'
                        />
                        <Button
                            variant='contained'
                            color='primary'
                            type='submit'
                        >Obtenir les listes de recettes</Button>
                    </form>
                </Grid>
            </div>
        </Container>
    )
}