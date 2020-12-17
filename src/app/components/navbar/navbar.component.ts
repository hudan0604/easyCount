import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/shared/models/users.models';
import { MenuService } from 'src/app/shared/services/menu.service';
import { UserService } from 'src/app/shared/services/user.service';

import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { faEllipsisV, faUserCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'easy-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  faMenu = faEllipsisV;
  profileIcon = faUserCircle;
  @ViewChild('nav', {static: false}) navBar: ElementRef<HTMLElement>;

  isScrolled = false;
  status = false;
  menuSub: Subscription;
  openProfile = false;
  userLoggedInSubscription: Subscription;
  userLoggedIn = false;

  constructor(
    private menuService: MenuService,
    private userService: UserService,
  ) { }

  @HostListener('window:scroll', ['$event'])
    handleScroll() {
      const windowScroll = window.pageYOffset;
      this.isScrolled = windowScroll > 80 ? true : false;
  }

  toggleMenu(): void {
    this.menuService.setLateralMenuStatus(!this.status);
  }

  openUserProfile() {
    this.openProfile = !this.openProfile;
    this.userService.openUserProfileComponent.next(this.openProfile);
  }

  ngOnInit() {
    this.menuSub = this.menuService.status.subscribe((status: boolean) => {
      this.status = status;
    });
    this.userLoggedInSubscription = this.userService.userLoggedIn$
    .subscribe((user: UserModel) => this.userLoggedIn = user ? true : false)
  }

  ngOnDestroy() {
    this.menuSub.unsubscribe();
  }
}
