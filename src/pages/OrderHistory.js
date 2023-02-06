import axios from 'axios';
import { useEffect,useState } from 'react';
import jwtDecode from "jwt-decode";
// material
import { Container, Stack, Typography,Button } from '@mui/material';
// components
import Page from '../components/Page';
import { OrderHisTable } from '../sections/@dashboard/order';
// api
import api from '../config/services';
// ----------------------------------------------------------------------

export default function OrderHistory() {
  const userData = JSON.parse(localStorage.getItem('userInfo'));
  const decodeData = jwtDecode(userData.token);
  
  useEffect(() => {
    getOrderHisList();
  }, []);

  const [orderHisList, setOrderHisList] = useState([]);
  const getOrderHisList = () => {
    const url = `${api.orderHisList}`;
    axios
      .get(url)
      .then((res) => {
        const { data } = res;
        if (data.type === 'success') {
            setOrderHisList(data.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Page title="Dashboard: Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Orders history
        </Typography>
        <OrderHisTable 
          orders={orderHisList}
        />
      </Container>
    </Page>
  );
}