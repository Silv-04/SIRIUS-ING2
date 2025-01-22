import React, { useState, useEffect } from "react";
import axios from "axios";
import { READ_CUSTOMERS, UPDATE_CUSTOMER, DELETE_CUSTOMER } from "../../constants/back";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import "../../styles/customers.css";
import { Box, Grid } from "@mui/system";
import LeftMenu from "../../components/customers/LeftMenu"

// CURRENTLY NOT USED
function RUDCustomers() {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedField, setSelectedField] = useState("");
    const [newValue, setNewValue] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    const fieldLabels = {
        customer_lastname: "last name",
        customer_firstname: "first name",
        customer_birthdate: "birth date",
        gender: "gender",
        customer_phone_number: "phone number",
        customer_mail: "email",
        city: "city",
        address: "address",
        postal_code: "postal code",
    };

    // get customers value from back server
    const readCustomers = async () => {
        try {
            const response = await axios.get(READ_CUSTOMERS);
            console.log("Customers fetched");
            setCustomers(response.data);
        } catch (error) {
            console.error("Error while reading data:", error);
        }
    };

    // handle the action of clicking in a cell of the table
    const handleCellClick = (customer, field) => {
        setSelectedCustomer(customer);
        setSelectedField(field);
        setNewValue(customer[field]);
        setIsDialogOpen(true);
    };

    // handle the action of closing the dialog panel
    const handleClose = () => {
        setIsDialogOpen(false);
    };

    // handle the action of updating a value 
    const handleSave = async () => {
        const updatedCustomer = { ...selectedCustomer, [selectedField]: newValue };
        axios.post(UPDATE_CUSTOMER, updatedCustomer).then((response) => {
            console.log("Customer updated");
            readCustomers();
        }).catch (error =>{
            console.error("Error while updating data:" + error);
        });
        handleClose();
    };

    // confirmation for the deletion of a value in the table
    const confirmDelete = (customerId) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            handleDelete(customerId);
        }
    };

    // handle the deletion of a value in the table
    const handleDelete = async (customerId) => {
        await axios.delete(DELETE_CUSTOMER +'/'+ customerId).then((response) => {
            console.log("Customer deleted");
            readCustomers();
        }).catch(error => {
            console.error("Error while deleting customer:", error);
        });
    };

    // read all customers value once the page is opened
    useEffect(() => {
        readCustomers();
    }, []);

    if (customers.length === 0) {
        return (<div>Pas de client</div>);
    }

    return (
        <div className="container">
            <h1 className="title">Liste des clients</h1>
            <div className="row">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nom de famille</th>
                            <th>Prénom</th>
                            <th>Date de naissance</th>
                            <th>Genre</th>
                            <th>Numéro de téléphone</th>
                            <th>Email</th>
                            <th>Ville</th>
                            <th>Adresse</th>
                            <th>Code postal</th>
                            <th>Supprimer</th>
                        </tr>
                    </thead>
                    <tbody>
                    {customers.map((customer) => (
                            <tr key={customer.customer_id}>
                                {Object.keys(customer).map((field, index) => {
                                    if (field === 'customer_id') {
                                        return (
                                            <td key={field}>
                                                {customer[field]}
                                            </td>
                                        );
                                    }
                                    if (field !== 'customer_id') {
                                        return (
                                            <td
                                                key={field}
                                                style={{ cursor: "pointer" }}
                                                onClick={() => handleCellClick(customer, field)}
                                            >
                                                {customer[field]}
                                            </td>
                                        );
                                    }
                                    return null;
                                })}
                                <td>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => confirmDelete(customer.customer_id)}
                                    >
                                        Supprimer
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Dialog open={isDialogOpen} onClose={handleClose}>
                <DialogTitle>Modifier {fieldLabels[selectedField]}</DialogTitle>
                <DialogContent>
                    <TextField
                        label={`New value for ${fieldLabels[selectedField]}`}
                        value={newValue}
                        onChange={(e) => setNewValue(e.target.value)}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Annuler
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Valider
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default function RUDCustomersPage() {
    return (
        <Box sx={{ display: "flex", height: "100vh" }}>
            <Grid sx={{ width: 250 }}>
                <LeftMenu />
            </Grid>

            <Grid sx={{ flexGrow: 1 }}>
                <RUDCustomers />
            </Grid>
        </Box>
    )
}