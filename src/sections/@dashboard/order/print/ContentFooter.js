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
import THBText from 'thai-baht-text' ;
import { Box,Modal,TextField,Button,Collapse,Typography, Stack,Divider,Autocomplete } from '@mui/material';
// utils
import { fNumber,fCurrency } from '../../../../utils/formatNumber';

ContentFooter.propTypes = {
    orders: PropTypes.array.isRequired
  };

export default function ContentFooter({orders, ...other }) {
    const pageHalf = [14,28,43,58,72]
    const pageBreak = [28,57,86,115,144]
    const prodLength = orders.order_product_historys.length;
    const page = parseFloat((parseFloat(prodLength / 29) - Math.floor(prodLength / 29)).toFixed(2));
  return (
    <Box>
            <Stack sx={{display:"flex",flexDirection:"column",
                    marginTop:page > 0.5 ? "317px" : "0px"}}>
                <Stack sx={{display:"flex",flexDirection:"row"}}>
                    <Stack sx={{display:"flex",flexDirection:"row",width:"40%",justifyContent:"flex-start",paddingTop:"5px"}}>
                        <Typography variant='subtitle2' fontSize={10}>หมายเหตุ/</Typography>
                        <Typography variant='body1' fontSize={10}>Remarks</Typography>
                    </Stack>
                    <Stack sx={{display:"flex",flexDirection:"row",width:"45%",justifyContent:"flex-end",alignItems:"flex-end",padding:"5px",
                        border:"solid",borderWidth:"0px 1px 1px 0px"}}>
                        <Typography variant='subtitle2' fontSize={10}>ราคาสุทธิสินค้าที่เสียภาษี&nbsp;(บาท)&nbsp;/&nbsp;</Typography>
                        <Typography variant='body1' fontSize={10}>&nbsp;Pre-VAT Amount</Typography>
                    </Stack>
                    <Stack sx={{display:"flex",flexDirection:"row",width:"15%",justifyContent:"flex-end",alignItems:"flex-end",padding:"5px",
                        border:"solid",borderWidth:"0px 1px 1px 0px"}}>
                        <Typography variant='body1' fontSize={10}>{fNumber(orders.total)}</Typography>
                    </Stack>
                </Stack>
                <Stack sx={{display:"flex",flexDirection:"row"}}>
                    <Stack sx={{display:"flex",flexDirection:"row",width:"40%",justifyContent:"flex-start",alignItems:"flex-end",paddingTop:"5px"}}>
                        <Typography variant='body1' fontSize={10}>-</Typography>
                    </Stack>
                    <Stack sx={{display:"flex",flexDirection:"row",width:"45%",justifyContent:"flex-end",alignItems:"flex-end",padding:"5px",
                        border:"solid",borderWidth:"0px 1px 1px 0px"}}>
                        <Typography variant='subtitle2' fontSize={10}>ภาษีมูลค่าเพิ่ม&nbsp;(บาท)&nbsp;/&nbsp;</Typography>
                        <Typography variant='body1' fontSize={10}>&nbsp;VAT</Typography>
                    </Stack>
                    <Stack sx={{display:"flex",flexDirection:"row",width:"15%",justifyContent:"flex-end",alignItems:"flex-end",padding:"5px",
                        border:"solid",borderWidth:"0px 1px 1px 0px"}}>
                        <Typography variant='body1' fontSize={10}>{fNumber(0)}</Typography>
                    </Stack>
                </Stack>
                <Stack sx={{display:"flex",flexDirection:"row"}}>
                    <Stack sx={{display:"flex",flexDirection:"row",width:"40%",justifyContent:"flex-start",alignItems:"flex-end",paddingTop:"5px"}}>
                        <Typography variant='subtitle2' fontSize={10}> </Typography>
                    </Stack>
                    <Stack sx={{display:"flex",flexDirection:"row",width:"45%",justifyContent:"flex-end",alignItems:"flex-end",padding:"5px",
                        border:"solid",borderWidth:"0px 1px 1px 0px"}}>
                        <Typography variant='subtitle2' fontSize={10}>จำนวนเงินรวมทั้งสิ้น&nbsp;(บาท)&nbsp;/&nbsp;</Typography>
                        <Typography variant='body1' fontSize={10}>&nbsp;Grand&nbsp;Total</Typography>
                    </Stack>
                    <Stack sx={{display:"flex",flexDirection:"row",width:"15%",justifyContent:"flex-end",alignItems:"flex-end",padding:"5px 5px 5px 5px",
                        border:"solid",borderWidth:"0px 1px 1px 0px"}}>
                        <Typography variant='subtitle2' fontSize={12} >{fNumber(orders.total)}</Typography>
                    </Stack>
                </Stack>
                <Stack sx={{display:"flex",flexDirection:"row",marginBottom:"1px",border:"solid",borderWidth:"0px 1px 1px 0px"}}>
                    <Stack sx={{display:"flex",flexDirection:"row",width:"40%",justifyContent:"flex-start",alignItems:"flex-end",paddingTop:"5px"}}>
                        <Typography variant='subtitle2' fontSize={10}> </Typography>
                    </Stack>
                    <Stack sx={{display:"flex",flexDirection:"row",width:"60%",justifyContent:"space-between",alignItems:"flex-end",padding:"5px",
                        backgroundColor:"#ccc"}}>
                        <Typography variant='subtitle2' fontSize={10}>จำนวนเงินรวมทั้งสิ้น</Typography>
                        <Typography variant='subtitle2' fontSize={10} >{THBText(orders.total)}</Typography>
                    </Stack>
                </Stack>
                <Divider sx={{ borderBottomWidth: 2,borderColor:"#000" }}/>
                <Stack sx={{display:"flex",flexDirection:"row"}}>
                    <Stack sx={{display:"flex",flexDirection:"row",width:"40%",justifyContent:"flex-start",paddingTop:"5px"}}>
                        <Typography variant='subtitle2' fontSize={10}>การชำระเงิน&nbsp;/&nbsp;</Typography>
                        <Typography variant='body1' fontSize={10}>Payment</Typography>
                    </Stack>
                    <Stack sx={{display:"flex",flexDirection:"row",width:"30%",justifyContent:"center",paddingTop:"5px"}}>
                        <Typography variant='subtitle2' fontSize={10}>ผู้ส่ง&nbsp;/&nbsp;</Typography>
                        <Typography variant='body1' fontSize={10}>&nbsp;Delivered by</Typography>
                    </Stack>
                    <Stack sx={{display:"flex",flexDirection:"row",width:"30%",justifyContent:"center",paddingTop:"5px"}}>
                        <Typography variant='subtitle2' fontSize={10}>ผู้รับ&nbsp;/&nbsp;</Typography>
                        <Typography variant='body1' fontSize={10}>&nbsp;Received by</Typography>
                    </Stack>
                </Stack>
                <Stack sx={{display:"flex",flexDirection:"row"}}>
                    <Stack sx={{display:"flex",flexDirection:"row",width:"40%",justifyContent:"flex-start",border:"solid",borderWidth:"0px 0px 1px 0px"}}>
                        <Stack sx={{display:"flex",flexDirection:"row",width:"25%",justifyContent:"flex-start",paddingTop:"5px"}}>
                            <Typography variant='subtitle2' fontSize={10}>ธนาคาร</Typography>
                        </Stack>
                        <Stack sx={{display:"flex",flexDirection:"row",width:"50%",justifyContent:"flex-start",paddingTop:"5px"}}>
                            <Typography variant='subtitle2' fontSize={10}>ชื่อบัญชี</Typography>
                        </Stack>
                        <Stack sx={{display:"flex",flexDirection:"row",width:"25%",justifyContent:"flex-start",paddingTop:"5px"}}>
                            <Typography variant='subtitle2' fontSize={10}>เลขที่บัญชี</Typography>
                        </Stack>
                    </Stack>
                    <Stack sx={{display:"flex",flexDirection:"row",width:"30%",justifyContent:"center",paddingTop:"5px"}}>
                        <Typography variant='subtitle2' fontSize={10}> </Typography>
                    </Stack>
                    <Stack sx={{display:"flex",flexDirection:"row",width:"30%",justifyContent:"center",paddingTop:"5px"}}>
                        <Typography variant='subtitle2' fontSize={10}> </Typography>
                    </Stack>
                </Stack>
                <Stack sx={{display:"flex",flexDirection:"row"}}>
                    <Stack sx={{display:"flex",flexDirection:"row",width:"40%",justifyContent:"flex-start",}}>
                        <Stack sx={{display:"flex",flexDirection:"row",width:"25%",justifyContent:"flex-start",paddingTop:"5px"}}>
                            <Typography variant='body1' fontSize={8}>กสิกรไทย</Typography>
                        </Stack>
                        <Stack sx={{display:"flex",flexDirection:"row",width:"50%",justifyContent:"flex-start",paddingTop:"5px"}}>
                            <Typography variant='body1' fontSize={8}>บจ.แคสปี้</Typography>
                        </Stack>
                        <Stack sx={{display:"flex",flexDirection:"row",width:"25%",justifyContent:"flex-start",paddingTop:"5px"}}>
                            <Typography variant='body1' fontSize={8}>109-8-43674-6</Typography>
                        </Stack>
                    </Stack>
                    <Stack sx={{display:"flex",flexDirection:"row",width:"30%",justifyContent:"center",paddingTop:"5px"}}>
                        <Typography variant='subtitle2' fontSize={8}> </Typography>
                    </Stack>
                    <Stack sx={{display:"flex",flexDirection:"row",width:"30%",justifyContent:"center",paddingTop:"5px"}}>
                        <Typography variant='subtitle2' fontSize={8}> </Typography>
                    </Stack>
                </Stack>
                <Stack sx={{display:"flex",flexDirection:"row",marginTop:"30px"}}>
                    <Stack sx={{display:"flex",flexDirection:"row",width:"40%",justifyContent:"flex-start",paddingTop:"5px"}}>
                        <Typography> </Typography>
                    </Stack>
                    <Stack sx={{display:"flex",flexDirection:"row",width:"30%",justifyContent:"center",paddingTop:"5px"}}>
                        <Typography variant='body1' fontSize={10}>................................................</Typography>
                    </Stack>
                    <Stack sx={{display:"flex",flexDirection:"row",width:"30%",justifyContent:"center",paddingTop:"5px"}}>
                        <Typography variant='body1' fontSize={10}>................................................</Typography>
                    </Stack>
                </Stack>
                <Stack sx={{display:"flex",flexDirection:"row"}}>
                    <Stack sx={{display:"flex",flexDirection:"row",width:"40%",justifyContent:"flex-start",paddingTop:"5px"}}>
                        <Typography> </Typography>
                    </Stack>
                    <Stack sx={{display:"flex",flexDirection:"row",width:"30%",justifyContent:"center",paddingTop:"5px"}}>
                        <Typography variant='body1' fontSize={10}>วันที่ / Date...............................</Typography>
                    </Stack>
                    <Stack sx={{display:"flex",flexDirection:"row",width:"30%",justifyContent:"center",paddingTop:"5px"}}>
                        <Typography variant='body1' fontSize={10}>วันที่ / Date...............................</Typography>
                    </Stack>
                </Stack>
            </Stack>
    </Box>
  );
}


