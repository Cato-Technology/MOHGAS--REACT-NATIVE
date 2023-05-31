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
