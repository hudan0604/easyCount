import { DashboardsService } from 'src/app/shared/services/dashboards.service';
import { ToastService } from 'src/app/shared/services/toast.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    private dashboardsService: DashboardsService,
    private toastService: ToastService,
  ) {
   }

  initForm(): void {
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

  createNewDashboard(formData: any): void {
    const date = new Date();
    // Add date of the day to data that will be sent to Back-end
    formData.creationDate = date.toDateString();
    const dataForBackend: any  = {};
    dataForBackend.activityName = formData.activityName;
    dataForBackend.creationDate = formData.creationDate;
    const people: string[] = [];
    formData = Object.entries(formData)
      .filter(
        (key) => key[0] !== 'creationDate' && key[0] !== 'activityName'
    );
    formData.map((peopleNameArr) => people.push(peopleNameArr[1]));
    dataForBackend.people = people;
    this.dashboardsService.addNewDashboard(dataForBackend).subscribe(
      (success) => this.toastService.openToast('success', 'Dashboard successfully created !'),
      (error) => this.toastService.openToast('error', 'Error during dashboard creation')
    );
  }

  ngOnInit() {
    this.initForm();
  }

}
