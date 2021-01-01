import * as moment from 'moment';

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'fromPastDate'})
export class FromPastDatePipe implements PipeTransform {
  transform(value, args) {
  return moment(value).fromNow();
  }
}
