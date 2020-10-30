import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'easy-create-dashboard',
  templateUrl: './create-dashboard.component.html',
  styleUrls: ['./create-dashboard.component.scss']
})
export class CreateDashboardComponent implements OnInit {

  addPeopleForm: FormGroup;
  person1placeholder = 'person #1 name';
  person1name: FormControl;

  constructor(
    private fb: FormBuilder,
  ) { }

  initForm(): void {
    this.person1name = new FormControl('', Validators.required);
    this.addPeopleForm = this.fb.group({
      person1name : this.person1name,
    });
  }

  ngOnInit() {
    this.initForm();
  }

}
