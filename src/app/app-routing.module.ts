import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateDashboardComponent } from './components/create-dashboard/create-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login-signIn/login/login.component';
import { SignInComponent } from './components/login-signIn/sign-in/sign-in.component';
import { LoggedInGuard } from './shared/guards/logged-in.guard';
import { NotLoggedInGuard } from './shared/guards/not-logged-in.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: '',
    // prevent from declaring the guard one each component
    canActivate: [NotLoggedInGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'sign-in',
        component: SignInComponent
      },
    ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'dashboards',
    loadChildren: () => import('../app/components/dashboards/dashboards.module').then(m => m.DashboardsModule),
    canLoad: [LoggedInGuard]
  },
  {
    path: 'create-dashboard',
    component: CreateDashboardComponent,
    canActivate: [LoggedInGuard]
  },
  {
    path: 'manage-dashboard',
    loadChildren: () => import('../app/components/manage-dashboards/manage-dashboards.module').then(m => m.ManageDashboardsModule),
    canLoad: [LoggedInGuard]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
