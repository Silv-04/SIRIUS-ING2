import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { READ_CUSTOMERS } from '../../constants/back';
import customersTableHeader from '../../constants/customersTableHeader.json';
import { format } from 'date-fns';
import { TableSortLabel } from '@mui/material';

function formatDate(dateString) {
    return dateString ? format(new Date(dateString), 'dd-MM-yyyy') : 'N/A';
}

// Page used to get values and display them on table with pagination option - CURRENTLY NOT USED
export default function EnhancedTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [customers, setCustomers] = useState([]);
    const [totalElements, setTotalElements] = useState(0);

    const readCustomers = async (page, size) => {
        try {
            const response = await axios.get(`${READ_CUSTOMERS}?page=${page}&size=${size}`);
            const content = Array.isArray(response.data.content) ? response.data.content : [];
            setCustomers(content);
            setTotalElements(response.data.totalElements || 0);
        } catch (error) {
            console.error("Erreur lors de la récupération des clients :", error);
            setCustomers([]);
        }
    };

    useEffect(() => {
        readCustomers(page, rowsPerPage);
    }, [page, rowsPerPage]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const readSortedCustomers = async (page, size, sort) => {
        try {
            const response = await axios.get(`${READ_CUSTOMERS}?page=${page}&size=${size}`);
            const content = Array.isArray(response.data.content) ? response.data.content : [];
            setCustomers(content);
            setTotalElements(response.data.totalElements || 0);
        } catch (error) {
            console.error("Erreur lors de la récupération des clients :", error);
            setCustomers([]);
        }
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {customersTableHeader.map((header) => (
                                    <TableCell 
                                        key={header.value} 
                                        align="left"
                                    >
                                        <TableSortLabel
                                            onClick={(event) => console.log("test")} 
                                            sx={{cursor:'pointer'}}>
                                            {header.label}
                                            
                                        </TableSortLabel>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers.length > 0 ? (
                                customers.map((customer) => (
                                    <TableRow hover key={customer.customer_id}>
                                        {customersTableHeader.map(({ value }) => (
                                            <TableCell key={value} align="left">
                                                {value === 'customer_birthdate' && customer[value]
                                                    ? formatDate(customer[value])
                                                    : customer[value] || 'N/A'}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={customersTableHeader.length} align="center">
                                        Aucun client trouvé .
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={totalElements}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                        backgroundColor: '#404040',
                        color: 'white',
                        font: 'bold',
                    }}
                />
            </Paper>
        </Box>
    );
}
