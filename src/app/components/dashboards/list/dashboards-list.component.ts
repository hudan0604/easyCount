import { Subscription } from 'rxjs';
import { DashboardModel } from 'src/app/shared/models/dashboards.models';
import { DashboardsService } from 'src/app/shared/services/dashboards.service';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { OpenAnimationService } from '../shared/services/open-animation.service';
import { SearchService } from '../shared/services/search.service';

@Component({
  selector: 'easy-dashboards-list',
  templateUrl: './dashboards-list.component.html',
  styleUrls: ['./dashboards-list.component.scss'],
})
export class DashboardsListComponent implements OnInit, OnDestroy {
  dashboards: any = [{}];
  searchSub: Subscription;
  isLoading = false;

  constructor(
    private dashboardService: DashboardsService,
    private router: Router,
    private route: ActivatedRoute,
    private dashboardsAnimationService: OpenAnimationService,
    private searchService: SearchService,
  ) { }

  /**
   * @param activityName: dashboard name
   * need it to construct a custom URL
   * and navigate to the dahsboards details component
   */
  openDetailComponent(activityName: string): void {
    this.dashboardsAnimationService.setAnimationStatus(true);
    this.router.navigate([`view/${activityName}/detail`], { relativeTo: this.route });
  }

  checkIfTheSearchMatchesDashboards(searchQuery: string) {
    this.isLoading = true;
    this.dashboards = this.dashboards
      .filter((eachDashboard: DashboardModel) => {
        if (eachDashboard.activityName.includes(searchQuery)) {
          this.isLoading = false;
       }
        return eachDashboard.activityName.includes(searchQuery);
      });
    this.isLoading = false;
  }

  checkIfUserHasSearchedSomething() {
    this.searchSub = this.searchService.getSearchValue()
      .subscribe((value: string) => {
        // tslint:disable-next-line: max-line-length
        if (value) {
          this.checkIfTheSearchMatchesDashboards(value);
        } else { this.getDashboards(); }
      });
  }

  getDashboards() {
    this.isLoading = true;
    this.dashboardService.getDashboards().subscribe((dashboards: DashboardModel[]) => {
      this.dashboards = dashboards;
      this.isLoading = false;
    });
  }

  ngOnInit() {
    this.checkIfUserHasSearchedSomething();
    this.getDashboards();
  }

  ngOnDestroy() {
    this.dashboardsAnimationService.setAnimationStatus(false);
    this.searchSub.unsubscribe();
  }
}
