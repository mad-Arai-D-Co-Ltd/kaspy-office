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

WeeklyProdTable.propTypes = {
    products: PropTypes.array.isRequired
  };

export default function WeeklyProdTable({products,refPropWithAnotherName, ...other }) {
    console.log(products);
  return (
    <TableContainer component={Paper} ref={refPropWithAnotherName}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">ชื่อสินค้า</TableCell>
            <TableCell align="center">ราคาขายสินค้า&nbsp;(฿)</TableCell>
            <TableCell align="center">จำนวนสินค้า</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow
              key={product.product.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">
                {product.product.name}
              </TableCell>
              <TableCell align="center">{product.product.price}</TableCell>
              <TableCell align="center">
                {product.total}
            </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
