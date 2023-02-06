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
import "../../../../public/asset/css/printCss.css";

export default function Footer(maxPage,...other) {

  return (
    <Box sx={{position: "fixed",bottom: 0,width:"90%"}}>
        <Stack sx={{display:'flex',flexDirection:"row",marginBottom:"20px"}}>
            <Stack sx={{display:'flex',flexDirection:"row",width:"35%",justifyContent:"flex-end"}}>
                <Typography variant='subtitle2' fontSize={10}> </Typography>
            </Stack>
            <Stack sx={{display:'flex',flexDirection:"row",width:"30%",justifyContent:"center",alignItems:"center"}}>
                <Typography className='pageFooter' variant='body1' fontSize={10}> </Typography>
                <Typography variant='body1' fontSize={10}>หน้าที่ {'...'}/{maxPage.maxPage}</Typography>
            </Stack>
            <Stack sx={{display:'flex',flexDirection:"row",width:"35%",justifyContent:"flex-end"}}>
                <Typography variant='subtitle2' fontSize={10}>จัดเตรียมโดย / </Typography>
                <Typography variant='body1' fontSize={10}>Prepared by Accounting Kaspy </Typography>
            </Stack>
        </Stack>
    </Box>
  );
}


