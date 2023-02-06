import axios from 'axios';
import { useEffect,useState } from 'react';
import jwtDecode from "jwt-decode";
// material
import { Container, Stack, Typography,Button } from '@mui/material';
// components
import Page from '../components/Page';
import { OrderTable,OrderCreate } from '../sections/@dashboard/order';
// api
import api from '../config/services';
// ----------------------------------------------------------------------

export default function Orders() {
  const userData = JSON.parse(localStorage.getItem('userInfo'));
  const decodeData = jwtDecode(userData.token);
  
  useEffect(() => {
    getOrderTempList();
    getProductList();
    getUnitList();
  }, []);

  const [orderTempList, setOrderTempList] = useState([]);
  const getOrderTempList = () => {
    const url = `${api.orderTempList}`;
    axios
      .get(url)
      .then((res) => {
        const { data } = res;
        if (data.type === 'success') {
          setOrderTempList(data.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [productList, setProductList] = useState([]);
  const getProductList = () => {
    const url = `${api.productList}`;
    axios
      .get(url)
      .then((res) => {
        const { data } = res;
        if (data.type === 'success') {
          setProductList(data.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [unitList, setUnitList] = useState([]);
  const getUnitList = () => {
    const url = `${api.unitList}`;
    axios
      .get(url)
      .then((res) => {
        const { data } = res;
        if (data.type === 'success') {
          setUnitList(data.data.result);
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
          Orders
        </Typography>
        <OrderCreate 
          getOrderTempList={getOrderTempList}
          productList={productList} 
          unitList={unitList} 
        />
        <OrderTable 
          orders={orderTempList}
          productList={productList} 
          unitList={unitList} 
        />
      </Container>
    </Page>
  );
}