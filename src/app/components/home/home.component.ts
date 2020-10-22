import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

@Component({
  selector: 'easy-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  firstDashboard = null;

  constructor(
    private localStorage: LocalStorageService,
  ) {}

  ngOnInit() {
    this.firstDashboard = this.localStorage.get('dashboards') ? false : true;
  }
}
