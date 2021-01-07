import { ExpenseModel } from 'src/app/shared/models/expense.models';
import { UserModel } from 'src/app/shared/models/users.models';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'easy-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  @Input() expenses: ExpenseModel[];
  expensesBalance = {};
  finalArrayOfBalances = [];
  expensesTotal: number = null;

  constructor() { }

  calculateEachPersonBalance() {
    this.expenses.map((expense: ExpenseModel) => {
      this.expensesTotal += expense.amount;
      const fullName = `${expense.paiedBy.firstName} ${expense.paiedBy.lastName}`;
      this.expensesBalance[fullName] = this.expensesBalance[fullName] ? this.expensesBalance[fullName] + expense.amount : expense.amount;
      expense.forPeople.map((user: UserModel) => {
        const fullName = `${user.firstName} ${user.lastName}`;
        this.expensesBalance[fullName] = this.expensesBalance[fullName] ? this.expensesBalance[fullName] - (expense.amount / expense.forPeople.length) : - (expense.amount / expense.forPeople.length);
      });
    });
    // Transform object into array of objects; each obj represents a person with its balance
    // This will be useful into balance component template to iterate over each array obj
    Object.keys(this.expensesBalance).map((key) =>
      this.finalArrayOfBalances.push({
        personFullName: key,
        balance: this.expensesBalance[key]
      }));
  }

  isBalancePositive(balance: string): boolean {
    return balance.toString().includes('-') ? false : true;
  }

  calculateBalanceRowWidth(personBalance: number, balanceSign: 'positive' | 'negative'): string {
    return balanceSign === 'positive' ? "balance balance-positive width_" + Math.round((personBalance / this.expensesTotal) * 100) : "balance balance-debt width_" + Math.round((Math.abs(personBalance) / this.expensesTotal) * 100);
  }

  ngOnInit() {
    this.calculateEachPersonBalance();
  }

}
