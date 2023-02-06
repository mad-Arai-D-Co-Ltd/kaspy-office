import { useState } from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ReactToPrint from "react-to-print";
import THBText from 'thai-baht-text' ;
import { Box,Modal,TextField,Button,Collapse,Typography, Stack,Divider,Autocomplete } from '@mui/material';
import ContentFooter from "./ContentFooter";
import Footer from './Footer';
// utils
import { fNumber,fCurrency } from '../../../../utils/formatNumber';

Content.propTypes = {
    orders: PropTypes.array.isRequired
  };

export default function Content({orders, ...other }) {
    const pageHalf = [14,28,43,58,72]
    const pageBreak = [28,57,86,115,144]
    const prodLength = orders.order_product_historys.length;
    const page = parseFloat((parseFloat(prodLength / 29) - Math.floor(prodLength / 29)).toFixed(2));
    const maxPage = page > 0.5 ? Math.ceil(prodLength / 29)+1 : Math.ceil(prodLength / 29);
  return (
    <Box sx={{marginTop:"317px"}}>
            {orders.order_product_historys.map((prod,key) => {
                return <Stack key={key} sx={{display:"flex",flexDirection:"row",
                pageBreakAfter:key === pageBreak[0] || key === pageBreak[1] || key === pageBreak[2] || key === pageBreak[3] || key === pageBreak[4]  ? "always" : "avoid",
                marginTop:key === pageBreak[0]+1 || key === pageBreak[1]+1 || key === pageBreak[2]+1 || key === pageBreak[3]+1 || key === pageBreak[4]+1 ? "317px" : "0px",}}>
                    
                    <Stack sx={{display:"flex",flexDirection:"column",width:"10%" ,padding:"5px" ,border:"solid",
                    borderWidth: key === prodLength-1 || key === pageBreak[0] || key === pageBreak[1] || key === pageBreak[2] || key === pageBreak[3] || key === pageBreak[4] ? "0px 0px 1px 1px" : "0px 0px 0px 1px"  }}>
                        <Typography variant='body1' fontSize={10} textAlign={"center"}>{prod.productCode === ""? "-":prod.productCode}</Typography>
                    </Stack>
                    <Stack sx={{display:"flex",flexDirection:"column",width:"43%" ,padding:"5px",border:"solid",
                    borderWidth: key === prodLength-1 || key === pageBreak[0] || key === pageBreak[1] || key === pageBreak[2] || key === pageBreak[3] || key === pageBreak[4] ? "0px 1px 1px 1px" : "0px 1px 0px 1px" }}>
                        <Typography variant='body1' fontSize={10} textAlign={"start"}>{prod.productName === ""? "-":prod.productName}</Typography>
                    </Stack>
                    <Stack sx={{display:"flex",flexDirection:"column",width:"10%" ,padding:"5px" ,border:"solid",
                    borderWidth: key === prodLength-1 || key === pageBreak[0] || key === pageBreak[1] || key === pageBreak[2] || key === pageBreak[3] || key === pageBreak[4]  ? "0px 1px 1px 0px" : "0px 1px 0px 0px" }}>
                        <Typography variant='body1' fontSize={10} textAlign={"end"}>{fNumber(prod.quantity)}</Typography>
                    </Stack>
                    <Stack sx={{display:"flex",flexDirection:"column",width:"7%" ,padding:"5px" ,border:"solid",
                    borderWidth: key === prodLength-1 || key === pageBreak[0] || key === pageBreak[1] || key === pageBreak[2] || key === pageBreak[3] || key === pageBreak[4]  ? "0px 1px 1px 0px" : "0px 1px 0px 0px" }}>
                        <Typography variant='body1' fontSize={10} textAlign={"center"}>{prod.unit.name}</Typography>
                    </Stack>
                    <Stack sx={{display:"flex",flexDirection:"column",width:"15%" ,padding:"5px" ,border:"solid",
                    borderWidth: key === prodLength-1 || key === pageBreak[0] || key === pageBreak[1] || key === pageBreak[2] || key === pageBreak[3] || key === pageBreak[4]  ? "0px 1px 1px 0px" : "0px 1px 0px 0px" }}>
                        <Typography variant='body1' fontSize={10} textAlign={"end"}>{fNumber(prod.price)}</Typography>
                    </Stack>
                    <Stack sx={{display:"flex",flexDirection:"column",width:"15%" ,padding:"5px" ,border:"solid",
                    borderWidth: key === prodLength-1 || key === pageBreak[0] || key === pageBreak[1] || key === pageBreak[2] || key === pageBreak[3] || key === pageBreak[4]  ? "0px 1px 1px 0px" : "0px 1px 0px 0px" }}>
                        <Typography variant='body1' fontSize={10} textAlign={"end"}>{fNumber(parseFloat(prod.price * prod.quantity))}</Typography>
                    </Stack>
                </Stack>
            })}
            <Stack sx={{pageBreakAfter:page > 0.5 ? "always":"avoid"}}> </Stack>
           <ContentFooter orders={orders}/>
    </Box>
  );
}


