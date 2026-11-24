import { Pipe, PipeTransform } from '@angular/core';
import { formatAverage } from '../state/driver-stats';

@Pipe({ name: 'average' })
export class AveragePipe implements PipeTransform {
  transform(value: number | null): string {
    return formatAverage(value);
  }
}