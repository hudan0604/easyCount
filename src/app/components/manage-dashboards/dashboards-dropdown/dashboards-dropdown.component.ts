import { DashboardModel } from 'src/app/shared/models/dashboards.models';

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'easy-dashboards-dropdown',
  templateUrl: './dashboards-dropdown.component.html',
  styleUrls: ['./dashboards-dropdown.component.scss']
})
export class DashboardsDropdownComponent implements OnInit {
  @Input() dashboards: DashboardModel[];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  dosomething($event) {
    const value = $event.target.value;
    if (value !== 'doNothing') {
      this.router.navigate([`detail/${$event.target.value}`], { relativeTo: this.route });
    }
  }

  ngOnInit() {
  }

}
