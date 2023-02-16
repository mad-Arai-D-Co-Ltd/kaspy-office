import axios from 'axios';
import { useEffect,useState } from 'react';
import moment from 'moment';
import jwtDecode from "jwt-decode";
// material
import { Container, Stack, Typography,Button,TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// components
import Page from '../components/Page';
import { OrderHisTable } from '../sections/@dashboard/order';
// api
import api from '../config/services';
// ----------------------------------------------------------------------

export default function OrderHistory() {
  const userData = JSON.parse(localStorage.getItem('userInfo'));
  const decodeData = jwtDecode(userData.token);
  const [firstdayValue, setFirstdayValue] = useState(moment());
  const [lastdayValue, setLastdayValue] = useState(moment().add(1, 'days'));

  useEffect(() => {
    getOrderHisList();
  }, []);

  const [orderHisList, setOrderHisList] = useState([]);
  const getOrderHisList = () => {
    const url = api.orderHisList;
    
    const f = new Date(firstdayValue);
    const l = new Date(lastdayValue);
    const data = {
      firstday : `${f.getFullYear()}-${f.getMonth() + 1}-${f.getDate()}` ,
      lastday :  `${l.getFullYear()}-${l.getMonth() + 1}-${l.getDate()}` ,
    }
    axios
      .post(url,data,{
        headers: {
        Authorization: `Bearer ${userData.token}`,
        },
    })
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

  
  const handleChangeFirstday = (newValue) => {
    setFirstdayValue(newValue);
  };

  
  const handleChangeLastday = (newValue) => {
    setLastdayValue(newValue);
    
  };
  
  const handleSearch = () => {
    getOrderHisList();
  }

  const [showPopupConfirmDelete, setShowPopupConfirmDelete] = useState(false);
  const [deleteOrderHisId,setDeleteOrderHisId] = useState("");

  const handleDeletePopup = (id) => {
    setShowPopupConfirmDelete(!showPopupConfirmDelete);
    setDeleteOrderHisId(id);
  }

  const handleDeleteOrderHistory = () => {
    const url = `${api.deleteOrderHis}${deleteOrderHisId}`
    console.log(url);
    axios
      .delete(url)
      .then((res) => {
        const { data } = res;
        if (data.type === 'success') {
          getOrderHisList();
          setShowPopupConfirmDelete(!showPopupConfirmDelete);
        } else {
          errors.result = 'พบข้อผิดพลาด กรุณาติดต่อผู้ดูแลระบบ';
          setErrors(errors);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }


  return (
    <Page title="Dashboard: Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Orders history
        </Typography>
        <Stack sx={{display:"flex",flexDirection:"row",justifyContent:"flex-end",marginBottom:"1rem"}}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack sx={{width:"20%",marginRight:"1rem"}}>
              <DesktopDatePicker
                label="From"
                inputFormat="YYYY-MM-DD"
                value={firstdayValue}
                onChange={handleChangeFirstday}
                renderInput={(params) => <TextField {...params}/>}
                sx={{color:'#000'}}
              />
            </Stack>
            <Stack sx={{width:"20%",marginRight:"1rem"}}>
              <DesktopDatePicker
                label="To"
                inputFormat="YYYY-MM-DD"
                value={lastdayValue}
                onChange={handleChangeLastday}
                renderInput={(params) => <TextField {...params}/>}
                sx={{color:'#000'}}
              />
            </Stack>
            <Stack>
              <Button
                variant='contained'
                onClick={handleSearch}
              >ค้นหา</Button>
            </Stack>
            
          </LocalizationProvider>
        </Stack>
        <OrderHisTable 
          orders={orderHisList}
          showPopupConfirmDelete={showPopupConfirmDelete}
          handleDeletePopup={handleDeletePopup}
          handleDeleteOrderHistory={handleDeleteOrderHistory}
        />
      </Container>
    </Page>
  );
}