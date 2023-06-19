const API_URLS = {
  //Auth constants
  LOGIN: '/api/login',
  SIGNUP: '/Api/user_register',
  FORGOT_PASSWORD: '/Api/forget_password',
  VERIFY_OTP: '/Api/verify_otp',
  REGISTER_VENDOR: '/backend/register/vendor',

  //Profile constants
  UPDATE_USER: '/Api/update_user',
  GET_USER: '/Api/user_details',

  //order history contants
  ORDER_HISTORY: '/Api/user_order_history',
  RECENT_HISTORY: '/backend/user/dashboard',

  // Topup gas
  NEAR_BY_GAS_REFILL: '/backend/orders/nearest_vendors',

  // Swap Cylinder
  SWAP_CYLINDER: '/Api/swapCylinder',
  nearByGasAgencyAsPerRequiredSize: '/Api/nearByGasAgencyAsPerRequiredSize',
  getAccessoriesAsPerNearestAgencies: '/backend/user/nearest_products',
  checkout: '/Api/checkout',

  //Support
  getSupportHelpTopics: '/backend/support/help_topics',
  getSupportAccountRelatedIssues: '/backend/support/account_related_issues',
  support: '/backend/support',
  gas_order: '/Api/gas_order',
};

export {API_URLS};
