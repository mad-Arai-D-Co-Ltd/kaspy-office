import axios from 'axios';
import { useState, useEffect } from 'react';
import jwtDecode from "jwt-decode";
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Modal, TextField, Button, Collapse, Typography, Stack, Divider, Autocomplete } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
// ----------------------------------------------------------------------


export default function OrderHisDelete({orderId,showPopupConfirmDelete,handleDeletePopup,handleDeleteOrderHistory, ...other }) {

    return (
        <Box>
            <Stack sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", marginBottom: "1rem" }}>
                <Button variant='outlined' sx={{ width: "20%" }} color="error" onClick={() => handleDeletePopup(orderId)} >ลบ</Button>
            </Stack>

            <Modal
            open={showPopupConfirmDelete}
            onClose={() => handleDeletePopup("")}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 400, height: '15vh', overflowY: 'auto' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '10px' ,justifyContent : 'center'}}>
                    <Typography
                    variant='h6'
                    sx={{alignSelf:"center"}}
                    >
                        Confirm delete order history
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '10px',justifyContent : 'space-evenly' }}>
                        <Button onClick={() => handleDeletePopup("")} >Back</Button>
                        <Button color="error" onClick={handleDeleteOrderHistory}>Delete</Button>
                    </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};
