import moment from 'moment';

export interface TeamResponse {
  name: String;
  score: Number;
  overs: Number;
  outs: Number;
  status: String;
}
export interface DashBoardResponse {
  _id: String;
  teamOne: TeamResponse;
  teamTwo: TeamResponse;
  message: String;
  matchStatus: String;
  createdAt: moment.Moment;
  updatedAt: moment.Moment;
}
