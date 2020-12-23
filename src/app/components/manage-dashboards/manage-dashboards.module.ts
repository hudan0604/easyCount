import { SharedModule } from 'src/app/modules/shared/shared.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import {
    AddAnExpenseButtonComponent
} from './add-an-expense-button/add-an-expense-button.component';
import { AddAnExpenseFormComponent } from './add-an-expense-form/add-an-expense-form.component';
import { BalanceComponent } from './balance/balance.component';
import { DashboardsDropdownComponent } from './dashboards-dropdown/dashboards-dropdown.component';
import { ListOfExpensesComponent } from './list-of-expenses/list-of-expenses.component';
import {
    ManageDashboardsLayoutComponent
} from './manage-dashboards-layout/manage-dashboards-layout.component';
import { ManageDashboardsComponent } from './manage-dashboards/manage-dashboards.component';
import {
    NoDashboardSelectedComponent
} from './no-dashboard-selected/no-dashboard-selected.component';
import {
    SynthesisOfExpensesComponent
} from './synthesis-of-expenses/synthesis-of-expenses.component';

const MANAGE_DASHBOARDS_ROUTES: Routes = [
  {
    path: '',
    component: ManageDashboardsLayoutComponent,
    children: [
      {
        path: '',
        component: NoDashboardSelectedComponent
      },
      {
        path: 'detail/:dashboardId',
        component: ManageDashboardsComponent,
        children: [
          {
            path: '',
            component: AddAnExpenseButtonComponent
          },
          {
            path: 'add-expense',
            component: AddAnExpenseFormComponent
          }
        ]
      },
    ],
  }
];

@NgModule({
  declarations: [
    ManageDashboardsLayoutComponent,
    DashboardsDropdownComponent,
    AddAnExpenseButtonComponent,
    AddAnExpenseFormComponent,
    SynthesisOfExpensesComponent,
    ManageDashboardsComponent,
    NoDashboardSelectedComponent,
    ListOfExpensesComponent,
    BalanceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(MANAGE_DASHBOARDS_ROUTES),
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ManageDashboardsModule { }
