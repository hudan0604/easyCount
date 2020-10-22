import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  get(key: string): any[] | string {
    return window.localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    window.localStorage.setItem(key, value);
  }

}
