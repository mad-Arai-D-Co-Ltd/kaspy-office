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
    const pageBreak = [25,51,77,103,129]
    const headerDisplay = [27,56,85,114,143]
    const prodLength = orders.order_product_historys.length;
    const page = parseFloat((parseFloat(prodLength / 29) - Math.floor(prodLength / 29)).toFixed(2));
    const maxPage = page > 0.5 ? Math.ceil(prodLength / 29)+1 : Math.ceil(prodLength / 29);
  return (
    <Box sx={{marginTop:"18rem"}}>
            {orders.order_product_historys.map((prod,key) => {
                return <Box sx={{
                    pageBreakAfter:key === pageBreak[0] || key === pageBreak[1] || key === pageBreak[2] || key === pageBreak[3] || key === pageBreak[4]  ? "always" : "avoid",
                    marginTop:key === pageBreak[0]+1 || key === pageBreak[1]+1 || key === pageBreak[2]+1 || key === pageBreak[3]+1 || key === pageBreak[4]+1 ? "18rem" : "0px",}}>
                    <Stack sx={{display:key === 0 || key === pageBreak[0]+1 || key === pageBreak[1]+1 || key === pageBreak[2]+1 || key === pageBreak[3]+1 || key === pageBreak[4]+1 ? "flex":"none",flexDirection:"row",}}>
                        <Stack sx={{display:"flex",flexDirection:"column",width:"10%" ,padding:"5px" ,border:"solid",borderWidth:"1px 0px 1px 1px"}}>
                            <Typography variant='subtitle2' fontSize={10}>ลำดับ</Typography>
                            <Typography variant='body1' fontSize={10}>ID no.</Typography>
                        </Stack>
                        <Stack sx={{display:"flex",flexDirection:"column",width:"43%" ,padding:"5px",border:"solid",borderWidth:"1px 1px 1px 1px"}}>
                            <Typography variant='subtitle2' fontSize={10}>คำอธิบาย</Typography>
                            <Typography variant='body1' fontSize={10}>Description</Typography>
                        </Stack>
                        <Stack sx={{display:"flex",flexDirection:"column",width:"10%" ,padding:"5px" ,border:"solid",borderWidth:"1px 1px 1px 0px"}}>
                            <Typography variant='subtitle2' fontSize={10}>จำนวน</Typography>
                            <Typography variant='body1' fontSize={10}>Quantity</Typography>
                        </Stack>
                        <Stack sx={{display:"flex",flexDirection:"column",width:"7%" ,padding:"5px" ,border:"solid",borderWidth:"1px 1px 1px 0px"}}>
                            <Typography variant='subtitle2' fontSize={10}>หน่วย</Typography>
                            <Typography variant='body1' fontSize={10}>Unit</Typography>
                        </Stack>
                        <Stack sx={{display:"flex",flexDirection:"column",width:"15%" ,padding:"5px" ,border:"solid",borderWidth:"1px 1px 1px 0px"}}>
                            <Typography variant='subtitle2' fontSize={10}>ราคาต่อหน่วย</Typography>
                            <Typography variant='body1' fontSize={10}>Unit Price</Typography>
                        </Stack>
                        <Stack sx={{display:"flex",flexDirection:"column",width:"15%" ,padding:"5px" ,border:"solid",borderWidth:"1px 1px 1px 0px"}}>
                            <Typography variant='subtitle2' fontSize={10}>มูลค่าก่อนภาษี</Typography>
                            <Typography variant='body1' fontSize={10}>Pre-Tax Amount</Typography>
                        </Stack>
                    </Stack>
                    <Stack key={key} sx={{display:"flex",flexDirection:"row",
                    }}>
                        
                        <Stack sx={{display:"flex",flexDirection:"column",width:"10%" ,padding:"5px" ,border:"solid",
                        borderWidth: key === prodLength-1 || key === pageBreak[0] || key === pageBreak[1] || key === pageBreak[2] || key === pageBreak[3] || key === pageBreak[4] ? "0px 0px 1px 1px" : "0px 0px 0px 1px"  }}>
                            <Typography variant='body1' fontSize={10} textAlign={"center"}>{key + 1}</Typography>
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
                </Box>
            })}
            <Stack sx={{pageBreakAfter:page > 0.5 ? "always":"avoid"}}> </Stack>
           <ContentFooter orders={orders}/>
    </Box>
  );
}


