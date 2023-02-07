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


export default function ProductCreate({getOrderTempList,productList,unitList, ...other }) {
  const userData = JSON.parse(localStorage.getItem('userInfo'));
  const decodeData = jwtDecode(userData.token);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  
  // create order temp //
  const [inputProduct, setInputProduct] = useState({});
  const [errors, setErrors] = useState({});
  const inputEventProduct = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setInputProduct((lastValue) => {
      return {
        ...lastValue,
        [name]: value,
      };
    });

  }

  const handleSaveProduct = () => {
    createProduct();
  }

  const createProduct = () => {
    const url = api.createProduct;
    const data =  inputProduct;
    axios
      .post(url, data,{
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((res) => {
        const { data } = res;
        if (data.type === 'success') {
          setInputProduct({});
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

  // create order temp //


  return (
    <Box>
        <Stack sx={{display: "flex",flexDirection:"row",justifyContent:"flex-end",marginBottom:"1rem"}}>
            <Button variant='contained' sx={{width:"20%"}} onClick={handleClick}>สร้างสินค้า</Button>
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
                        id="productCode"
                        label="Product Code"
                        name="productCode"
                        value={inputProduct.productCode}
                        onChange={inputEventProduct}
                        variant="standard"
                        error={Boolean(errors.productCode)}
                        helperText={errors.productCode}
                    />
                </Stack>
                <Stack sx={{display:"flex",flexDirection:"row",justifyContent:"center",marginBottom:"1rem"}}>
                    <TextField
                        sx={{width:"100%"}}
                        id="name"
                        label="Name"
                        name="name"
                        value={inputProduct.name}
                        onChange={inputEventProduct}
                        variant="standard"
                        error={Boolean(errors.name)}
                        helperText={errors.name}
                    />
                </Stack>
                <Stack sx={{display:"flex",flexDirection:"row",justifyContent:"space-evenly",marginBottom:"1rem"}}>
                     <TextField
                        sx={{width:"45%"}}
                        id="price"
                        label="Price"
                        name="price"
                        value={inputProduct.price}
                        onChange={inputEventProduct}
                        variant="standard"
                        error={Boolean(errors.price)}
                        helperText={errors.price}
                    />
                </Stack>
                <Stack sx={{display:"flex",flexDirection:"row",justifyContent:"flex-end",marginBottom:"1rem"}}>
                    <Button 
                        onClick={handleSaveProduct} 
                        variant='contained'
                        sx={{display:"flex"}}>
                            บันทึก
                    </Button>
                </Stack>
                <Divider />
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
