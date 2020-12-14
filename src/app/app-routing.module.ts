import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateDashboardComponent } from './components/create-dashboard/create-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login-signIn/login/login.component';
import { SignInComponent } from './components/login-signIn/sign-in/sign-in.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'dashboards',
    loadChildren: () => import('../app/components/dashboards/dashboards.module').then(m => m.DashboardsModule),
  },
  {
    path: 'create-dashboard',
    component: CreateDashboardComponent,
  },
  {
    path: 'manage-dashboard',
    loadChildren: () => import('../app/components/manage-dashboards/manage-dashboards.module').then(m => m.ManageDashboardsModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
