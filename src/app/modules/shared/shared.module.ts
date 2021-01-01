import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';
import { FromPastDatePipe } from 'src/app/shared/pipes/from-past-date.pipe';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    CheckboxComponent,
    FromPastDatePipe
  ],
  imports: [
    CommonModule, FontAwesomeModule
  ],
  exports: [
    CheckboxComponent,
    FromPastDatePipe
  ]
})
export class SharedModule { }
