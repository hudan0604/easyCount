import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { LoginComponent } from './components/login-signIn/login/login.component';
import { SignInComponent } from './components/login-signIn/sign-in/sign-in.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {
    SidenavMenuLinkComponent
} from './components/sidenav-menu-link/sidenav-menu-link.component';
import { ToastComponent } from './components/toast/toast.component';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateDashboardComponent,
    NavbarComponent,
    LateralMenuComponent,
    SidenavMenuLinkComponent,
    ToastComponent,
    LoginComponent,
    SignInComponent
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
    {
      provide : HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi   : true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
