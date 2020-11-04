import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { CreateDashboardComponent } from './components/create-dashboard/create-dashboard.component';
import { FormInputComponent } from './components/form-input/form-input.component';
import { HomeComponent } from './components/home/home.component';
import { LateralMenuComponent } from './components/lateral-menu/lateral-menu.component';
import { ManageDashboardComponent } from './components/manage-dashboard/manage-dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateDashboardComponent,
    NavbarComponent,
    FormInputComponent,
    ButtonComponent,
    ManageDashboardComponent,
    LateralMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CommonModule,
    BrowserAnimationsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
