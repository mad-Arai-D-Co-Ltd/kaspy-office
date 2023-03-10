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


export default function OrderEdit({ orderTemp, productList, unitList, ...other }) {
    const userData = JSON.parse(localStorage.getItem('userInfo'));
    const decodeData = jwtDecode(userData.token);
    const [inputOrderTemp, setInputOrderTemp] = useState({ order_product_templates: [] });
    const [errors, setErrors] = useState({});
    
    const convertArrayToObject = (array, key) => {
        const initialValue = {};
        return array.reduce((obj, item) => {
          return {
            ...obj,
            [item[key]]: item,
          };
        }, initialValue);
      };

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
        setInputOrderTemp(orderTemp);
        const data = convertArrayToObject(orderTemp.order_product_templates,'id');
        setInputOrderProdTemp(data);
    };
    const handleClose = () => {
        setOpen(!open);
        // window.location.reload();
    };

    const inputEventOrderTemp = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setInputOrderTemp((lastValue) => {
            return {
                ...lastValue,
                [name]: value,
            };
        });

    }

    const [inputOrderProdTemp, setInputOrderProdTemp] = useState({});

    const handleAddNewProd = (key) => {
        setCheckUpdate(false);
        setInputOrderProdTemp((lastValue) => {
            return {
                ...lastValue,
                [key+1]:{
                    id:key+1,
                    orderTempId: inputOrderProdTemp.id,
                    productId: null,
                    product: {},
                    quantity: 0,
                    unitId: null,
                }
            };
        });

    }

    const inputEventOrderNewProdTemp = (key, value, name) => {
        setCheckUpdate(false);
        let data;
        if (name === "productId") {
            data = value.id;
            setInputOrderProdTemp((lastValue) => {
                return {
                    ...lastValue,
                    [key]:{
                        id:inputOrderProdTemp[key].id,
                        orderTempId: inputOrderTemp.id,
                        productId: data,
                        quantity: inputOrderProdTemp[key].quantity,
                        unitId: inputOrderProdTemp[key].unitId,
                    }
                };
            });
        }

        if (name === "quantity") {
            data = value.target.value;
            console.log(data);
            setInputOrderProdTemp((lastValue) => {
                return {
                    ...lastValue,
                    [key]:{
                        id:inputOrderProdTemp[key].id,
                        orderTempId: inputOrderTemp.id,
                        productId: inputOrderProdTemp[key].productId,
                        quantity: data,
                        unitId: inputOrderProdTemp[key].unitId,
                    }
                };
            });
        }

        if (name === "unitId") {
            data = value.id;
            setInputOrderProdTemp((lastValue) => {
                return {
                    ...lastValue,
                    [key]:{
                        id:inputOrderProdTemp[key].id,
                        orderTempId: inputOrderTemp.id,
                        productId: inputOrderProdTemp[key].productId,
                        quantity: inputOrderProdTemp[key].quantity,
                        unitId: data,
                    }
                };
            });
        }

    }

    const [checkUpdate,setCheckUpdate] = useState(true);
    const handleUpdateProd = () => {
        setInputOrderTemp((lastValue) => {
            return {
                ...lastValue,
                'order_product_templates': inputOrderProdTemp,
                'deleteId' : deleteId,
            };
        });
        setCheckUpdate(true);
    }

    const updateOrderTemp = (id) => {
        const url = api.updateOrderTemp+id;
        axios
        .put(url, inputOrderTemp,{
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
            errors.result = '???????????????????????????????????? ??????????????????????????????????????????????????????????????????';
            setErrors(errors);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    const handleSaveUpdate = (id) => {
        updateOrderTemp(id);
    }
    const [deleteId,setDeleteId] = useState([]);
    const deleteProd = async(index) => {
        setCheckUpdate(false);
        await delete inputOrderProdTemp[index];
        await setInputOrderTemp((lastValue) => {
            return {
                ...lastValue,
                'order_product_templates': inputOrderProdTemp,
            };
        });
        await setDeleteId((lastValue) => {
            return [
                ...lastValue,
                {'id':index}
            ];
        });
        setOpen(false);
        await setInputOrderProdTemp(inputOrderProdTemp);
        
        setOpen(true);
    }


    return (
        <Box>
            <Stack sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", marginBottom: "1rem" }}>
                <Button variant='outlined' sx={{ width: "20%" }} onClick={handleClick} >???????????????</Button>
            </Stack>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style, width: 800 }}>
                    <Box sx={{ display: "column", marginBottom: "1rem" }}>
                        <Stack sx={{ display: "flex", flexDirection: "row", justifyContent: "center", marginBottom: "1rem" }}>
                            <TextField
                                sx={{ width: "100%" }}
                                id="customerName"
                                label="Customer Name"
                                name="customerName"
                                value={inputOrderTemp.customerName}
                                onChange={inputEventOrderTemp}
                                variant="standard"
                                error={Boolean(errors.customerName)}
                                helperText={errors.customerName}
                            />
                        </Stack>
                        <Stack sx={{ display: "flex", flexDirection: "row", justifyContent: "center", marginBottom: "1rem" }}>
                            <TextField
                                sx={{ width: "100%" }}
                                id="address"
                                label="Address"
                                name="address"
                                value={inputOrderTemp.address}
                                onChange={inputEventOrderTemp}
                                variant="standard"
                                error={Boolean(errors.address)}
                                helperText={errors.address}
                            />
                        </Stack>
                        <Stack sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginBottom: "1rem" }}>
                            <TextField
                                sx={{ width: "45%" }}
                                id="taxId"
                                label="Tax Id"
                                name="taxId"
                                value={inputOrderTemp.taxId}
                                onChange={inputEventOrderTemp}
                                variant="standard"
                                error={Boolean(errors.taxId)}
                                helperText={errors.taxId}
                            />
                            <TextField
                                sx={{ width: "45%" }}
                                id="attention"
                                label="Attention"
                                name="attention"
                                value={inputOrderTemp.attention}
                                onChange={inputEventOrderTemp}
                                variant="standard"
                                error={Boolean(errors.attention)}
                                helperText={errors.attention}
                            />
                        </Stack>
                        <Stack sx={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", marginBottom: "1rem" }}>
                            <TextField
                                sx={{ width: "45%" }}
                                id="email"
                                label="Email"
                                name="email"
                                value={inputOrderTemp.email}
                                onChange={inputEventOrderTemp}
                                variant="standard"
                                error={Boolean(errors.email)}
                                helperText={errors.email}
                            />
                            <TextField
                                sx={{ width: "45%" }}
                                id="tel"
                                label="Tel."
                                name="tel"
                                value={inputOrderTemp.tel}
                                onChange={inputEventOrderTemp}
                                variant="standard"
                                error={Boolean(errors.tel)}
                                helperText={errors.tel}
                            />
                        </Stack>
                        <Divider />
                    </Box>
                    <Box sx={{ display: "column", marginBottom: "1rem" }}>
                        <Box sx={{ height: '35vh', overflowY: 'auto' }}>
                            {
                                Object.values(inputOrderProdTemp).map((element, key) => (
                                    
                                    <Box key={key} sx={{ marginTop: "1rem", marginBottom: "1rem" }}>
                                        <Stack sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                                            <Autocomplete
                                                disablePortal
                                                id="productId"
                                                name="productId"
                                                getOptionLabel={(option) => option.name}
                                                defaultValue={element.product}
                                                options={productList}
                                                sx={{ width: "30%" }}
                                                onChange={(event, newValue) => inputEventOrderNewProdTemp(element.id, newValue, "productId")}
                                                renderInput={(params) => <TextField {...params} label="Product" />}
                                            />
                                            <TextField
                                                sx={{ width: "10%" }}
                                                id="quantity"
                                                name="quantity"
                                                label="quantity"
                                                defaultValue={element.quantity}
                                                onChange={(event) => inputEventOrderNewProdTemp(element.id, event, "quantity")}
                                                error={Boolean(errors.quantity)}
                                                helperText={errors.quantity}
                                            />

                                            <Autocomplete
                                                disablePortal
                                                id="unitId"
                                                name="unitId"
                                                getOptionLabel={(option) => option.name}
                                                defaultValue={element.unit}
                                                options={unitList}
                                                sx={{ width: "30%" }}
                                                onChange={(event, newValue) => inputEventOrderNewProdTemp(element.id, newValue, "unitId")}
                                                renderInput={(params) => <TextField {...params} label="Units" />}
                                            />
                                            <Button onClick={() => deleteProd(element.id)}>??????</Button>
                                        </Stack>
                                    </Box>
                                    
                                ))
                            }
                        </Box>
                        <Stack sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <Button
                                variant='outlined'
                                fullWidth={Object.values(inputOrderProdTemp).length > 0 ? 'false' : 'true'}
                                onClick={() => handleAddNewProd(inputOrderProdTemp[Object.keys(inputOrderProdTemp)[Object.keys(inputOrderProdTemp).length - 1]].id)}
                                sx={{ width: "30%" }}>
                                ?????????????????????????????????
                            </Button>

                            
                            <Button
                                variant='contained'
                                color='error'
                                onClick={handleUpdateProd}
                                sx={{ display: Object.values(inputOrderProdTemp).length > 0 ? "flex" : "none", width: "30%" }}
                                disabled={checkUpdate ? true : !true}>
                                ????????????????????????????????????
                            </Button>
                            <Button
                                variant='contained'
                                onClick={() => handleSaveUpdate(inputOrderTemp.id)}
                                sx={{ display: Object.values(inputOrderProdTemp).length > 0 ? "flex" : "none", width: "30%" }}
                                disabled={!checkUpdate ? true : !true}>
                                ????????????????????????????????????
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
