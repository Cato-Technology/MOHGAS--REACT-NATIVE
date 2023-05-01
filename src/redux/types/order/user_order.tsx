import moment from 'moment';

export interface OrderHistoryResponse {
  order_type: String;
  status: String;
  agency_name: String;
  order_date: moment.Moment;
}
