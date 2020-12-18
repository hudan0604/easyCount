import { UserModel } from 'src/app/shared/models/users.models';
import { DashboardsService } from 'src/app/shared/services/dashboards.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UserService } from 'src/app/shared/services/user.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'easy-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  signInForm: FormGroup;
  firstNameCtrl: FormControl;
  lastNameCtrl: FormControl;
  mailCtrl: FormControl;
  passwordCtrl: FormControl;
  dashboardId: string;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastService: ToastService,
    private router: Router,
    private dashboardService: DashboardsService
  ) { }

  initForm() {
    this.firstNameCtrl = this.fb.control('', Validators.required);
    this.lastNameCtrl = this.fb.control('', Validators.required);
    this.mailCtrl = this.fb.control('', [Validators.required, Validators.email]);
    // 1 number, 1 lowercase letter, 1 uppercase letter, 1 special character , min 8 digits max 32 digits
    this.passwordCtrl = this.fb.control('', Validators.required);
    this.signInForm = this.fb.group({
      firstName: this.firstNameCtrl,
      lastName: this.lastNameCtrl,
      email: this.mailCtrl,
      password: this.passwordCtrl
    })
  }

  signUserIn(formValue: UserModel) {
    this.userService.signUserIn(formValue)
      .subscribe(
        (user: UserModel) => {
          // user has been invited to join a dashboard
          if (this.dashboardId) {
            this.addUserToDashboard(this.dashboardId, user._id);
          } else {
              // do sign-in actions as usual : toast and redirection to login page
              this.toastService.openToast('success', 'You signed in successfully !');
              this.navigateToLoginPage();
          }
        },
        (error) => {
          error
          this.toastService.openToast('error', error.status === 409 ? error.error.reason : 'Error while signin in');
        }
    );
  }

  addUserToDashboard(dashboardId: string, userId: string) {
    this.dashboardService.addUserToDashboard(dashboardId, userId)
      .subscribe(() => {
        this.toastService.openToast('success', 'You successfully signed in and joined the dashboard of your friend !')
        this.navigateToLoginPage();
      },
        (error) => {
      this.toastService.openToast('error', error.status === 404 ? "The dashboard you're tryring to join was not found..." : error)
    });
  }

  navigateToLoginPage() {
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.initForm();
    this.dashboardId = this.router.url.split('/')[2];
  }
}
