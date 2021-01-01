import { Subscription } from 'rxjs';
import { ExpenseModel } from 'src/app/shared/models/expense.models';
import { ExpenseService } from 'src/app/shared/services/expense.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'easy-synthesis-of-expenses',
  templateUrl: './synthesis-of-expenses.component.html',
  styleUrls: ['./synthesis-of-expenses.component.scss']
})
export class SynthesisOfExpensesComponent implements OnInit, OnDestroy {
  expensesSubscription: Subscription;
  expensesInDashboard: ExpenseModel[];
  showExpensesComponent = true;

  constructor(
    private expensesService: ExpenseService,
    private router: Router
  ) { }

  getExpenses() {
    const dashboardId = this.router.url.split('/')[3];
    this.expensesSubscription = this.expensesService.getExpensesInDashboard(dashboardId)
      .subscribe((expenses: ExpenseModel[]) => this.expensesInDashboard = expenses);
  }

  toggleOnglet(status: boolean) {
    this.showExpensesComponent = status ? true : false;
  }

  ngOnInit() {
    this.getExpenses();
  }

  ngOnDestroy() {
    if (this.expensesSubscription) this.expensesSubscription.unsubscribe();
  }
}
