import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

import { ToastModel } from '../models/toast.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  // tslint:disable-next-line: max-line-length
  toastConfig = new BehaviorSubject<ToastModel>({open: false, content: '', toastStatus: ''});
  $toastConfig = this.toastConfig.asObservable();

  constructor() { }

  openToast(toastLevel: 'error' | 'success', content: string): void {
    this.toastConfig.next({
      open: true,
      toastStatus: toastLevel,
      content
    });
  }

  closeToast(): void {
    this.toastConfig.next({ open: false, content: '', toastStatus: '' });
  }
}
