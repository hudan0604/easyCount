import { Subscription } from 'rxjs';
import { DashboardModel } from 'src/app/shared/models/dashboards.models';
import { DashboardsService } from 'src/app/shared/services/dashboards.service';
import { RowSelectedService } from 'src/app/shared/services/row-selected.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { SearchService } from '../shared/services/search.service';

@Component({
  selector: 'easy-dashboards-list',
  templateUrl: './dashboards-list.component.html',
  styleUrls: ['./dashboards-list.component.scss'],
})
export class DashboardsListComponent implements OnInit, OnDestroy {
  dashboards: DashboardModel[] = [{
    activityName: '',
    creationDate: '',
    people: ['']
  }];
  searchSub: Subscription;
  isLoading = false;
  dashboardsSub: Subscription;
  checkboxChecked = false;
  rowActive = false;
  hideBackgroundOfSelectedRow = false;

  constructor(
    private dashboardService: DashboardsService,
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute,
    private rowSelectedService: RowSelectedService,
  ) { }

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
    this.dashboardsSub = this.dashboardService.getDashboards().subscribe((dashboards: DashboardModel[]) => {
      this.dashboards = dashboards;
      this.isLoading = false;
    });
  }

  /**
   * @param activityName: dashboard name
   * need it to construct a custom URL
   * and navigate to the dahsboards details component
   */
  openDetailComponent(activityName: string): void {
    this.router.navigate([`view/${activityName}/detail`], { relativeTo: this.route });
  }

  setRowIndex(index: number) {
    this.rowSelectedService.setRowIndex(index);
  }

  hideBackgroundOfSelectedRows() {
    this.hideBackgroundOfSelectedRow = !this.hideBackgroundOfSelectedRow;
  }

  ngOnInit() {
    this.checkIfUserHasSearchedSomething();
    this.getDashboards();
  }

  ngOnDestroy() {
    this.searchSub.unsubscribe();
    this.dashboardsSub.unsubscribe();
  }
}
