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
    // const activityName = new FormControl('', Validators.required);
      this.addPeopleForm = this.fb.group({
      activityName: this.fb.control('', Validators.required),
      person1name: this.fb.control('', Validators.required),
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

  getPlaceholder(personNumber: number): string {
    return `person #${personNumber} name...`;
  }

  getPersonFormControlName(index: number): string {
    return `person${index}name`;
  }

  save(formData: any): void {
    const dashboardNumberInLocalStorage = this.localStorage.get('numberOfDashboards');
    // tslint:disable-next-line: radix
    const dashboardsTotal = (parseInt(dashboardNumberInLocalStorage) + 1).toString();
    /**
     * When clicking on lets go button,
     * if there are no dashboards yet in local storage,
     * set a key to tell the number of dashboards
     */
    if (!dashboardNumberInLocalStorage) {
      this.localStorage.setItem('numberOfDashboards', '1');
      this.localStorage.setItemStringified('dashboards', [formData]);
    } else {
      // tslint:disable-next-line: radix
      // tslint:disable-next-line: no-unused-expression
      // tslint:disable-next-line: radix
      this.localStorage.setItem('numberOfDashboards', dashboardsTotal);
      let dashboards = [];
      dashboards = this.localStorage.getValueParsed('dashboards');
      dashboards.push(formData);
      this.localStorage.setItemStringified('dashboards', dashboards);
    }

    this.router.navigate(['/manage-dashboard']);
  }

  ngOnInit() {
    this.initForm();
  }

}
