import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterObj',
})
export class FilterObjPipe implements PipeTransform {
  transform(items: any[], keys: string[], filterBy: any): any {
    if (!filterBy || filterBy == '') {
      return items;
    }

    return items.filter((item) => {
      if (keys.length === 0) {
        return false;
      }

      let value = item[keys[0]];

      if (keys.length > 1) {
        for (let keyIndex = 1; keyIndex < keys.length; keyIndex++) {
          value = value[keys[keyIndex]];
        }
      }

      if (value) {
        if (typeof filterBy === 'string') {
          let check = value
            .toString()
            .toLowerCase()
            .indexOf(filterBy.toLowerCase());

          return check !== -1;
        }

        if (typeof filterBy === 'number') {
          return value === filterBy;
        }
      }

      return false;
    });
  }
}
