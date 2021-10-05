import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'w10strsub'
})
export class W10strsubPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): number {
    let age = 0;
    age = 2021 - value;
    return age
  }

}
