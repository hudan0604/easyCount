import { Subscription } from 'rxjs';
import { SidenavLinkModel } from 'src/app/shared/models/sidenav-link.models';
import { MenuService } from 'src/app/shared/services/menu.service';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'easy-lateral-menu',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        width: '200px',
        height: '100%',
        visibility: 'visible'
      })),
      state('closed', style({
        width: '0px',
        opacity: 0,
        height: '100%'
      })),
      transition('open <=> closed', animate('0.4s')
      ),
    ]),
  ],
  templateUrl: './lateral-menu.component.html',
  styleUrls: ['./lateral-menu.component.scss'],
})
export class LateralMenuComponent implements OnInit, OnDestroy {
  openMenu = false;
  sub: Subscription;
  links: SidenavLinkModel[] = [
    { name: 'Dashboards', url: 'dashboards'},
    { name: 'Manage', url: 'manage-dashboard'},
    { name: 'Data viz', url: 'data-viz' },
  ];

  constructor(
    private menuService: MenuService,
  ) { }

  hideMenu() {
    this.menuService.setLateralMenuStatus(false);
  }

  ngOnInit() {
    this.sub = this.menuService.lateralMenuStatus
      .subscribe(
        (status: boolean) => {
        this.openMenu = status;
        }
      );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
