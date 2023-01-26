import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'position',
})
export class PositionPipe implements PipeTransform {
  transform(value: string) {
    const position = value;
    return `#${position.padStart(4, '0')}`;
  }
}
