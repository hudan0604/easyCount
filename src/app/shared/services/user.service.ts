import { BehaviorSubject, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { UserModel } from '../models/users.models';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  isUserLoggedIn$ = this.isUserLoggedIn.asObservable();

  constructor(
    private http: HttpClient,
  ) { }

  logUser(data: { email: string; password: string}): Observable<any> {
    return this.http.post(`${environment.serverUrl}/log-in`, data);
  }

  signUserIn(data: UserModel): Observable<any> {
    return this.http.post(`${environment.serverUrl}/create-user`, data)
  }
}
