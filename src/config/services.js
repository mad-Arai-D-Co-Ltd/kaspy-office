const ip = {
    localhost: 'http://localhost:3001',
    production: 'https://office-api.kaspy.com',
  };
  const apiIp = process.env.NODE_ENV === 'production' ? ip.production : ip.localhost;
  
  const api = {
    apiUrl: `${apiIp}`,
    // login
    login: `${apiIp}/api/v1/auth/login`,
    logout: `${apiIp}/api/v1/auth/logout`,

    // user
    userList: `${apiIp}/api/v1/user/user-list`,
    createUser: `${apiIp}/api/v1/user/create-user`,
    roleList : `${apiIp}/api/v1/user/role-list`,
    
    // product
    createProduct: `${apiIp}/api/v1/product/create-product`,
    productList: `${apiIp}/api/v1/product/product-list`,
    updateProductList : `${apiIp}/api/v1/product/update-product-list`,

    // unit
    unitList: `${apiIp}/api/v1/unit/unit-list`,

    // order temp
    orderTempList: `${apiIp}/api/v1/order/order-temp-list`,
    createOrderTemp : `${apiIp}/api/v1/order/create-order-temp`,
    createOrderTempProd : `${apiIp}/api/v1/order/create-order-temp-prod`,
    createOrderTempProdList : `${apiIp}/api/v1/order/create-order-temp-prod-list`,
    updateOrderTemp : `${apiIp}/api/v1/order/update-order-temp/`,

    // order his
    orderHisList: `${apiIp}/api/v1/order-his/order-his-list`,
    createOrderHis : `${apiIp}/api/v1/order-his/create-order-his`,
    updateCostPrice : `${apiIp}/api/v1/order-his/update-prod-his`,

    // dashboard
    weeklySales : `${apiIp}/api/v1/analysis/weekly-sales`,
    weeklyOrder : `${apiIp}/api/v1/analysis/weekly-orders`,
    weeklyUsers : `${apiIp}/api/v1/analysis/weekly-users`,
    weeklyTopSpend : `${apiIp}/api/v1/analysis/weekly-top-spend`,
    weeklyProductTotal : `${apiIp}/api/v1/analysis/prod-analysis-list`,
    productPriceHislist : `${apiIp}/api/v1/analysis/prod-price-his/`,
  };
  
  export default api;
  