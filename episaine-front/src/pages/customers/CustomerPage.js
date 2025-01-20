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
import { styled } from '@mui/material/styles';
import { TableSortLabel } from '@mui/material';

function formatDate(dateString) {
    return dateString ? format(new Date(dateString), 'dd-MM-yyyy') : 'N/A';
}

export default function EnhancedTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [customers, setCustomers] = useState([]);
    const [totalElements, setTotalElements] = useState(0);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#404040',
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: '#d3d3d3',
        },
        '&:nth-of-type(even)': {
            backgroundColor: '#a9a9a9',
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const StyledTableContainer = styled(TableContainer)({
        maxHeight: 440,
        '&::-webkit-scrollbar': {
            width: '8px',
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#525252',
            borderRadius: '10px',
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: '#949494',
        },
    });

    const StyledTablePagination = styled(TablePagination)(({ theme }) => ({
        '& .MuiTablePagination-select': {
            backgroundColor: '#333',
            color: 'white',
        },
        '& .MuiTablePagination-selectIcon': {
            color: 'white',
        },
        '& .MuiTablePagination-actions button': {
            color: 'white',
        },
        '& .MuiTablePagination-root': {
            backgroundColor: '#444',
        },
    }));

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
                <StyledTableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <StyledTableRow>
                                {customersTableHeader.map((header) => (
                                    <StyledTableCell 
                                        key={header.value} 
                                        align="left"
                                    >
                                        <TableSortLabel
                                            onClick={(event) => console.log("test")} 
                                            sx={{cursor:'pointer'}}>
                                            {header.label}
                                            
                                        </TableSortLabel>
                                    </StyledTableCell>
                                ))}
                            </StyledTableRow>
                        </TableHead>
                        <TableBody>
                            {customers.length > 0 ? (
                                customers.map((customer) => (
                                    <StyledTableRow hover key={customer.customer_id}>
                                        {customersTableHeader.map(({ value }) => (
                                            <StyledTableCell key={value} align="left">
                                                {value === 'customer_birthdate' && customer[value]
                                                    ? formatDate(customer[value])
                                                    : customer[value] || 'N/A'}
                                            </StyledTableCell>
                                        ))}
                                    </StyledTableRow>
                                ))
                            ) : (
                                <StyledTableRow>
                                    <StyledTableCell colSpan={customersTableHeader.length} align="center">
                                        Aucun client trouvé .
                                    </StyledTableCell>
                                </StyledTableRow>
                            )}
                        </TableBody>
                    </Table>
                </StyledTableContainer>
                <StyledTablePagination
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
