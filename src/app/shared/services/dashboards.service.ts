import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { DashboardModel } from '../models/dashboards.models';

@Injectable({
  providedIn: 'root'
})
export class DashboardsService {

  constructor(private http: HttpClient) { }

  addNewDashboard(data: DashboardModel): Observable<DashboardModel> {
    return this.http.post<DashboardModel>(`${environment.serverUrl}/create-dashboard`, data);
  }

  getDashboards(): Observable<DashboardModel[]> {
    return this.http.get<DashboardModel[]>(`${environment.serverUrl}/dashboards`);
  }

  getCreatedDashboards(): Observable<DashboardModel[]> {
    return this.http.get<DashboardModel[]>(`${environment.serverUrl}/dashboards-created`);
  }

  getSpecificDashboard(dashboardId: string): Observable<DashboardModel> {
    return this.http.get<DashboardModel>(`${environment.serverUrl}/dashboard/${dashboardId}`);
  }

  deleteDashboards(data: { dashboards: string[] }): any {
    return this.http.post(`${environment.serverUrl}/delete-dashboards`, data);
  }

  addUserToDashboard(dashboardId: string, userId: string): Observable<any> {
    console.log('url sent to back : ', `${environment.serverUrl}/add-user-to-dashboard/${dashboardId}`, {userId});
    return this.http.patch(`${environment.serverUrl}/add-user-to-dashboard/${dashboardId}`, { userId }, { headers: { skip: "true" } });
  }
}
