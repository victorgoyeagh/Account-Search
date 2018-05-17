import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capitalise'
})
export class CapitalisePipe implements PipeTransform {
    transform(value: string): any {
        let tmpValue = value.toLowerCase(),
            arrValue = tmpValue.split(" ").map((item) => item.toLowerCase().charAt(0).toUpperCase() + item.slice(1));
        return arrValue.join(" ");
    }
}