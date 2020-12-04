import { Subscription } from 'rxjs';
import { DashboardModel } from 'src/app/shared/models/dashboards.models';
import { RowSelectedService } from 'src/app/shared/services/row-selected.service';

import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'easy-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss']
})
export class RowComponent implements OnInit, OnChanges, OnDestroy {
  @Input() dashboard: DashboardModel;
  @Input() rowIndex: number;
  @Input() hideBackgroundSelectedRows: boolean;
  highlightSelected = false;
  indexFromSubscription: number;
  rowSelectedSubscription: Subscription;
  rowActive = false;
  uncheck = false;
  checkboxCheckedSub: Subscription;

  constructor(
    private rowSelectedService: RowSelectedService,
  ) { }

  highlightSelectedRows(status: boolean): void {
    if (status) {
      this.rowSelectedService.setActiveBackgroundToTrue(true);
    }
    this.highlightSelected = status;
  }

  setRowIndexInService() {
    this.rowSelectedService.setRowIndex(this.rowIndex);
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
