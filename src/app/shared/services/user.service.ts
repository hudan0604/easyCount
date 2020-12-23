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

  openUserProfileComponent = new BehaviorSubject<boolean>(false);
  openUserProfileComponent$ = this.openUserProfileComponent.asObservable();

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  logUser(data: { email: string; password: string}): Observable<any> {
    return this.http.post(`${environment.serverUrl}/users/log-in`, data, { headers: { skip: "true" } });
  }

  signUserIn(data: UserModel): Observable<any> {
    return this.http.post(`${environment.serverUrl}/create-user`, data, { headers: { skip: "true" } });
  }

  setUserasLoggedIn(user: UserModel) {
    this.localStorageService.setItemStringified('user', user);
    this.userLoggedIn.next(user);
  }

  getAuthUser(): Observable<UserModel> {
    return this.http.get<UserModel>(`${environment.serverUrl}/users/me`);
  }

  getAllUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${environment.serverUrl}/users`);
  }

  logout(user: UserModel) {
    return this.http.post(`${environment.serverUrl}/users/logout`, user);
  }

  isUserLoggedIn(): boolean {
    return this.localStorageService.getValueParsed('user') ? true : false;
  }

  deleteUserAccount(): Observable<UserModel> {
    return this.http.delete<UserModel>(`${environment.serverUrl}/users/me`);
  }
}
