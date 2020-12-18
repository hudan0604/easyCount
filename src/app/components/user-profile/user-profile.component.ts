import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/shared/models/users.models';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UserService } from 'src/app/shared/services/user.service';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'easy-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  animations: [
		trigger('fade', [
			state('fadeIn', style({ opacity: 1, visibility: 'normal' })),
			state('fadeOut', style({ opacity: 0, visibility: 'hidden' })),
			transition('* <=> *', [
				animate(250)
			])
		])
	]
})
export class UserProfileComponent implements OnInit {
  user: UserModel = {
    firstName: '',
    lastName: '',
    email: ''
  };
  userProfileOpenClosedSubscription: Subscription;
  userLogoutSubscription: Subscription;
  openProfile = false;
  userProfileSubscription: Subscription;

  @HostBinding('@fade')
  get fade(): string {
    return this.openProfile ? 'fadeIn' : 'fadeOut';
  }

  constructor(
    private localStorage: LocalStorageService,
    private userService: UserService,
    private toastService: ToastService,
    private router: Router
  ) { }

  watchUserProfileOpenClosedStatus() {
    this.userProfileOpenClosedSubscription = this.userService.openUserProfileComponent$
      .subscribe((status: boolean) => {
        this.openProfile = status;
        status ? this.getAuthUser() : this.user = {firstName: '', lastName: ''};
      });
  }

  logout() {
    this.userLogoutSubscription = this.userService.logout(this.user)
      .subscribe(() => {
        this.userService.userLoggedIn.next(null);
        this.localStorage.removeItem('user');
        this.toastService.openToast('success', 'You logged out successfully');
        this.closeUserProfilePanel();
        this.router.navigate(['']);
      },
      () => this.toastService.openToast('error', 'Error while attempting to disconnect'));
  }

  closeUserProfilePanel() {
    this.userService.openUserProfileComponent.next(false);
  }

  deleteUserAccount() {
    return this.userService.deleteUserAccount()
      .subscribe(() => {
        this.localStorage.clearLocalStorage();
        this.router.navigate(['']);
        this.toastService.openToast('success', 'Your account has been deleted. Come back soon :-)')
      });
  }

  getAuthUser() {
    this.userProfileSubscription = this.userService.getAuthUser()
      .subscribe(
        (user: UserModel) => {
        this.user = user;
        });
  }

  ngOnInit() {
    this.watchUserProfileOpenClosedStatus();
  }

  ngOnDestroy() {
    this.userProfileOpenClosedSubscription.unsubscribe();
    this.userLogoutSubscription.unsubscribe();
    this.userProfileSubscription.unsubscribe();
  }
}
