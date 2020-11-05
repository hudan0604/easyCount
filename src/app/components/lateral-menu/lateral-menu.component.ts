import { Subscription } from 'rxjs';
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
        backgroundColor: '#d5cfcc',
        height: '100%',
      })),
      state('closed', style({
        width: '0px',
        opacity: 0,
        height: '100%'
      })),
      transition('open => closed', animate('0.4s')
      ),
      transition('closed => open', animate('0.6s')
      ),
    ]),
  ],
  templateUrl: './lateral-menu.component.html',
  styleUrls: ['./lateral-menu.component.scss'],
})
export class LateralMenuComponent implements OnInit, OnDestroy {
  openMenu = false;
  sub: Subscription;

  constructor(
    private menuService: MenuService,
  ) { }

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
