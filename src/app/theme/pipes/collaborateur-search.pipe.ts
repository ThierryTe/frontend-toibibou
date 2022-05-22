import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'CollaborateurSearchPipe', pure: false })
export class collaborateurSearchPipe implements PipeTransform {
  transform(value:any, args?:any) {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter((collaborateur:any) => {
        if (collaborateur.nom) {
          return collaborateur.nom.search(searchText) !== -1;
        }
        else{
          return collaborateur.prenom.search(searchText) !== -1;
        }
      });
    }
  }
}