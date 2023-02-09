import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import ReactApexChart from 'react-apexcharts';
// @mui
import { Card, CardHeader, Box,Autocomplete,TextField, Stack } from '@mui/material';
// components
import { BaseOptionChart } from '../../../components/chart';

// ----------------------------------------------------------------------

AppWebsiteVisits.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
  chartLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default function AppWebsiteVisits({ handleChangeProd,productList, title, subheader, chartLabels, chartData, ...other }) {
  const chartOptions = merge(BaseOptionChart(), {
    plotOptions: { bar: { columnWidth: '16%' } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    xaxis: { type: 'datetime' },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} ฿`;
          }
          return y;
        },
      },
    }, 
  });

  return (
    <Card {...other}>
      <Stack sx={{display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"flex-end",height:"8vh"}}>
        <CardHeader title={title} subheader={subheader} />
        <Autocomplete
            disablePortal
            id="productId"
            name="productId"
            getOptionLabel={(option) => option.name}
            options={productList}
            sx={{ width: "30%" ,marginRight:"20px"}}
            onChange={(event, newValue) => handleChangeProd(newValue)}
            renderInput={(params) => <TextField {...params} label="Product" />}
        />
      </Stack>
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={chartData} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
