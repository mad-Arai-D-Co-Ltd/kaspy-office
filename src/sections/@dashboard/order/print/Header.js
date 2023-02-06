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
import { Box,Modal,TextField,Button,Collapse,Typography, Stack,Divider,Autocomplete } from '@mui/material';
import image from '../../../../public/asset/image/Kaspy-Header-Logo_2.png';


Header.propTypes = {
    orders: PropTypes.array.isRequired
  };

export default function Header({orders,type, ...other }) {
    const newDate = new Date()
    const date = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    console.log(type);
    const dateNow = `${date}/${month<10?`0${month}`:`${month}`}/${year}`;

  return (
    <Box sx={{position: "fixed",top:10,width:"89.9%"}}>
        <Stack sx={{display:'flex',flexDirection:"row",marginBottom:"20px"}}>
            <Stack sx={{display:'flex',flexDirection:"column",justifyContent:"flex-end",width:"50%"}}>
                <Typography variant='h5'>ใบส่งของ/ใบแจ้งหนี้/ใบกำกับภาษี</Typography>
                <Typography variant='h5'>Delivery Note/Invoice/Tax Invoice</Typography>
            </Stack>
            <Stack sx={{display:'flex',flexDirection:"column",justifyContent:"flex-end",marginBottom:"1px",width:"20%"}}>
                <Typography variant='body1' fontSize={14} textAlign={"end"}>( เอกสารออกเป็นชุด )</Typography>
                <Typography variant='body1' fontSize={14} textAlign={"end"}>{type === "real" ? "( ต้นฉบับ / original )": "( สำเนา / copy )"}</Typography>
            </Stack>
            <Stack sx={{display:'flex',justifyContent:"flex-end",alignItems:"flex-end",width:"30%"}}>
            <img src={image} alt="" width="200" height="80" style={{position:"relative",top:"8px"}}/>
            </Stack>
        </Stack>
        <Stack sx={{display:'flex',flexDirection:"row",marginBottom:"5px"}}>
            <Stack sx={{display:'flex',flexDirection:"row",alignItems:"flex-end",width:"15%"}}>
                <Typography variant='subtitle2' fontSize={10}>ลูกค้า / </Typography>
                <Typography variant='body1' fontSize={10}>Customer</Typography>
            </Stack>
            <Stack sx={{display:'flex',flexDirection:"row",alignItems:"flex-end",width:"55%"}}>
                <Typography variant='body1' fontSize={10}>{orders.customerName}</Typography>
            </Stack>
            <Stack sx={{display:'flex',flexDirection:"row",alignItems:"flex-end",width:"12%"}}>
                <Typography variant='subtitle2' fontSize={10}>เลขที่ / </Typography>
                <Typography variant='body1' fontSize={10}>No.</Typography>
            </Stack>
            <Stack sx={{display:'flex',flexDirection:"row",alignItems:"flex-end",width:"18%"}}>
                <Typography variant='body1' fontSize={10}>{orders.no}</Typography>
            </Stack>
        </Stack>
        <Stack sx={{display:'flex',flexDirection:"row",marginBottom:"5px"}}>
            <Stack sx={{display:'flex',flexDirection:"row",alignItems:"flex-end",width:"15%"}}>
                <Typography variant='subtitle2' fontSize={10}>ที่อยู่ / </Typography>
                <Typography variant='body1' fontSize={10}>Address</Typography>
            </Stack>
            <Stack sx={{display:'flex',flexDirection:"row",alignItems:"flex-end",width:"55%"}}>
                <Typography variant='body1' fontSize={10}>{orders.address}</Typography>
            </Stack>
            <Stack sx={{display:'flex',flexDirection:"row",alignItems:"flex-end",width:"12%"}}>
                <Typography variant='subtitle2' fontSize={10}>วันที่ / </Typography>
                <Typography variant='body1' fontSize={10}>Issue</Typography>
            </Stack>
            <Stack sx={{display:'flex',flexDirection:"row",alignItems:"flex-end",width:"18%"}}>
                <Typography variant='body1' fontSize={10}>{dateNow}</Typography>
            </Stack>
        </Stack>
        <Stack sx={{display:'flex',flexDirection:"row",marginBottom:"5px"}}>
            <Stack sx={{display:'flex',flexDirection:"row",alignItems:"flex-end",width:"15%"}}>
                <Typography variant='subtitle2' fontSize={10}>เลขผู้เสียภาษี / </Typography>
                <Typography variant='body1' fontSize={10}>Tax ID</Typography>
            </Stack>
            <Stack sx={{display:'flex',flexDirection:"row",alignItems:"flex-end",width:"25%"}}>
                <Typography variant='body1' fontSize={10}>{orders.taxId}</Typography>
            </Stack>
            <Stack sx={{display:'flex',flexDirection:"row",alignItems:"flex-end",width:"30%"}}>
                <Typography variant='subtitle2' fontSize={10}>T: </Typography>
                <Typography variant='body1' fontSize={10}>&nbsp;-</Typography>
            </Stack>
            <Stack sx={{display:'flex',flexDirection:"row",alignItems:"flex-end",width:"12%"}}>
                <Typography variant='subtitle2' fontSize={8}>ครบกำหนด / </Typography>
                <Typography variant='body1' fontSize={8}>Due Date</Typography>
            </Stack>
            <Stack sx={{display:'flex',flexDirection:"row",alignItems:"flex-end",width:"18%"}}>
                <Typography variant='body1' fontSize={10}>{dateNow}</Typography>
            </Stack>
        </Stack>
        <Stack sx={{display:'flex',flexDirection:"row",marginBottom:"10px"}}>
            <Stack sx={{display:'flex',flexDirection:"row",alignItems:"flex-end",width:"15%"}}>
                <Typography variant='subtitle2' fontSize={10}>ผู้ติดต่อ / </Typography>
                <Typography variant='body1' fontSize={10}>Attention</Typography>
            </Stack>
            <Stack sx={{display:'flex',flexDirection:"row",width:"25%"}}>
                <Typography variant='body1' fontSize={10}>{orders.attention}</Typography>
            </Stack>
            <Stack sx={{display:'flex',flexDirection:"row",alignItems:"flex-end",width:"30%"}}>
                <Typography variant='subtitle2' fontSize={10}>E: </Typography>
                <Typography variant='body1' fontSize={10}>&nbsp;-</Typography>
            </Stack>
            <Stack sx={{display:'flex',flexDirection:"row",alignItems:"flex-end",width:"12%"}}>
                <Typography variant='subtitle2' fontSize={10}>อ้างอิง / </Typography>
                <Typography variant='body1' fontSize={10}>Ref</Typography>
            </Stack>
            <Stack sx={{display:'flex',flexDirection:"row",alignItems:"flex-end",width:"18%"}}>
                <Typography variant='body1' fontSize={10}>{orders.ref}</Typography>
            </Stack>
        </Stack>

        <Divider sx={{marginBottom:"10px"}}/>

        <Stack sx={{display:'flex',flexDirection:"row",marginBottom:"5px"}}>
            <Stack sx={{display:'flex',flexDirection:"row",alignItems:"flex-end",width:"10%"}}>
                <Typography variant='subtitle2' fontSize={10}>ผู้ออก</Typography>
            </Stack>
            <Stack sx={{display:'flex',flexDirection:"row",alignItems:"flex-end",width:"45%"}}>
                <Typography variant='body1' fontSize={10}>บริษัท แคสปี้ จำกัด (สำนักงานใหญ่)</Typography>
            </Stack>
            <Stack sx={{display:'flex',flexDirection:"row",alignItems:"flex-end",width:"20%"}}>
                <Typography variant='subtitle2' fontSize={10}>เลขที่ผู้เสียภาษี / </Typography>
                <Typography variant='body1' fontSize={10}>Tax ID</Typography>
            </Stack>
            <Stack sx={{display:'flex',flexDirection:"row",alignItems:"flex-end",width:"25%"}}>
                <Typography variant='body1' fontSize={10}>0105563055239</Typography>
            </Stack>
        </Stack>
        <Stack sx={{display:'flex',flexDirection:"row",marginBottom:"5px"}}>
            <Stack sx={{display:'flex',flexDirection:"row",alignItems:"flex-end",width:"10%"}}>
                <Typography variant='subtitle2' fontSize={10}>issuer</Typography>
            </Stack>
            <Stack sx={{display:'flex',flexDirection:"row",alignItems:"flex-end",width:"45%"}}>
                <Typography variant='body1' fontSize={10}>เลขที่ 109 ซอยพหลโยธิน 5 ถนนพหลโยธิน แขวงพญาไท เขตพญาไท</Typography>
            </Stack>
            <Stack sx={{display:'flex',flexDirection:"row",alignItems:"flex-end",width:"20%"}}>
                <Typography variant='subtitle2' fontSize={10}>T: </Typography>
                <Typography variant='body1' fontSize={10}>&nbsp;-</Typography>
            </Stack>
            <Stack sx={{display:'flex',flexDirection:"row",alignItems:"flex-end",width:"25%"}}>
                <Typography variant='subtitle2' fontSize={10}>E: </Typography>
                <Typography variant='body1' fontSize={10}>&nbsp;-</Typography>
            </Stack>
        </Stack>
        <Stack sx={{display:'flex',flexDirection:"row",marginBottom:"10px"}}>
            <Stack sx={{display:'flex',flexDirection:"row",alignItems:"flex-end",width:"10%"}}>
                <Typography variant='body1' fontSize={10}>&nbsp;</Typography>
            </Stack>
            <Stack sx={{display:'flex',flexDirection:"row",alignItems:"flex-end",width:"45%"}}>
                <Typography variant='body1' fontSize={10}>กรุงเทพมหานคร 10400</Typography>
            </Stack>
            <Stack sx={{display:'flex',flexDirection:"row",alignItems:"flex-end",width:"20%"}}>
                <Typography variant='subtitle2' fontSize={10}>W: </Typography>
                <Typography variant='body1' fontSize={10}>&nbsp;-</Typography>
            </Stack>
            <Stack sx={{display:'flex',flexDirection:"row",alignItems:"flex-end",width:"25%"}}>
                <Typography variant='body1' fontSize={10}>&nbsp;</Typography>
            </Stack>
        </Stack>
        <Stack sx={{display:"flex",flexDirection:"row"}}>
            <Stack sx={{display:"flex",flexDirection:"column",width:"10%" ,padding:"5px" ,border:"solid",borderWidth:"1px 0px 1px 1px"}}>
                <Typography variant='subtitle2' fontSize={10}>รหัส</Typography>
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
    </Box>
  );
}


