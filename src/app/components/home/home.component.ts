import { Subscription } from 'rxjs';
import { DashboardModel } from 'src/app/shared/models/dashboards.models';
import { DashboardsService } from 'src/app/shared/services/dashboards.service';

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
    this.dashboardsSubscription = this.dashboardsService.getCreatedDashboards()
      .subscribe((dashboards: DashboardModel[]) => dashboards.length ? this.alreadyDashboards = true : this.firstDashboard = true);
  }

  ngOnDestroy() {
    if (this.dashboardsSubscription) this.dashboardsSubscription.unsubscribe();
  }
}
