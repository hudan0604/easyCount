import { Subscription } from 'rxjs';
import { MenuService } from 'src/app/shared/services/menu.service';
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
  constructor(
    private menuService: MenuService,
    private userService: UserService,
    private router: Router
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
    this.userService.logOut();
    this.router.navigate(['']);
  }

  ngOnInit() {
    this.menuSub = this.menuService.status.subscribe((status: boolean) => {
      this.status = status;
    });
  }

  ngOnDestroy() {
    this.menuSub.unsubscribe();
  }
}
