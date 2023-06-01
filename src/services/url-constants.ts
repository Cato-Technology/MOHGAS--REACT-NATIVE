const API_URLS = {
  //Auth constants
  LOGIN: '/backend/login',
  SIGNUP: '/Api/user_register',
  FORGOT_PASSWORD: '/Api/forget_password',
  VERIFY_OTP: '/Api/verify_otp',
  REGISTER_VENDOR: '/backend/register/vendor',

  //Profile constants
  UPDATE_USER: '/Api/update_user',
  GET_USER: '/Api/user_details',

  //order history contants
  ORDER_HISTORY: '/Api/user_order_history',
  RECENT_HISTORY: '/Api/userDashboard',

  // Topup gas
  NEAR_BY_GAS_REFILL: '/Api/nearByGasAgencyForGasRefill',

  // Swap Cylinder
  SWAP_CYLINDER: '/Api/swapCylinder',
  nearByGasAgencyAsPerRequiredSize: '/Api/nearByGasAgencyAsPerRequiredSize',
  getAccessoriesAsPerNearestAgencies: '/Api/getAccessoriesAsPerNearestAgencies',
  checkout: '/Api/checkout',

  //Support
  getSupportHelpTopics: '/Api/getSupportHelpTopics',
  getSupportAccountRelatedIssues: '/Api/getSupportAccountRelatedIssues',
  support: '/Api/support',
  gas_order: '/Api/gas_order',
};

export {API_URLS};
