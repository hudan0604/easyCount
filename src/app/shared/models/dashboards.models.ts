import { UserModel } from './users.models';

export interface DashboardModel {
  activityName: string;
  creationDate: string;
  dashboardCreator?: UserModel;
  people: UserModel[];
  _id?: string;
}
