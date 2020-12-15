import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { MenuService } from 'src/app/shared/services/menu.service';
import { ToastService } from 'src/app/shared/services/toast.service';
import { UserService } from 'src/app/shared/services/user.service';

import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faEllipsisV, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'easy-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  faMenu = faEllipsisV;
  logOutIcon = faSignOutAlt;
  @ViewChild('nav', {static: false}) navBar: ElementRef<HTMLElement>;

  isScrolled = false;
  status = false;
  menuSub: Subscription;
  userLogoutSubscription: Subscription;
  constructor(
    private menuService: MenuService,
    private userService: UserService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private toastService: ToastService
  ) { }

  @HostListener('window:scroll', ['$event'])
    handleScroll() {
      const windowScroll = window.pageYOffset;
      this.isScrolled = windowScroll > 80 ? true : false;
  }

  toggleMenu(): void {
    this.menuService.setLateralMenuStatus(!this.status);
  }

  logOut() {
    this.userLogoutSubscription = this.userService.logout(this.localStorageService.getValueParsed('user'))
      .subscribe(() => {
        this.userService.userLoggedIn.next(null);
        this.localStorageService.removeItem('user');
        this.toastService.openToast('success', 'You logged out successfully')
        this.router.navigate(['']);
      },
      () => this.toastService.openToast('error', 'Error while attempting to disconnect'));
  }

  ngOnInit() {
    this.menuSub = this.menuService.status.subscribe((status: boolean) => {
      this.status = status;
    });
  }

  ngOnDestroy() {
    this.menuSub.unsubscribe();
    this.userLogoutSubscription.unsubscribe();
  }
}
