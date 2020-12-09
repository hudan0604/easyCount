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

  deleteDashboards(data: {dashboards: string[]}): any {
    return this.http.post(`${environment.serverUrl}/delete-dashboards`, data);
  }
}
