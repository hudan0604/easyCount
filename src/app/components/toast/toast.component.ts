import { ToastModel } from 'src/app/shared/models/toast.model';

import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'easy-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 })),
      ]),
      transition('* => void', [
        animate('1s', style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class ToastComponent {
  @Input() config: ToastModel;
  successIcon = faCheck;
  failIcon = faTimes;
}
