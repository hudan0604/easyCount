import { Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { MenuService } from './shared/services/menu.service';

@Component({
  selector: 'easy-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'easyCount';
  openMenu = false;
  sub: Subscription;

  constructor(
    private menuService: MenuService,
  ) { }

  closeLateralMenu(): void {
    this.menuService.setLateralMenuStatus(false);
  }

  ngOnInit() {
    this.menuService.lateralMenuStatus
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
