import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateDashboardComponent } from './components/create-dashboard/create-dashboard.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'create-dashboard',
    component: CreateDashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
