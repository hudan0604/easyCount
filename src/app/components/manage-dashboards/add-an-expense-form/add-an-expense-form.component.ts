import { Subscription } from 'rxjs';
import { DashboardModel } from 'src/app/shared/models/dashboards.models';
import { ExpenseModel } from 'src/app/shared/models/expense.models';
import { UserModel } from 'src/app/shared/models/users.models';
import { DashboardsService } from 'src/app/shared/services/dashboards.service';
import { ExpenseService } from 'src/app/shared/services/expense.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { RoutingService } from 'src/app/shared/services/routing.service';
import { ToastService } from 'src/app/shared/services/toast.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import {
    AbstractHandleCheckedItemsClass
} from '../../../shared/abstract-classes/abstract-handle-checked-items.class';
import {
    SynthesisOfExpensesComponent
} from '../synthesis-of-expenses/synthesis-of-expenses.component';

@Component({
  selector: 'easy-add-an-expense-form',
  templateUrl: './add-an-expense-form.component.html',
  styleUrls: ['./add-an-expense-form.component.scss'],
  providers: [
    SynthesisOfExpensesComponent
  ]
})
export class AddAnExpenseFormComponent extends AbstractHandleCheckedItemsClass implements OnInit, OnDestroy {

  addExpenseForm: FormGroup;
  expenseNameCtrl: FormControl;
  creationDateCtrl: FormControl;
  amountCtrl: FormControl;
  usersSubscription: Subscription;
  users: UserModel[];
  showUsers = false;
  dashboardId: string;
  addExpenseSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private dashboardsService: DashboardsService,
    private router: Router,
    private expenseService: ExpenseService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    public localStorage: LocalStorageService,
    private routingService: RoutingService
  ) {
    super(localStorage);
  }

  initForm() {
    this.expenseNameCtrl = this.fb.control('', Validators.required);
    this.creationDateCtrl = this.fb.control('', Validators.required);
    this.amountCtrl = this.fb.control('', Validators.required);
    this.addExpenseForm = this.fb.group({
      expenseName: this.expenseNameCtrl,
      creationDate: this.creationDateCtrl,
      amount: this.amountCtrl,
    })
  }

  getUsersInvoldedInDashboard() {
    this.usersSubscription = this.dashboardsService.getSpecificDashboard(this.dashboardId)
    .subscribe((dashboard: DashboardModel) => this.users = dashboard.people)
  }

  manageUser(add: boolean, userId: string) {
    add ? this.addItemToTheListToHandle(userId) : this.removeItemFromTheListToHandle(userId);
  }

  toggleUsers() {
    this.showUsers = !this.showUsers;
  }

  addExpense(expense: ExpenseModel): void {
    expense.forPeople = this.localStorage.getValueParsed('ids-to-handle');
    expense.dashboardId = this.dashboardId;
    expense.paiedBy = this.localStorage.getValueParsed('user')._id;
    this.addExpenseSubscription = this.expenseService.addExpense(expense)
      .subscribe(() => {
        this.toastService.openToast('success', 'Expense added successfully !');
        this.returnToAddExpenseIcon().then(()=> this.routingService.reloadUrl());
      },
        (error) => this.toastService.openToast('error', error));
  }

  returnToAddExpenseIcon(): Promise<boolean> {
    return this.router.navigate(['../'], { relativeTo: this.route });
  }

  ngOnInit() {
    this.dashboardId = this.router.url.split('/')[3];
    this.initForm();
    this.getUsersInvoldedInDashboard();
  }

  ngOnDestroy() {
    this.localStorage.removeItem('ids-to-handle');
  }
}
