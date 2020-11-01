import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'easy-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss']
})
export class FormInputComponent implements OnInit {

  @Input() placeholder: string;
  @Input() parentForm: FormGroup;
  @Input() number: number;
  @Input() clearable: boolean;

  constructor() { }

  ngOnInit() {
  }

}
