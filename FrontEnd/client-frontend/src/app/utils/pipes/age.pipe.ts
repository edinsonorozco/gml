import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {
  transform(value: string): string {
    const timeDiff = Math.abs(Date.now() - new Date(value).getTime());
    return Math.floor((timeDiff / (1000 * 3600 * 24)) ).toString().concat(' dias');
  }
}
