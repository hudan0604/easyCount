import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardDetailComponent } from './dashboard-detail/dashboard-detail.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardsLayoutComponent } from './dashboards-layout/dashboards-layout.component';
import { DashboardsSearchComponent } from './dashboards-search/dashboards-search.component';
import { DashboardsListComponent } from './list/dashboards-list.component';

const DASHBOARDS_ROUTES: Routes = [
  {
    path: '',
    component: DashboardsLayoutComponent,
    children: [
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
    DashboardDetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DASHBOARDS_ROUTES),
  ]
})
export class DashboardsModule {
 }
