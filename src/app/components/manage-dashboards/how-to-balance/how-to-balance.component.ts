import { BalanceModel } from 'src/app/shared/models/balances.models';
import { ExpenseModel } from 'src/app/shared/models/expense.models';
import { UserModel } from 'src/app/shared/models/users.models';

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'easy-how-to-balance',
  templateUrl: './how-to-balance.component.html',
  styleUrls: ['./how-to-balance.component.scss']
})
export class HowToBalanceComponent implements OnInit {

  @Input() expenses: ExpenseModel[];
  finalArrayOfPersonalDebts: BalanceModel[] = [];

  constructor() { }

  calculateEachPersonDebt() {
    this.expenses.map((expense: ExpenseModel) => {
      expense.forPeople.map((person: UserModel) => {
        const personFullName = `${person.firstName} ${person.lastName}`;
        const personWhoPaiedFullName = `${expense.paiedBy.firstName} ${expense.paiedBy.lastName}`;
        if (!this.finalArrayOfPersonalDebts.find((debt)=> debt.name === personFullName)) {
          this.finalArrayOfPersonalDebts.push(
            {
              name: personFullName,
              debts:
                [{
                  owes: (expense.amount / expense.forPeople.length),
                  to: personWhoPaiedFullName
                }]
            }
          );
        }
        else {
          const indexOfPersonName = this.finalArrayOfPersonalDebts.findIndex((debt) => debt.name === personFullName);
          const debtIndex = this.finalArrayOfPersonalDebts[indexOfPersonName].debts.findIndex((personDebts) => personDebts.to === personWhoPaiedFullName);
          debtIndex !== -1 ? this.finalArrayOfPersonalDebts[indexOfPersonName].debts[debtIndex].owes += expense.amount / expense.forPeople.length : this.finalArrayOfPersonalDebts[indexOfPersonName].debts.push({ owes: expense.amount / expense.forPeople.length, to: personWhoPaiedFullName });
        }
      });
    });
  }

  ngOnInit() {
    this.calculateEachPersonDebt();
  }
}
