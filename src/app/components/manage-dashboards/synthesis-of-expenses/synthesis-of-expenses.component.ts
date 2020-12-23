import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ExpenseModel } from 'src/app/shared/models/expense.models';
import { ExpenseService } from 'src/app/shared/services/expense.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'easy-synthesis-of-expenses',
  templateUrl: './synthesis-of-expenses.component.html',
  styleUrls: ['./synthesis-of-expenses.component.scss']
})
export class SynthesisOfExpensesComponent implements OnInit {
  expensesSubscription: Subscription;
  expensesInDashboard: ExpenseModel[];

  constructor(
    private expensesService: ExpenseService,
    private route: ActivatedRoute
  ) { }

  getExpenses() {
    this.expensesSubscription = this.route.paramMap
      .pipe(
        map((params: ParamMap) => params.get('dashboardId')),
        switchMap((id: string) =>  this.expensesService.getExpensesInDashboard(id))
    )
    .subscribe((expenses: ExpenseModel[]) => this.expensesInDashboard = expenses)

  }

  ngOnInit() {
    this.getExpenses();
  }

}
