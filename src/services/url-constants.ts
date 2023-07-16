const API_URLS = {
  //Auth constants
  LOGIN: '/backend/login',
  SIGNUP: '/backend/register/user',
  FORGOT_PASSWORD: '/Api/forget_password',
  VERIFY_OTP: '/Api/verify_otp',
  REGISTER_VENDOR: '/backend/register/vendor',

  //Profile constants
  UPDATE_USER: '/Api/update_user',
  GET_USER: '/backend/user/all_detail',

  //order history contants
  ORDER_HISTORY: '/Api/user_order_history',
  RECENT_HISTORY: '/backend/user/dashboard',

  // Topup gas
  NEAR_BY_GAS_REFILL: '/backend/orders/nearest_vendors',

  // Swap Cylinder
  SWAP_CYLINDER: '/Api/swapCylinder',
  nearByGasAgencyAsPerRequiredSize: '/Api/nearByGasAgencyAsPerRequiredSize',
  GET_NEAREST_ACCESSORIES: '/backend/orders/nearest_products',
  checkout: '/Api/checkout',

  //Support
  getSupportHelpTopics: '/backend/support/help_topics',
  getSupportAccountRelatedIssues: '/backend/support/account_related_issues',
  support: '/backend/support',
  ORDERS: '/backend/orders',
  NOTIFY_VENDOR: '/backend/user/notification',
  ORDER_EXPIRED: '/backend/orders/expired',

  //Accept Reject Order
  ACCEPT_ORDER: '/backend/orders/accepted',
  REJECT_ORDER: '/backend/orders/decline',
};

export {API_URLS};
