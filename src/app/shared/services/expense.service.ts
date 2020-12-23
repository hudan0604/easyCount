import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { ExpenseModel } from '../models/expense.models';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  constructor(
    private http: HttpClient
  ) { }

  addExpense(expense: ExpenseModel): Observable<ExpenseModel> {
    return this.http.post<ExpenseModel>(`${environment.serverUrl}/expense/add`, expense);
  }

  getExpensesInDashboard(dashboardId: string): Observable<ExpenseModel[]> {
    return this.http.get<ExpenseModel[]>(`${environment.serverUrl}/expenses/${dashboardId}`);
  }
}
