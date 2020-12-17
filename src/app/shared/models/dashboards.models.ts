import { UserModel } from './users.models';

export interface DashboardModel {
  activityName: string;
  creationDate: string;
  dashboardCreator?: string;
  people: UserModel[];
  _id?: string;
}
