import { LocalStorageService } from 'src/app/shared/services/local-storage.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'easy-create-dashboard',
  templateUrl: './create-dashboard.component.html',
  styleUrls: ['./create-dashboard.component.scss']
})
export class CreateDashboardComponent implements OnInit {

  addPeopleForm: FormGroup;
  person1name: FormControl;
  inputs = ['1'];
  faUserPlus = faUserPlus;
  buttonValidateBackground = 'button-validate-background';
  buttonCancelBackground = 'button-cancel-background';

  constructor(
    private fb: FormBuilder,
    private localStorage: LocalStorageService,
    private router: Router,
  ) {
   }

  initForm(): void {
    this.person1name = new FormControl('', Validators.required);
    this.addPeopleForm = this.fb.group({
      person1name : this.person1name,
    });
  }

  /**
   * add an input at the bottom of the others
   * also add its formControl to formGroup
   */
  addInputToForm(): void {
    const personNumber = this.inputs.length + 1;
    this.inputs.push(`${personNumber}`);
    this.addPeopleForm.addControl(`person${personNumber}name`, new FormControl('', Validators.required));
  }

  placeholder(personNumber: number): string {
    return `person #${personNumber} name...`;
  }

  save(formData: any): void {
    const dashboardNumber = this.localStorage.get('numberOfDashboards');
    /**
     * When clicking on lets go button,
     * if there are no dashboards yet in local storage,
     * set a key to tell the number of dashboards
     */
    if (!dashboardNumber) {
      this.localStorage.setItem('numberOfDashboards', '1');
      this.localStorage.setItemStringified('peopleList#1', formData);
    } else {
      // tslint:disable-next-line: radix
      this.localStorage.setItem('numberOfDashboards', (parseInt(dashboardNumber) + 1).toString());
      // tslint:disable-next-line: radix
      this.localStorage.setItemStringified(`peopleList#${(parseInt(dashboardNumber) + 1)}`, formData);
    }

    this.router.navigate(['/manage-dashboard']);
  }

  ngOnInit() {
    this.initForm();
  }

}
