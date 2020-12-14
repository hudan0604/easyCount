import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    ManageDashboardsLayoutComponent
} from './manage-dashboards-layout/manage-dashboards-layout.component';

const MANAGE_DASHBOARDS_ROUTES: Routes = [
  {
    path: '',
    component: ManageDashboardsLayoutComponent,
  }
];

@NgModule({
  declarations: [ManageDashboardsLayoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(MANAGE_DASHBOARDS_ROUTES),
  ]
})
export class ManageDashboardsModule { }
