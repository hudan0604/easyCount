import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'peopleNumber'
})
export class ObjectLengthPipe implements PipeTransform {

  transform(obj: {}): number {
    return Object.keys(obj).length;
  }

}
