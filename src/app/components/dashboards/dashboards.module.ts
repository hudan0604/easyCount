import { SharedModule } from 'src/app/modules/shared/shared.module';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { LoadingComponent } from '../loading/loading.component';
import { DashboardDetailComponent } from './dashboard-detail/dashboard-detail.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardsLayoutComponent } from './dashboards-layout/dashboards-layout.component';
import { DashboardsListComponent } from './list/dashboards-list.component';
import {
    NoDashboardSelectedComponent
} from './no-dashboard-selected/no-dashboard-selected.component';
import { RowComponent } from './row/row.component';

const DASHBOARDS_ROUTES: Routes = [
  {
    path: '',
    component: DashboardsLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: NoDashboardSelectedComponent,
      }
      ,
      {
        path: 'view/:dashboardId',
        component: DashboardDetailComponent
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  },
];

@NgModule({
  declarations: [
    DashboardsLayoutComponent,
    DashboardHeaderComponent,
    DashboardComponent,
    DashboardsListComponent,
    DashboardDetailComponent,
    NoDashboardSelectedComponent,
    LoadingComponent,
    RowComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DASHBOARDS_ROUTES),
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class DashboardsModule {
 }
