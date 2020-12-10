import { Subscription } from 'rxjs';
import { DashboardModel } from 'src/app/shared/models/dashboards.models';
import { DashboardsService } from 'src/app/shared/services/dashboards.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { RowSelectedService } from 'src/app/shared/services/row-selected.service';
import { ToastService } from 'src/app/shared/services/toast.service';

import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
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
  dashboardsListWeWantToDeleteSubscription: Subscription;
  dashboardsToDeleteListToBeSentToBackend: string[] | null;
  deleteDashboardsSubscription: Subscription;

  constructor(
    private dashboardService: DashboardsService,
    private searchService: SearchService,
    private router: Router,
    private route: ActivatedRoute,
    private rowSelectedService: RowSelectedService,
    private localStorage: LocalStorageService,
    private toastService: ToastService,
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
        } else { this.getDashboardsFromBackend(); }
      });
  }

  getDashboardsFromBackend() {
    this.isLoading = true;
    this.dashboardsSub = this.dashboardService.getDashboards()
      .subscribe((dashboards: DashboardModel[]) => {
        this.dashboards = dashboards;
        this.isLoading = false;
      },
        () => this.toastService.openToast('error', 'Error while getting dashboards from server ...')
      );
  }

  /**
   * @param activityName: dashboard name
   * need it to construct a custom URL
   * and navigate to the dahsboards details component
   */
  openDetailComponent(id: string): void {
    this.router.navigate([`view/${id}`], { relativeTo: this.route });
  }

  setRowIndex(index: number) {
    this.rowSelectedService.setRowIndex(index);
  }

  hideBackgroundOfSelectedRows() {
    this.hideBackgroundOfSelectedRow = !this.hideBackgroundOfSelectedRow;
  }

  deleteSelectedDashboards() {
    const list = this.localStorage.getValueParsed('dashboards-to-delete');
    const dataForBackend = {
      dashboards: list
    };
    this.deleteDashboardsSubscription = this.dashboardService.deleteDashboards(dataForBackend)
      .subscribe(() => {
        this.resetSelectedRows();
        this.getDashboardsFromBackend();
        this.toastService.openToast('success', 'Dashboard(s) successfully deleted !');
      },
        () => this.toastService.openToast('error', 'Error while deleting dashboards...')
      );
  }

  refreshListOfDashboardsToDeleteInLS() {
    this.localStorage.refreshValueOfDashboardsListWeWantToDelete();
  }

  getDashboardsinLS() {
    this.dashboardsListWeWantToDeleteSubscription = this.localStorage.listOfDashboardsWeWantToDelete$
      .subscribe((list: string[]) => {
        this.dashboardsToDeleteListToBeSentToBackend = list;
      });
  }

  resetSelectedRows() {
    this.localStorage.removeItem('dashboards-to-delete');
    this.refreshListOfDashboardsToDeleteInLS();
  }

  ngOnInit() {
    this.checkIfUserHasSearchedSomething();
    this.getDashboardsFromBackend();
    this.getDashboardsinLS();
  }

  ngOnDestroy() {
    this.searchSub.unsubscribe();
    this.dashboardsSub.unsubscribe();
    this.dashboardsListWeWantToDeleteSubscription.unsubscribe();
  }
}
