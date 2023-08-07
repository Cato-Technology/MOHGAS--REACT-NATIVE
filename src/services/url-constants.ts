const backend_URLS = {
  //Auth constants
  LOGIN: '/backend/login',
  SIGNUP: '/backend/register/user',
  FORGOT_PASSWORD: '/backend/forget_password',
  VERIFY_OTP: '/backend/verify_otp',
  REGISTER_VENDOR: '/backend/register/vendor',

  //Profile constants
  UPDATE_USER: '/backend/user',
  GET_USER: '/backend/user/all_detail',

  //order history contants
  ORDER_HISTORY: '/backend/user_order_history',
  RECENT_HISTORY: '/backend/user/dashboard',

  // Topup gas
  NEAR_BY_GAS_REFILL: '/backend/orders/nearest_vendors',

  // Swap Cylinder
  SWAP_CYLINDER: '/backend/orders/swap',
  nearByGasAgencyAsPerRequiredSize: '/backend/nearByGasAgencyAsPerRequiredSize',
  GET_NEAREST_ACCESSORIES: '/backend/orders/nearest_products',
  checkout: '/backend/checkout',

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
  GET_STATES: '/backend/settings/states',
  GET_CITIES: '/backend/settings/cities',
  GET_TOPUP_WALLET_DETAILS: '/backend/user/wallet',
};

export {backend_URLS};
