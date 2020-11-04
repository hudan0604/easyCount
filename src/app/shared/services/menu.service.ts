import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  lateralMenuStatus = new BehaviorSubject<boolean>(false);

  constructor() { }

  setLateralMenuStatus(status: boolean): void {
    this.lateralMenuStatus.next(status);
  }
}
