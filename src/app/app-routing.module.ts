import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateDashboardComponent } from './components/create-dashboard/create-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ManageDashboardComponent } from './components/manage-dashboard/manage-dashboard.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'create-dashboard',
    component: CreateDashboardComponent,
  },
  {
    path: 'manage-dashboard',
    component: ManageDashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
