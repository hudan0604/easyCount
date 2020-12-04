import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RowSelectedService {

  rowSelectedId = new BehaviorSubject<number | boolean>(null);
  dashboardIndex$ = this.rowSelectedId.asObservable();
  deleteActiveBackground = new BehaviorSubject<boolean>(false);
  deleteActiveBackground$ = this.deleteActiveBackground.asObservable();

  constructor() { }

  setRowIndex(index: number | boolean) {
    this.rowSelectedId.next(index);
  }

  setActiveBackgroundToTrue(status: true) {
    this.deleteActiveBackground.next(status);
  }
}
