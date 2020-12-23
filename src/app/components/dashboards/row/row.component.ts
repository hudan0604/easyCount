import { Subscription } from 'rxjs';
import { DashboardModel } from 'src/app/shared/models/dashboards.models';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { RowSelectedService } from 'src/app/shared/services/row-selected.service';

import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

import {
    AbstractHandleCheckedItemsClass
} from '../../../shared/abstract-classes/abstract-handle-checked-items.class';

@Component({
  selector: 'easy-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent extends AbstractHandleCheckedItemsClass implements OnInit, OnChanges, OnDestroy {
  @Input() dashboard: DashboardModel;
  @Input() rowIndex: number;
  @Input() hideBackgroundSelectedRows: boolean;
  highlightSelected = false;
  indexFromSubscription: number;
  rowSelectedSubscription: Subscription;
  rowActive = false;
  uncheck = false;
  checkboxCheckedSub: Subscription;
  dashboardsToDelete = [];
  dashboardsListInLS: any;

  constructor(
    private rowSelectedService: RowSelectedService,
    private localStorage: LocalStorageService,
  ) {
    super(localStorage);
  }

  /**
   * @param status boolean that indicates if we check and highlight the row
   */
  highlightSelectedRows(status: boolean, dashboardId: string): void {
    // if checkbox is checked, delete the background of the active row (if exists)
    if (status) {
      this.addItemToTheListToHandle(dashboardId);
      this.rowSelectedService.deleteBackgroundFromActiveRow(true);
    } else {
      this.removeItemFromTheListToHandle(dashboardId);
    }
    /**
     * if checkbox is checked, we set a background for its row
     * if checkbox is unchecked, we delete its background
     */
    this.highlightSelected = status;
  }

  /**
   * @param id the id of the dashboard we want to remove
   */
  // addDashboardToListThatWillBeRemoved(dashboardId: string) {
  //   const dashboardsInLS = this.localStorage.getValueParsed('dashboards-to-delete');
  //   const listToDelete = dashboardsInLS ? dashboardsInLS : [];
  //   listToDelete.push(dashboardId.toString());
  //   this.localStorage.setItemStringified('dashboards-to-delete', listToDelete);
  //   this.refreshListOfDashboardsToDeleteInLS();
  // }

  // deleteDashboardFromListThatWillBeRemoved(dashboardId: string) {
  //   let listToDelete = this.localStorage.getValueParsed('dashboards-to-delete');
  //   listToDelete = listToDelete.filter((id: string) => id !== dashboardId);
  //   this.localStorage.setItemStringified('dashboards-to-delete', listToDelete);
  //   this.refreshListOfDashboardsToDeleteInLS();
  // }

  setRowIndexInService() {
    this.rowSelectedService.setRowIndex(this.rowIndex);
  }

  // refreshListOfDashboardsToDeleteInLS() {
  //   this.localStorage.refe();
  // }

  isUserDashboardCreator(): boolean {
    return this.dashboard.dashboardCreator === this.localStorage.getValueParsed('user')._id ? true : false;
  }

  ngOnInit() {
    this.rowSelectedSubscription = this.rowSelectedService.dashboardIndex$
      .subscribe((index: number) => {
        this.rowActive = this.rowIndex === index ? true : false;
      });
    this.checkboxCheckedSub = this.rowSelectedService.deleteActiveBackground$
      .subscribe((status: boolean) => {
        if (status) { this.rowActive = false; }
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.hideBackgroundSelectedRows.previousValue === undefined) {
      this.highlightSelected = false;
    } else if (changes.hideBackgroundSelectedRows.currentValue === true || changes.hideBackgroundSelectedRows.currentValue === false) {
      this.highlightSelected = false;
      this.hideBackgroundSelectedRows = true;
      this.uncheck = !this.uncheck;
    }
  }

  ngOnDestroy() {
    this.rowSelectedSubscription.unsubscribe();
    this.checkboxCheckedSub.unsubscribe();
  }
}
