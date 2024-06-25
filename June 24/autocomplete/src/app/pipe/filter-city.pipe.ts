import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCity',
  standalone: true
})
export class FilterCityPipe implements PipeTransform {

  transform(cityList: string[], searchStr: string): string[] {
    const filteredCities = cityList.filter(c=>{
      if (searchStr && searchStr.trim()){
        return c.toLowerCase().includes(searchStr.trim().toLowerCase())
      }
      return;
    })
    return filteredCities
  }

}
