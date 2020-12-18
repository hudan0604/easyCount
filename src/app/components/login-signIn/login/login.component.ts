import { UserModel } from 'src/app/shared/models/users.models';
import { DashboardsService } from 'src/app/shared/services/dashboards.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UserService } from 'src/app/shared/services/user.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'easy-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  mailAddressCtrl: FormControl;
  passwordCtrl: FormControl;
  showImage = false;
  logUserSubscription: any;
  dashboardId: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastService: ToastService,
    private router: Router,
    private dashboardService: DashboardsService
  ) { }

  initForm() {
    this.mailAddressCtrl = new FormControl('', Validators.required);
    this.passwordCtrl = new FormControl('', Validators.required);
    this.loginForm = this.fb.group({
      email: this.mailAddressCtrl,
      password: this.passwordCtrl
    })
  }

  logUser(formValue: { email: string, password: string }) {
    this.logUserSubscription = this.userService.logUser(formValue)
      .subscribe((user: UserModel) => {
        this.userService.setUserasLoggedIn(user);
        this.toastService.openToast('success', 'You logged in successfully !');
        this.router.navigate(['/home']);
        if (this.dashboardId) {
          this.addUserToDashboard(this.dashboardId, user._id);
        }
      },
        (e) => {
          this.toastService.openToast('error', 'Unknow user !');
        }
      );
  }

  addUserToDashboard(dashboardId: string, userId: string) {
    this.dashboardService.addUserToDashboard(dashboardId, userId)
      .subscribe(() => {
        this.toastService.openToast('success', 'You successfully joined the dashboard of your friend !')
      },
        (error) => {
      this.toastService.openToast('error', error.status === 404 ? "The dashboard you're tryring to join was not found..." : error)
    });
  }

  ngOnInit() {
    this.initForm();
    this.dashboardId = this.router.url.split('/')[2];
  }
  ngOnDestroy() {
    this.logUserSubscription.unsubscribe();
  }
}
