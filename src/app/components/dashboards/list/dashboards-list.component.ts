import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'easy-dashboards-list',
  templateUrl: './dashboards-list.component.html',
  styleUrls: ['./dashboards-list.component.scss']
})
export class DashboardsListComponent implements OnInit {
  dashboards: any = [{
  }];

  constructor(
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit() {
    this.dashboards = this.localStorageService.getValueParsed('dashboards');
    console.log('init du composant dashboard-list, dashboards', this.dashboards);
  }

}
