import { Pipe, PipeTransform } from '@angular/core';

export class PercentagePipeOptions {
  percentSign: boolean = false;
  digits: number = 0;
}

@Pipe({
  name: 'number'
})
export class NumberPipe implements PipeTransform {

  transform(value: number, options: PercentagePipeOptions = new PercentagePipeOptions()): string {
    const scaleFactor = this.pow(10, options.digits);
    const percentage = Math.round(value * scaleFactor * 100) / scaleFactor;
    return `${percentage}${options.percentSign ? '%' : ''}`;
  }

  private pow(base: number, exponent: number): number {
    let acc = 1;
    for (let i = 0; i < exponent; ++i)
      acc *= base ;
    return acc;
  }

}
