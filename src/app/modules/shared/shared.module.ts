import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    CheckboxComponent
  ],
  imports: [
    CommonModule, FontAwesomeModule
  ],
  exports: [
    CheckboxComponent
  ]
})
export class SharedModule { }
