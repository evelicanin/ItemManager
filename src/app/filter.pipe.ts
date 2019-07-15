import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string ): any {
    if (value.length === 0 || filterString === '') {
      return value;
    }
    const resultArray = [];
    for (const item of value) {
       
      // ako ti treba da se cijeli podatak(string) slaze sa onim sto korisnik unese u trazilicu
      // npr : edis = edis 
      // case sensitive
      // if (item[propName] === filterString)  {
        // resultArray.push(item);
      // }
      
      // ako ti treba da se tvoj podatak u bazi djelimicno slaze sa onim sto korisnik unese u trazilicu
      // npr Edis = Edis = Edi = edi = ed . . .
      // case insensitive
      if ( item[propName].toLowerCase().indexOf(filterString.toLowerCase()) >= 0 ) {
        resultArray.push(item);
      }

    }
    return resultArray;
  }

}




