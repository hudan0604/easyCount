import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'easy-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() buttonText: string;
  @Input() disabled: boolean;
  @Input() buttonClass: string;

  constructor() { }

  ngOnInit() {
  }

}
