import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'SiteSearchPipe', pure: false })
export class SiteSearchPipe implements PipeTransform {
  transform(value:any, args?:any) {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter((site:any) => {
        if (site.nom) {
          return site.nom.search(searchText) !== -1;
        }
        else{
          return site.adresse.search(searchText) !== -1;
        }
      });
    }
  }
}