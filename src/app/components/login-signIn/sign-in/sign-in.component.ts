import { UserModel } from 'src/app/shared/models/users.models';
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
  signinUserSubscription: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastService: ToastService,
    private router: Router
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
    this.signinUserSubscription = this.userService.signUserIn(formValue)
      .subscribe(
        () => {
          this.toastService.openToast('success', 'You signed in successfully !');
          this.router.navigate(['/login']);
        },
        (error) => {
          this.toastService.openToast('error', error.error.reason);
        }

    );
  }

  ngOnInit() {
    this.initForm();
  }
}
