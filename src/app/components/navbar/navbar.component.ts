import { MenuService } from 'src/app/shared/services/menu.service';

import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'easy-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  faMenu = faEllipsisV;
  @ViewChild('nav', {static: false}) navBar: ElementRef<HTMLElement>;

  isScrolled = false;
  status = false;
  constructor(private menuService: MenuService) {}

  @HostListener('window:scroll', ['$event'])
    handleScroll() {
      const windowScroll = window.pageYOffset;
      this.isScrolled = windowScroll > 80 ? true : false;
  }

  toggleMenu(): void {
    this.status = !this.status;
    console.log('navbar click on menu logo - this.open = ', this.status);
    this.menuService.setLateralMenuStatus(this.status);
  }
}
