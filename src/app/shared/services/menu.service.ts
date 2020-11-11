import { BehaviorSubject, Observable } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  lateralMenuStatus = new BehaviorSubject<boolean>(false);

  constructor() { }

  get status(): Observable<boolean> {
    return this.lateralMenuStatus.asObservable();
  }

  setLateralMenuStatus(status: boolean): void {
    this.lateralMenuStatus.next(status);
  }
}
