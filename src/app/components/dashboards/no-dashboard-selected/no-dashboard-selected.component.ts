import { Component, OnInit } from '@angular/core';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'easy-no-dashboard-selected',
  templateUrl: './no-dashboard-selected.component.html',
  styleUrls: ['./no-dashboard-selected.component.scss']
})
export class NoDashboardSelectedComponent implements OnInit {

  clipboard = faClipboard;

  constructor() { }

  ngOnInit() {
  }

}
