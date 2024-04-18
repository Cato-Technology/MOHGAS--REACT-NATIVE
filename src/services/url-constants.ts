const backend_URLS = {
  //Auth constants
  LOGIN: '/backend/login',
  SIGNUP: '/backend/register/user',
  FORGOT_PASSWORD: '/backend/register/forget_password',
  VERIFY_OTP: '/backend/register/otp_verification',
  VERIFY_OTP_ACCOUNT: '/backend/register/verification',
  REGISTER_VENDOR: '/backend/register/vendor',

  SEND_ACC_VERIFY: '/backend/register/new_otp',

  //Profile constants
  UPDATE_USER: '/backend/user',
  GET_USER: '/backend/user/all_detail',

  //order history contants
  ORDER_HISTORY: '/backend/user_order_history',
  // RECENT_HISTORY: '/backend/user/dashboard',
  RECENT_HISTORY: '/backend/user/full_order_history?user_id=17',


  // Topup gas
  NEAR_BY_GAS_REFILL: '/backend/orders/nearest_vendors',

  GET_ONLINE_BRANCH_BY_CITY: '/backend/user/getOnlineBranchesByCity',

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
  REJECT_ORDER: '/backend/orders/declined',
  COMPLETE_ORDER: '/backend/orders/mark_order_as_complete',
  GET_STATES: '/backend/register/states',
  GET_CITIES: '/backend/register/cities',
  GET_LGA: '/backend/register/lga',
  GET_TOPUP_WALLET_DETAILS: '/backend/user/wallet',

  NEW_PASSWORD: '/backend/register/new_password',

  //fund
  FUND_WALLET: '/backend/paymentController/pay',

  GET_WALLET_BALANCE: '/backend/user/getUserWallet',
  REQUEST_WITHDRAWAL: '/backend/vendor/processWithdrawal',


  GET_PROFILE_CHECK: '/backend/vendor/check_user_business_profile'
};

export { backend_URLS };
