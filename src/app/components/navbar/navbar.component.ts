import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'easy-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @ViewChild('nav', {static: false}) navBar: ElementRef<HTMLElement>;

  isScrolled = false;
  constructor() {}

  @HostListener('window:scroll', ['$event'])
    handleScroll() {
      const windowScroll = window.pageYOffset;
      this.isScrolled = windowScroll > 80 ? true : false;
    }

}
