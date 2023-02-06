import { useState } from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField,Button,Collapse,Typography } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import OrderClone from './OrderClone';

OrderTable.propTypes = {
    orders: PropTypes.array.isRequired
  };

export default function OrderTable({orders,productList,unitList, ...other }) {
const [open, setOpen] = useState("");

  const handleClick = (value) => {
    if(value !== open){
      setOpen(value);
    } else {
      setOpen("");
    }
  }

  const handleClickEdit = (value) => {
    console.log(value);
  }
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ชื่อผู้ซื้อ</TableCell>
            <TableCell align="center">ที่อยู่จัดส่ง</TableCell>
            <TableCell align="center"> </TableCell>
            <TableCell align="center">สินค้า</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order,key) => (
            <TableRow
              key={order.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">
                {order.customerName}
              </TableCell>
              <TableCell align="center">{order.address}</TableCell>
              <TableCell align="center" ><Button onClick={() => handleClick(order.id)}>{open === order.id ? <ExpandLess /> : <ExpandMore />}</Button></TableCell>
              <TableCell align="center" sx={{ minWidth: 600}}>
              <Typography sx={{display: open === order.id ? "none" : "flex",justifyContent:"center"}}>กดเพื่อแสดงรายละเอียดสินค้า</Typography>
              <Collapse in={open === order.id ? true : !true} timeout="auto" unmountOnExit  sx={{ minWidth: 600,display:"flex",justifyContent:"center" }}>
                <Table  aria-label="simple table">
                    
                
                        <TableHead>
                        <TableRow>
                            <TableCell align="center">ชื่อสินค้า</TableCell>
                            <TableCell align="center">ราคา</TableCell>
                            <TableCell align="center">จำนวน</TableCell>
                            <TableCell align="center">หน่วย</TableCell>
                            <TableCell align="center">ราคาสุทธิ</TableCell>
                        </TableRow>
                        </TableHead>
                        
                        <TableBody>
                        
                        {order.order_product_templates.map((product) => (
                            <TableRow
                            key={product.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell align="center">
                                {product.product.name}
                            </TableCell>
                            <TableCell align="center">{product.product.price}</TableCell>
                            <TableCell align="center">
                                {product.quantity}
                            </TableCell>
                            <TableCell align="center">
                                {product.unit.name}
                            </TableCell>
                            <TableCell align="center">
                                {parseFloat(product.quantity) * parseFloat(product.product.price)}
                            </TableCell>
                            
                            </TableRow>
                        ))}
                       
                        </TableBody>
                        
                    </Table>
                    </Collapse>
                </TableCell>
                <TableCell align="center" sx={{display:"column"}}>
                    <Button onClick={() => handleClickEdit(order)}>เเก้ไข</Button>
                    <OrderClone
                      orderTemp={order}
                      productList={productList} 
                      unitList={unitList} 
                    />
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
