import { Subscription } from 'rxjs';
import { DashboardModel } from 'src/app/shared/models/dashboards.models';
import { DashboardsService } from 'src/app/shared/services/dashboards.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'easy-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrls: ['./dashboard-detail.component.scss'],
})
export class DashboardDetailComponent implements OnInit, OnDestroy {
  dashboardSubscription: Subscription;
  dashboard: DashboardModel = {
    activityName: '',
    creationDate: '',
    dashboardCreator: {firstName: '', lastName: ''},
    people: [{
      firstName: '',
      lastName: '',
      email: ''
    }]
  };
  dashboardId: string;

  constructor(
    private dashboardService: DashboardsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.dashboardSubscription = this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('dashboardId');
      this.dashboardService.getSpecificDashboard(id).subscribe((dashboard: DashboardModel) => (this.dashboard = dashboard));
    });
  }

  ngOnDestroy() {
    this.dashboardSubscription.unsubscribe();
  }
}
