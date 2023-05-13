import moment from 'moment';

export interface OrderHistoryResponse {
  order_type: String;
  status: String;
  agency_name: String;
  price: String;
  weight: String;
  order_date: moment.Moment;
}
