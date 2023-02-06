import * as React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField,Button } from '@mui/material';

ProductTable.propTypes = {
    products: PropTypes.array.isRequired
  };

export default function ProductTable({products,inputChange, ...other }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ชื่อสินค้า</TableCell>
            <TableCell align="center">ราคาสินค้า&nbsp;(฿)</TableCell>
            <TableCell align="center">ปรับราคาสินค้า&nbsp;(฿)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">
                {product.name}
              </TableCell>
              <TableCell align="center">{product.price}</TableCell>
              <TableCell align="center">
                <TextField 
                    id={product.id}
                    name={product.id}
                    defaultValue={product.price}
                    label="ราคาใหม่"
                    type="number"
                    variant="standard"
                    helperText="เว้นไว้หากไม่ต้องการอัพเดท"
                    onChange={(e) => inputChange(e,product)}/>
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
