import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';

@Component({
  selector: 'easy-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrls: ['./dashboard-detail.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
    animate('2s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 0 }), animate('2s'),
      ]),
    ]),
  ],
})
export class DashboardDetailComponent {
}
