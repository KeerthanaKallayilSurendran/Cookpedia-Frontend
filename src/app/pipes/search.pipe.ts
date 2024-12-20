import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(allrecipes:any[], searchKey:string): any[] {
    let result:any = []
    if(!allrecipes || searchKey==""){
      return allrecipes
    }

    result = allrecipes.filter((item:any)=>item.name.toLowerCase().includes(searchKey.toLowerCase()))

    return result;
  }

}
