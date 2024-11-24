import React, { useState, useEffect } from "react";
import axios from "axios";
import { READ_CUSTOMERS, UPDATE_CUSTOMER, DELETE_CUSTOMER } from "../../constants/back";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import "../../styles/customers.css";

export default function RUDCustomers() {
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedField, setSelectedField] = useState("");
    const [newValue, setNewValue] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    console.log('Environnement actuel:', READ_CUSTOMERS, UPDATE_CUSTOMER, DELETE_CUSTOMER, process.env.REACT_APP_ENV);
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

    const readCustomers = async () => {
        try {
            const response = await axios.get(READ_CUSTOMERS);
            console.log("Customers fetched");
            setCustomers(response.data);
        } catch (error) {
            console.error("Error while reading data:", error);
        }
    };

    const handleCellClick = (customer, field) => {
        setSelectedCustomer(customer);
        setSelectedField(field);
        setNewValue(customer[field]);
        setIsDialogOpen(true);
    };

    const handleClose = () => {
        setIsDialogOpen(false);
    };

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

    const confirmDelete = (customerId) => {
        if (window.confirm("Are you sure you want to delete this customer?")) {
            handleDelete(customerId);
        }
    };

    const handleDelete = async (customerId) => {
        await axios.delete(DELETE_CUSTOMER +'/'+ customerId).then((response) => {
            console.log("Customer deleted");
            readCustomers();
        }).catch(error => {
            console.error("Error while deleting customer:", error);
        });
    };

    useEffect(() => {
        readCustomers();
    }, []);

    if (customers.length === 0) {
        return (<div>No customers, poor business</div>);
    }

    return (
        <div className="container">
            <h1 className="title">Customers list</h1>
            <div className="row">
                <table className="custom-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Last name</th>
                            <th>First name</th>
                            <th>Birth date</th>
                            <th>Gender</th>
                            <th>Phone number</th>
                            <th>Email</th>
                            <th>City</th>
                            <th>Address</th>
                            <th>Postal Code</th>
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
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Dialog open={isDialogOpen} onClose={handleClose}>
                <DialogTitle>Update {fieldLabels[selectedField]}</DialogTitle>
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
