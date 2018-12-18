import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objecto'
})
export class ObjectoPipe implements PipeTransform {

  /*transform(value: any, args?: any): any {
    return null;
  }*/
 transform(objects : any = []) {
    return Object.values(objects);
  }
}
