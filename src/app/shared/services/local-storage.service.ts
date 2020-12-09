import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  listOfDashboardsWeWantToDelete = new BehaviorSubject<string[]>([]);
  listOfDashboardsWeWantToDelete$ = this.listOfDashboardsWeWantToDelete.asObservable();
  constructor() { }

  get(key: string): string {
    return window.localStorage.getItem(key);
  }

  // get an item when its value is a stringified object
  getValueParsed(key: string): any {
    return JSON.parse(this.get(key));
  }

  // set item when value is a string
  setItem(key: string, value: string): void {
    window.localStorage.setItem(key, value);
  }

  /**
   * if value is an object
   * then we stringify it, in order to be able to put it in local storage
   */
  setItemStringified(key: string, value: any): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

  refreshValueOfDashboardsListWeWantToDelete(): void {
    console.log('we are in LS, we want to actualize the list');
    // tslint:disable-next-line: max-line-length
    this.getValueParsed('dashboards-to-delete') == null ? this.listOfDashboardsWeWantToDelete.next([]) : this.listOfDashboardsWeWantToDelete.next(this.getValueParsed('dashboards-to-delete'));
  }

  removeItem(localStorageItem: string) {
    window.localStorage.removeItem(localStorageItem);
  }
}
