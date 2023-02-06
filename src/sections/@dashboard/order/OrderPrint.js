import { useRef, Component,useState } from 'react';
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

import ComponentToPrint from './ComponentToPrint';

OrderPrint.propTypes = {
    orders: PropTypes.array.isRequired
  };

export default function OrderPrint({orders,type,...other }) {
const [open, setOpen] = useState("");
const componentRef = useRef();

  const handleClick = () => {
      setOpen(!open);
    
  }
  
  return (
    <Box>
        <Stack sx={{display: "flex",flexDirection:"row",justifyContent:"flex-end",marginBottom:"1rem"}}>
            <Button variant='contained' sx={{width:"20%"}} onClick={handleClick}>{type === "real" ? "ต้นฉบับ" : "สำเนา"}</Button>
        </Stack>
        <Modal
         open={open}
         onClose={handleClick}
         aria-labelledby="child-modal-title"
         aria-describedby="child-modal-description"
        >
            <Box sx={{ ...style,height:"10vh" }}>
                <ReactToPrint
                trigger={() => <a href="#">Print this</a>}
                content={() => componentRef.current}
                
                />
                <ComponentToPrint refPropWithAnotherName={componentRef} orders={orders} type={type}/>
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
    width: 200,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
