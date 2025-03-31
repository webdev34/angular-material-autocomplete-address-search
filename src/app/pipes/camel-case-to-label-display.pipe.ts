import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelCaseToLabelDisplay',
  standalone: true
})
export class CamelCaseToLabelDisplayPipe implements PipeTransform {
  transform(value: any): string {
    if (typeof value === 'number') {
      value = value.toString();
    }

    if (value == null || typeof value !== 'string') {
      return '';
    }

    return value
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase());
  }
}
