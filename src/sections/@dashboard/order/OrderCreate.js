import axios from 'axios';
import { useState } from 'react';
import jwtDecode from "jwt-decode";
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box,Modal,TextField,Button,Collapse,Typography, Stack,Divider,Autocomplete } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
// api
import api from '../../../config/services';
// ----------------------------------------------------------------------


export default function OrderCreate({getOrderTempList,productList,unitList, ...other }) {
  const userData = JSON.parse(localStorage.getItem('userInfo'));
  const decodeData = jwtDecode(userData.token);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  
  // create order temp //
  const [inputOrderTemp, setInputOrderTemp] = useState({});
  const [returnOrderTempData, setReturnOrderTempData] = useState({});
  const [errors, setErrors] = useState({});
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

  const handleSaveOrderTemp = () => {
    createOrderTemp();
  }

  const createOrderTemp = () => {
    const url = api.createOrderTemp;
    const data =  inputOrderTemp;
    axios
      .post(url, data,{
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((res) => {
        const { data } = res;
        if (data.type === 'success') {
          setReturnOrderTempData(data.data);
          setInputOrderTemp({});
        } else {
          errors.result = 'พบข้อผิดพลาด กรุณาติดต่อผู้ดูแลระบบ';
          setErrors(errors);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // create order temp //

  // create order product temp //
  const [inputOrderProdTemp, setInputOrderProdTemp] = useState([]);
  const handleAddNewProd = () => {
    
    setInputOrderProdTemp((lastValue) => {
      return [
        ...lastValue,
        {
          orderTempId : returnOrderTempData.id.toString(),
          productId : null,
          quantity : 0,
          unitId : null,
        }
      ];
    });

}
const [prodIdValue, setProdIdValue] = useState(null);
const [quantityValue, setQuantityValue] = useState(0);
const [unitIdValue, setUnitIdValue] = useState(null);
  const inputEventOrderProdTemp = (key,value,name) => {
    // const name = event.target.name;
    
    
    if(name === "productId"){
      inputOrderProdTemp[key].productId = value.id;
    }

    if(name === "quantity"){
      const values = value.target.value;
      inputOrderProdTemp[key].quantity = values;
    }

    if(name === "unitId"){
      inputOrderProdTemp[key].unitId = value.id;
    }

  }

  const handleSaveProdTempList = () => {
    // console.log(inputOrderProdTemp);
    createOrderProdTempList();
  }

  const createOrderProdTempList = () => {
    const url = api.createOrderTempProdList;
    const data =  inputOrderProdTemp;
    axios
      .post(url, data,{
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((res) => {
        const { data } = res;
        if (data.type === 'success') {
          setInputOrderProdTemp([]);
          getOrderTempList();
          handleClick();
        } else {
          errors.result = 'พบข้อผิดพลาด กรุณาติดต่อผู้ดูแลระบบ';
          setErrors(errors);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // create order product temp //

  return (
    <Box>
        <Stack sx={{display: "flex",flexDirection:"row",justifyContent:"flex-end",marginBottom:"1rem"}}>
            <Button variant='contained' sx={{width:"20%"}} onClick={handleClick}>สร้างเทมเพลท</Button>
        </Stack>
        
        <Modal
            // hideBackdrop
            open={open}
            onClose={handleClick}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box sx={{ ...style, width: 800 }}>
                <Box sx={{display:"column",marginBottom:"1rem"}}>
                <Stack sx={{display:"flex",flexDirection:"row",justifyContent:"center",marginBottom:"1rem"}}>
                    <TextField
                        sx={{width:"100%"}}
                        id="customerName"
                        label="Customer Name"
                        name="customerName"
                        value={inputOrderTemp.customerName}
                        onChange={inputEventOrderTemp}
                        variant="standard"
                        error={Boolean(errors.customerName)}
                        helperText={errors.customerName}
                        disabled={Object.values(returnOrderTempData).length > 0 ? true : !true}
                    />
                </Stack>
                <Stack sx={{display:"flex",flexDirection:"row",justifyContent:"center",marginBottom:"1rem"}}>
                    <TextField
                        sx={{width:"100%"}}
                        id="address"
                        label="Address"
                        name="address"
                        value={inputOrderTemp.address}
                        onChange={inputEventOrderTemp}
                        variant="standard"
                        error={Boolean(errors.address)}
                        helperText={errors.address}
                        disabled={Object.values(returnOrderTempData).length > 0 ? true : !true}
                    />
                </Stack>
                <Stack sx={{display:"flex",flexDirection:"row",justifyContent:"space-evenly",marginBottom:"1rem"}}>
                     <TextField
                        sx={{width:"45%"}}
                        id="taxId"
                        label="Tax Id"
                        name="taxId"
                        value={inputOrderTemp.taxId}
                        onChange={inputEventOrderTemp}
                        variant="standard"
                        error={Boolean(errors.taxId)}
                        helperText={errors.taxId}
                        disabled={Object.values(returnOrderTempData).length > 0 ? true : !true}
                    />
                    <TextField
                        sx={{width:"45%"}}
                        id="attention"
                        label="Attention"
                        name="attention"
                        value={inputOrderTemp.attention}
                        onChange={inputEventOrderTemp}
                        variant="standard"
                        error={Boolean(errors.attention)}
                        helperText={errors.attention}
                        disabled={Object.values(returnOrderTempData).length > 0 ? true : !true}
                    />
                </Stack>
                <Stack sx={{display:"flex",flexDirection:"row",justifyContent:"space-evenly",marginBottom:"1rem"}}>
                    <TextField
                        sx={{width:"45%"}}
                        id="email"
                        label="Email"
                        name="email"
                        value={inputOrderTemp.email}
                        onChange={inputEventOrderTemp}
                        variant="standard"
                        error={Boolean(errors.email)}
                        helperText={errors.email}
                        disabled={Object.values(returnOrderTempData).length > 0 ? true : !true}
                    />
                    <TextField
                        sx={{width:"45%"}}
                        id="tel"
                        label="Tel."
                        name="tel"
                        value={inputOrderTemp.tel}
                        onChange={inputEventOrderTemp}
                        variant="standard"
                        error={Boolean(errors.tel)}
                        helperText={errors.tel}
                        disabled={Object.values(returnOrderTempData).length > 0 ? true : !true}
                    />
                </Stack>
                <Stack sx={{display:"flex",flexDirection:"row",justifyContent:"flex-end",marginBottom:"1rem"}}>
                    <Button 
                        onClick={handleSaveOrderTemp} 
                        variant='contained'
                        sx={{display:Object.values(returnOrderTempData).length > 0 ?  "none":"flex"}}>
                            บันทึก
                    </Button>
                </Stack>
                <Divider />
                </Box>
                <Box sx={{display:"column",marginBottom:"1rem"}}>

                    {
                        inputOrderProdTemp.map((element,key) => (
                            <Box key={key} sx={{marginBottom:"1rem"}}>
                                <Stack sx={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                                <Autocomplete
                                    disablePortal
                                    id="productId"
                                    name="productId"
                                    // value={inputOrderProdTemp[key].productId}
                                    getOptionLabel={(option) => option.name}
                                    options={productList}
                                    sx={{ width: "30%" }}
                                    onChange={(event,newValue) => inputEventOrderProdTemp(key,newValue,"productId")}
                                    renderInput={(params) => <TextField {...params} label="Product" />}
                                />
                                <TextField
                                    sx={{width:"20%"}}
                                    id="quantity"
                                    name="quantity"
                                    defaultValue={inputOrderProdTemp[key].quantity}
                                    // value={element.quantity}
                                    onChange={(event) => inputEventOrderProdTemp(key,event,"quantity")}
                                    error={Boolean(errors.quantity)}
                                    helperText={errors.quantity}
                                />
                                <Autocomplete
                                    disablePortal
                                    id="unitId"
                                    name="unitId"
                                    // value={inputOrderProdTemp[key].unitId}
                                    getOptionLabel={(option) => option.name}
                                    options={unitList}
                                    sx={{ width: "30%" }}
                                    onChange={(event,newValue) => inputEventOrderProdTemp(key,newValue,"unitId")}
                                    renderInput={(params) => <TextField {...params} label="Units" />}
                                />
                                </Stack>
                            </Box>
                        ))
                    }
                    <Stack sx={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                        <Button 
                            variant='outlined' 
                            fullWidth={inputOrderProdTemp.length > 0 ? 'false':'true'} 
                            onClick={handleAddNewProd} 
                            sx={{display:Object.values(returnOrderTempData).length > 0 ?  "flex":"none",width:"45%"}}>
                                เพิ่มสินค้า
                        </Button>
                        <Button 
                            variant='contained' 
                            onClick={handleSaveProdTempList}
                            sx={{display:inputOrderProdTemp.length > 0 ?  "flex":"none",width:"45%"}}>
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
