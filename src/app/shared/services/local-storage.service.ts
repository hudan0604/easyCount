import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  get(key: string): string {
    return window.localStorage.getItem(key);
  }

  // get an item when its value is a stringified object
  getValueParsed(key: string): {} {
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
  setItemStringified(key: string, value: {}): void {
    window.localStorage.setItem(key, JSON.stringify(value));
  }

}
