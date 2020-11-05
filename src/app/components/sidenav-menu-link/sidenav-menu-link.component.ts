import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'easy-sidenav-menu-link',
  templateUrl: './sidenav-menu-link.component.html',
  styleUrls: ['./sidenav-menu-link.component.scss']
})
export class SidenavMenuLinkComponent implements OnInit {

  @Input() link: {name: string, url: string};

  constructor() { }

  ngOnInit() {
  }

}
