import axios from 'axios';
import { useEffect,useState,useRef } from 'react';
import jwtDecode from "jwt-decode";
import ReactToPrint from "react-to-print";
// material
import { Container, Stack,Box, Typography,Button } from '@mui/material';
// components
import Page from '../components/Page';
import { WeeklyProdTable } from '../sections/@dashboard/weeklyProdTotal';

// api
import api from '../config/services';
// ----------------------------------------------------------------------

export default function WeeklyProdTotal() {
  const userData = JSON.parse(localStorage.getItem('userInfo'));
  const decodeData = jwtDecode(userData.token);
  const componentRef = useRef();
  useEffect(() => {
    getProductList();
  }, []);

  const [productList, setProductList] = useState([]);
  const getProductList = () => {
    const url = `${api.weeklyProductTotal}`;
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

  return (
    <Page title="Dashboard: Day Product Total">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
            Day Product Total
        </Typography>
        <Box sx={{display:'flex',justifyContent:'flex-end'}}>
            <ReactToPrint
                trigger={() => <a style={{border:"solid",padding:"10px 30px 10px 30px",marginBottom:"1rem"}} href="#">Print</a>}
                content={() => componentRef.current}
            />
        </Box>
       
        <WeeklyProdTable products={productList}  refPropWithAnotherName={componentRef}/>
      </Container>
    </Page>
  );
}
