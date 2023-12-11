import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'workSheetStatus'
})
export class WorkSheetStatusPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!value) return value;
    if(value == 'W'){
      return "รอมอบหมายงาน";
    }
  }
}
