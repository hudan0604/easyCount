import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  listToHandle = new BehaviorSubject<string[]>([]);
  listToHandle$ = this.listToHandle.asObservable();
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

  refreshValueOfListToHandle(): void {
    // tslint:disable-next-line: max-line-length
    // this.getValueParsed('dashboards-to-delete') == null ? this.listOfDashboardsWeWantToDelete.next([]) : this.listOfDashboardsWeWantToDelete.next(this.getValueParsed('dashboards-to-delete'));
    this.getValueParsed('ids-to-handle') == null ? this.listToHandle.next([]) : this.listToHandle.next(this.getValueParsed('ids-to-handle'));
  }

  removeItem(localStorageItem: string) {
    window.localStorage.removeItem(localStorageItem);
  }
  clearLocalStorage() {
    window.localStorage.clear();
  }
}
