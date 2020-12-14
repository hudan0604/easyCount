import { BehaviorSubject, Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { UserModel } from '../models/users.models';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userLoggedIn = new BehaviorSubject<UserModel>(this.localStorageService.getValueParsed('user'));
  userLoggedIn$ = this.userLoggedIn.asObservable();

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  logUser(data: { email: string; password: string}): Observable<any> {
    return this.http.post(`${environment.serverUrl}/log-in`, data);
  }

  signUserIn(data: UserModel): Observable<any> {
    return this.http.post(`${environment.serverUrl}/create-user`, data)
  }

  setUserasLoggedIn(user: UserModel) {
    this.userLoggedIn.next(user);
    this.localStorageService.setItemStringified('user', user);
  }

  logOut() {
    this.userLoggedIn.next(null);
    this.localStorageService.removeItem('user');
  }

  isUserLoggedIn(): boolean {
    return this.localStorageService.getValueParsed('user') ? true : false;
  }
}
