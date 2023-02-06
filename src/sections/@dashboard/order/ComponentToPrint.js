import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box,Modal,TextField,Button,Collapse,Typography, Stack,Divider,Autocomplete } from '@mui/material';
import {Header,Content,Footer} from './print'

ComponentToPrint.propTypes = {
    orders: PropTypes.array.isRequired
  };

export default function ComponentToPrint({refPropWithAnotherName,orders,type, ...other }) {
  const prodLength = orders.order_product_historys.length;
  const page = parseFloat((parseFloat(prodLength / 29) - Math.floor(prodLength / 29)).toFixed(2));
  const maxPage = page > 0.5 ? Math.ceil(prodLength / 29)+1 : Math.ceil(prodLength / 29);
  return (
    <Box className='hideComponent' ref={refPropWithAnotherName} sx={{margin:"20px 40px 20px 40px"}}>
        <Header orders={orders} type={type} />
        <Content orders={orders}/>
        <Footer maxPage={maxPage}/>
    </Box>
  );
}


