import axios from 'axios';
import { useEffect,useState } from 'react';
import { faker } from '@faker-js/faker';
// @mui
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography,Autocomplete,TextField } from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
// sections
import {
  AppTasks,
  AppNewsUpdate,
  AppOrderTimeline,
  AppCurrentVisits,
  AppWebsiteVisits,
  AppTrafficBySite,
  AppWidgetSummary,
  AppCurrentSubject,
  AppConversionRates,
} from '../sections/@dashboard/app';
// api
import api from '../config/services';
// ----------------------------------------------------------------------

export default function DashboardApp() {
  const theme = useTheme();
  
  useEffect(() => {
    getWeeklySales();
    getWeeklyOrders();
    getWeeklyUsers();
    getWeeklyTopSpend();
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

  const handleChangeProd = (value = 1) => {
    getProductPriceHisList(value.id);
  }
  
  const [productPriceHisList, setProductPriceHisList] = useState({});
  const [dateProdHis, setDateProdHis] = useState([]);
  const [dataProdHis, setDataProdHis] = useState([{name:""}]);
  const getProductPriceHisList = (id) => {
    const url = `${api.productPriceHislist}${id}`;
    axios
      .get(url)
      .then((res) => {
        const { data } = res;
        if (data.type === 'success') {
          const dataProd = data.data.result;
          const price = dataProd.map((i) => i.price);
          const createdAt = dataProd.map((i) => i.createdAt);
          const dataProdDisplay = [
            {
              name: dataProd[Object.keys(dataProd).length - 1].name,
              type: 'area',
              fill: 'gradient',
              data: price,
            },
          ];
          setDateProdHis(createdAt);
          setDataProdHis(dataProdDisplay);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [weeklySales, setWeeklySales] = useState({});
  const getWeeklySales = () => {
    const url = `${api.weeklySales}`;
    axios
      .get(url)
      .then((res) => {
        const { data } = res;
        if (data.type === 'success') {
          setWeeklySales(data.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [weeklyOrders, setWeeklyOrders] = useState({});
  const getWeeklyOrders = () => {
    const url = `${api.weeklyOrder}`;
    axios
      .get(url)
      .then((res) => {
        const { data } = res;
        if (data.type === 'success') {
          setWeeklyOrders(data.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [weeklyUsers, setWeeklyUsers] = useState({});
  const getWeeklyUsers = () => {
    const url = `${api.weeklyUsers}`;
    axios
      .get(url)
      .then((res) => {
        const { data } = res;
        if (data.type === 'success') {
          setWeeklyUsers(data.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [weeklyTopSpend, setWeeklyTopSpend] = useState([]);
  const getWeeklyTopSpend = () => {
    const url = `${api.weeklyTopSpend}`;
    axios
      .get(url)
      .then((res) => {
        const { data } = res;
        if (data.type === 'success') {
          setWeeklyTopSpend(data.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  

  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Weekly Sales" total={weeklySales.length ? weeklySales[0].total:0} icon={'icon-park-solid:sales-report'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="All Customer Template" total={weeklyUsers.length ? weeklyUsers[0].total:0} color="info" icon={'mdi:user-check'} />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <AppWidgetSummary title="Weekly Orders" total={weeklyOrders.length ? weeklyOrders[0].total:0} color="warning" icon={'material-symbols:order-approve-rounded'} />
          </Grid>

          {/* <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid> */}

          <Grid item xs={12} md={6} lg={8}>
           
            <AppWebsiteVisits
            handleChangeProd={handleChangeProd}
              productList={productList}
              title={dataProdHis[0].name}
              subheader="price chart"
              chartLabels={dateProdHis}
              chartData={dataProdHis}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Weekly Top Spend"
              chartData={weeklyTopSpend}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.chart.blue[0],
                theme.palette.chart.violet[0],
                theme.palette.chart.yellow[0],
              ]}
            />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates
              title="Conversion Rates"
              subheader="(+43%) than last year"
              chartData={[
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject
              title="Current Subject"
              chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
              chartData={[
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ]}
              chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate
              title="News Update"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: faker.name.jobTitle(),
                description: faker.name.jobTitle(),
                image: `/static/mock-images/covers/cover_${index + 1}.jpg`,
                postedAt: faker.date.recent(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline
              title="Order Timeline"
              list={[...Array(5)].map((_, index) => ({
                id: faker.datatype.uuid(),
                title: [
                  '1983, orders, $4220',
                  '12 Invoices have been paid',
                  'Order #37745 from September',
                  'New order placed #XF-2356',
                  'New order placed #XF-2346',
                ][index],
                type: `order${index + 1}`,
                time: faker.date.past(),
              }))}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite
              title="Traffic by Site"
              list={[
                {
                  name: 'FaceBook',
                  value: 323234,
                  icon: <Iconify icon={'eva:facebook-fill'} color="#1877F2" width={32} height={32} />,
                },
                {
                  name: 'Google',
                  value: 341212,
                  icon: <Iconify icon={'eva:google-fill'} color="#DF3E30" width={32} height={32} />,
                },
                {
                  name: 'Linkedin',
                  value: 411213,
                  icon: <Iconify icon={'eva:linkedin-fill'} color="#006097" width={32} height={32} />,
                },
                {
                  name: 'Twitter',
                  value: 443232,
                  icon: <Iconify icon={'eva:twitter-fill'} color="#1C9CEA" width={32} height={32} />,
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks
              title="Tasks"
              list={[
                { id: '1', label: 'Create FireStone Logo' },
                { id: '2', label: 'Add SCSS and JS files if required' },
                { id: '3', label: 'Stakeholder Meeting' },
                { id: '4', label: 'Scoping & Estimations' },
                { id: '5', label: 'Sprint Showcase' },
              ]}
            />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
