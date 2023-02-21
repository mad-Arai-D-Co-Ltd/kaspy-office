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
// api
import api from '../../../config/services';
// ----------------------------------------------------------------------


export default function OrderHisEditCost({productData, ...other }) {
    const userData = JSON.parse(localStorage.getItem('userInfo'));
    const decodeData = jwtDecode(userData.token);
    const [inputProdTemp, setInputProdTemp] = useState({});
    const [errors, setErrors] = useState({});
    

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
        const data = productData;
        setInputProdTemp(data);
    };
    const handleClose = () => {
        setOpen(!open);
        // window.location.reload();
    };

    const inputEventProdTemp = (key,event,data) => {
        const name = event.target.name;
        const value = event.target.value;

        if (name === "quantity") {
            setInputProdTemp((lastValue) => {
                return {
                    ...lastValue,
                    [key]:{
                        id:data.id,
                        productName:data.productName,
                        price:data.price,
                        unit:data.unit,
                        quantity:value,
                        costPrice:data.costPrice,
                    }
                };
            });
        }

        if(name === "costPrice"){
            setInputProdTemp((lastValue) => {
                return {
                    ...lastValue,
                    [key]:{
                        id:data.id,
                        productName:data.productName,
                        price:data.price,
                        unit:data.unit,
                        costPrice:value,
                        quantity:data.quantity,
                    }
                };
            });
        }

        

    }

    const updateOrderProdHis = () => {
        const url = api.updateCostPrice;
        axios
        .post(url, inputProdTemp,{
            headers: {
            Authorization: `Bearer ${userData.token}`,
            },
        })
        .then((res) => {
            const { data } = res;
            if (data.type === 'success') {
            setOpen(false);
            window.location.reload();
            } else {
            errors.result = 'พบข้อผิดพลาด กรุณาติดต่อผู้ดูแลระบบ';
            setErrors(errors);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const handleSaveUpdate = () => {
        updateOrderProdHis();
    }

    return (
        <Box>
            <Stack sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", marginBottom: "1rem" }}>
                <Button variant='outlined' sx={{ width: "20%" }} onClick={handleClick} >แก้ไข</Button>
            </Stack>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 800 }}>
                    <Box sx={{ display: "column", marginBottom: "1rem" }}>
                        <Box sx={{ height: '35vh', overflowY: 'auto' }}>
                            {
                                Object.values(inputProdTemp).map((element, key) => (
                                    
                                    <Box key={key} sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
                                        <Stack sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                        <TextField
                                                sx={{ width: "25%" }}
                                                id="productName"
                                                name="productName"
                                                label="Product Name"
                                                defaultValue={element.productName}
                                                error={Boolean(errors.productName)}
                                                helperText={errors.productName}
                                                disabled
                                            />
                                            <TextField
                                                sx={{ width: "25%" }}
                                                id="costPrice"
                                                name="costPrice"
                                                label="Cost Price"
                                                defaultValue={element.costPrice}
                                                onChange={(event) => inputEventProdTemp(key, event,element)}
                                                error={Boolean(errors.costPrice)}
                                                helperText={errors.costPrice}
                                            />
                                            <TextField
                                                sx={{ width: "25%" }}
                                                id="quantity"
                                                name="quantity"
                                                label="Quantity"
                                                defaultValue={element.quantity}
                                                error={Boolean(errors.quantity)}
                                                helperText={errors.quantity}
                                            />

                                            <TextField
                                                sx={{ width: "25%" }}
                                                id="unit"
                                                name="unit"
                                                label="Unit Name"
                                                defaultValue={element.unit.name}
                                                error={Boolean(errors.unit)}
                                                helperText={errors.unit}
                                                disabled
                                            />
                                        </Stack>
                                    </Box>
                                    
                                ))
                            }
                        </Box>
                        <Stack sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            
                            <Button
                                variant='contained'
                                onClick={handleSaveUpdate}
                                sx={{ width: "30%" }}
                                >
                                บันทึกสินค้า
                            </Button>
                        </Stack>

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
