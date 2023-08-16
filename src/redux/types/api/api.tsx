import moment from 'moment';

export interface SupportResponse {
  id: number;
  supprt_topic_name: string;
  support_topic_description: string;
}
export interface AccountRealtedResponse {
  id: number;
  account_topic: string;
  account_topic_description: string;
}
export interface BranchesResponse {
  id: number;
  is_home: number;
  branch_user_id: number;
  vendor_id: number;
  branch_name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  branch_image: string;
  latitude: string;
  longitude: string;
  branch_status: string;
  branch_amount: string;
  df: string;
  def: string;
  createdate: moment.Moment;
  modifieddate: moment.Moment;
}

export interface VendorProductResponse {
  id: number;
  vendor_id: number;
  accessories_image: string;
  accessories_name: string;
  price: string;
  rating: number;
  no_of_solds: number;
  reviews: string;
  description: string;
  size_of_product: string;
  createdate: moment.Moment;
  modifieddate: moment.Moment;
  category_id: number;
  category_name: string;
  images: string[];
}

export interface VendorBusinessProfileResponse {
  business_id: number;
  business_name: string;
  business_phone: number;
  business_email: string;
  nin: number;
  rc_bn_number: number;
  branch_id: number;
  branch_store_manager_id: number;
  main_branch_store_manager_name: string;
  main_branch_address: string;
  regulatory_id: string;
  address_proof: string;
  cac_certificate: string;
  license_permit: string;
  regulatory_id_url: string;
  address_proof_url: string;
  cac_certificate_url: string;
  license_permit_url: string;
}
export interface VendorAccountDetialsResponse {
  bank: string;
  account_number: string;
  account_title: string;
}
export interface VendorOrderHistoryResponse {}
export interface OrderSummaryRes {}
export interface NotificationRes {}
export interface GeoLocationRes {}
