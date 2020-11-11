import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { DashboardDetailComponent } from './dashboard-detail/dashboard-detail.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardsLayoutComponent } from './dashboards-layout/dashboards-layout.component';
import { DashboardsSearchComponent } from './dashboards-search/dashboards-search.component';
import { DashboardsListComponent } from './list/dashboards-list.component';
import {
    NoDashboardSelectedComponent
} from './no-dashboard-selected/no-dashboard-selected.component';

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
        path: 'view/:activityName/detail',
        component: DashboardDetailComponent
      }
    ]
  },
];

@NgModule({
  declarations: [
    DashboardsLayoutComponent,
    DashboardHeaderComponent,
    DashboardsSearchComponent,
    DashboardComponent,
    DashboardsListComponent,
    DashboardDetailComponent,
    NoDashboardSelectedComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DASHBOARDS_ROUTES),
    FontAwesomeModule,
  ]
})
export class DashboardsModule {
 }
