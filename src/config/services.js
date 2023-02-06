const ip = {
    localhost: 'http://localhost:3001',
    production: 'https://hr-project.madtypes.com',
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
    productList: `${apiIp}/api/v1/product/product-list`,
    updateProductList : `${apiIp}/api/v1/product/update-product-list`,

    // unit
    unitList: `${apiIp}/api/v1/unit/unit-list`,

    // order temp
    orderTempList: `${apiIp}/api/v1/order/order-temp-list`,
    createOrderTemp : `${apiIp}/api/v1/order/create-order-temp`,
    createOrderTempProd : `${apiIp}/api/v1/order/create-order-temp-prod`,
    createOrderTempProdList : `${apiIp}/api/v1/order/create-order-temp-prod-list`,

    // order his
    orderHisList: `${apiIp}/api/v1/order-his/order-his-list`,
    createOrderHis : `${apiIp}/api/v1/order-his/create-order-his`,
    
  };
  
  export default api;
  