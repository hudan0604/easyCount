import { Subscription } from 'rxjs';
import { DashboardModel } from 'src/app/shared/models/dashboards.models';
import { DashboardsService } from 'src/app/shared/services/dashboards.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'easy-manage-dashboards-layout',
  templateUrl: './manage-dashboards-layout.component.html',
  styleUrls: ['./manage-dashboards-layout.component.scss']
})
export class ManageDashboardsLayoutComponent implements OnInit {
  dashboardsSubscription: Subscription;
  dashboards: DashboardModel[];

  constructor(private dashboardsService: DashboardsService) { }

  getDashboards() {
    this.dashboardsSubscription = this.dashboardsService.getDashboards()
      .subscribe((dashboards: DashboardModel[]) => this.dashboards = dashboards);
  }

  ngOnInit() {
    this.getDashboards();
  }

}
