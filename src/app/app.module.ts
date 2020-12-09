import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateDashboardComponent } from './components/create-dashboard/create-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LateralMenuComponent } from './components/lateral-menu/lateral-menu.component';
import { ManageDashboardComponent } from './components/manage-dashboard/manage-dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {
    SidenavMenuLinkComponent
} from './components/sidenav-menu-link/sidenav-menu-link.component';
import { ToastComponent } from './components/toast/toast.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateDashboardComponent,
    NavbarComponent,
    ManageDashboardComponent,
    LateralMenuComponent,
    SidenavMenuLinkComponent,
    ToastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
