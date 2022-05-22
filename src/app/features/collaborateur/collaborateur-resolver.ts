import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { CollaborateurService } from "src/app/services/collaborateur.service";
import { environment } from "src/environments/environment";

@Injectable()
export class CollaborateurResolver implements Resolve<any>{
    constructor(private service: CollaborateurService){}
    
    resolve(route: ActivatedRouteSnapshot) {
        const id:any = route.paramMap.get("id");
    return this.service.get(id).pipe(
      map((res):any => {
        if (res && res.id) {
          return res;
        }
        location.href = environment.FRONTEND_ROUTES.COLLABORATEUR;
      }),
      catchError(error => {
        location.href = environment.FRONTEND_ROUTES.COLLABORATEUR;
        return of(null)
      })
    );

    }
}