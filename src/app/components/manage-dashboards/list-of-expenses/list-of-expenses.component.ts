import { ExpenseModel } from 'src/app/shared/models/expense.models';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'easy-list-of-expenses',
  templateUrl: './list-of-expenses.component.html',
  styleUrls: ['./list-of-expenses.component.scss']
})
export class ListOfExpensesComponent implements OnInit {

  @Input() expenses: ExpenseModel[];

  constructor(
  ) { }

  ngOnInit() {
  }

}
