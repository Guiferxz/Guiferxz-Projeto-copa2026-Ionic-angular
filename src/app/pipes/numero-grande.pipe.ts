import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numeroGrande',
  standalone: true,
})
export class NumeroGrandePipe implements PipeTransform {
  transform(value: number): string {
    if (!value && value !== 0) return 'N/A';
    if (value >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(1) + ' bi';
    } else if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(1) + ' mi';
    } else if (value >= 1_000) {
      return (value / 1_000).toFixed(0) + ' mil';
    }
    return value.toString();
  }
}
