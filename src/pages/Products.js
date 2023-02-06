import axios from 'axios';
import { useEffect,useState } from 'react';
import jwtDecode from "jwt-decode";
// material
import { Container, Stack, Typography,Button } from '@mui/material';
// components
import Page from '../components/Page';
import { ProductSort,ProductTable, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
// api
import api from '../config/services';
// ----------------------------------------------------------------------

export default function Products() {
  const userData = JSON.parse(localStorage.getItem('userInfo'));
  const decodeData = jwtDecode(userData.token);

  useEffect(() => {
    getProductList();
  }, []);

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

  const [changeData, setChangeData] = useState({});
  const inputChange = (event,product) => {
    const productCodes = product.productCode;
    const createBy = decodeData.payload.id.toString();
    const names = product.name;
    const ids = event.target.name;
    const value = event.target.value;

    setChangeData((lastValue) => {
      return {
        ...lastValue,
        [ids]:{id: ids,productCode:productCodes,name:names,price : value,createdByUserId:createBy}
      };
    });
  }

  const updateProductTable = () => {
    const url = api.updateProductList;

    axios
      .post(url, changeData,{
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      })
      .then((res) => {
        const { data } = res;
        if (data.type === 'success') {
          getProductList();
          setChangeData({});
          // window.location.reload();
        } else {
          errors.result = 'พบข้อผิดพลาด กรุณาติดต่อผู้ดูแลระบบ';
          setErrors(errors);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateTable = () => {
    updateProductTable();
  };

  return (
    <Page title="Dashboard: Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>
        <Button onClick={handleUpdateTable} variant='contained' color='error' size='large' sx={{display:Object.keys(changeData).length > 0? "flex":"none",position:"fixed",right:"1%",bottom:"50%",width:"10%"}}>Update Price</Button>
        <ProductTable products={productList} inputChange={inputChange} changeData={changeData}/>
      </Container>
    </Page>
  );
}
