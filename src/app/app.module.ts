import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateDashboardComponent } from './components/create-dashboard/create-dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormInputComponent } from './components/form-input/form-input.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateDashboardComponent,
    NavbarComponent,
    FormInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
