import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'uniq'
})
export class uniq implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!value) return [];

    return value.filter((v: any, i: any, a: any) => a.indexOf(v) === i);
  }
}
