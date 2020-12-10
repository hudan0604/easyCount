import { Subscription } from 'rxjs';
import { DashboardModel } from 'src/app/shared/models/dashboards.models';
import { DashboardsService } from 'src/app/shared/services/dashboards.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'easy-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  firstDashboard = undefined;
  alreadyDashboards = undefined;
  title = ['W', 'e', 'l', 'c', 'o', 'm', 'e', ' ', 't', 'o', ' ', 'E', 'a', 's', 'y', 'C', 'o', 'u', 'n', 't', ' ', '!'];
  dashboardsSubscription: Subscription;

  constructor(
    private dashboardsService: DashboardsService,
  ) {}

  ngOnInit() {
    this.dashboardsSubscription = this.dashboardsService.getDashboards()
      .subscribe((dashboards: DashboardModel[]) => dashboards ? this.alreadyDashboards = true : this.firstDashboard = true);
  }

  ngOnDestroy() {
    this.dashboardsSubscription.unsubscribe();
  }
}
