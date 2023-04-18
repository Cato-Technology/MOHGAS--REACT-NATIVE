import moment from 'moment';

export interface SessionResponse {
  _id: String;
  sessionTitle: String;
  yesRate: Number;
  noRate: Number;
  createdAt: moment.Moment;
  updatedAt: moment.Moment;
}
