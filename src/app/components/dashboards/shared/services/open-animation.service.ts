import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenAnimationService {

  dashboardAnimationOn = new BehaviorSubject<boolean>(false);
  // tslint:disable-next-line: variable-name
  _dashboardAnimationOn = this.dashboardAnimationOn.asObservable();

  constructor() { }

  setAnimationStatus(status: boolean): void {
    this.dashboardAnimationOn.next(status);
  }
}
