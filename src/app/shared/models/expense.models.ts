import { UserModel } from './users.models';

export interface ExpenseModel {
  expenseName: string,
  creationDate: string,
  amount: number,
  paiedBy: UserModel,
  forPeople: UserModel[],
  dashboardId: string
}
