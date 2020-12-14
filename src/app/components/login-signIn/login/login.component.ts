import { debounceTime, tap } from 'rxjs/operators';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UserService } from 'src/app/shared/services/user.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'easy-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  mailAddressCtrl: FormControl;
  passwordCtrl: FormControl;
  showImage = false;
  logUserSubscription: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toastService: ToastService,
    private router: Router
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
      .subscribe(() => {
        this.userService.isUserLoggedIn.next(true);
        this.router.navigate(['/home']);
      },
        () => this.toastService.openToast('error', 'Unknow user !')

    )
  }

  ngOnInit() {
    this.initForm();
    this.passwordCtrl.valueChanges
      .pipe(
        tap(() => this.showImage = true),
        debounceTime(1000),
      )
      .subscribe(() => this.showImage = false);
  }
}
