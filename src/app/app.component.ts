import { Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { ToastModel } from './shared/models/toast.model';
import { UserModel } from './shared/models/users.models';
import { LocalStorageService } from './shared/services/local-storage.service';
import { MenuService } from './shared/services/menu.service';
import { ToastService } from './shared/services/toast.service';
import { UserService } from './shared/services/user.service';

@Component({
  selector: 'easy-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'easyCount';
  openMenu = false;
  lateralMenuSub: Subscription;
  toastSub: Subscription;
  config: ToastModel = {
    open: '',
    content: '',
    toastStatus: ''
  };
  openToast = false;
  userLoggedInSubscription: Subscription;
  userLoggedIn = false;

  constructor(
    private menuService: MenuService,
    private toastService: ToastService,
    private userService: UserService,
  ) { }

  closeLateralMenu(): void {
    this.menuService.setLateralMenuStatus(false);
  }

  watchLateralMenuStatus(): void {
    this.lateralMenuSub = this.menuService.lateralMenuStatus
      .subscribe(
        (status: boolean) => {
        this.openMenu = status;
        }
    );
  }

  toggleToast(): void {
    setTimeout(() => {
      this.toastService.closeToast();
      }, 8000);
    }

  watchToastStatus(): void {
    this.toastSub = this.toastService.$toastConfig
      .subscribe((config: ToastModel) => {
        this.config = config;
        if (this.config.open) {
          this.toggleToast();
        }
      });
  }

  isUserLoggedIn() {
    this.userLoggedInSubscription = this.userService.userLoggedIn$
      .subscribe((user: UserModel) => this.userLoggedIn = user ? true : false);
  }

  ngOnInit() {
    this.watchLateralMenuStatus();
    this.watchToastStatus();
    this.isUserLoggedIn();
  }

  ngOnDestroy() {
    this.lateralMenuSub.unsubscribe();
    this.toastSub.unsubscribe();
    this.userLoggedInSubscription.unsubscribe();
  }

}
