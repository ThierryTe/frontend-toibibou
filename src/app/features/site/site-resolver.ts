import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { SiteService } from "src/app/services/site.service";
import { environment } from "src/environments/environment";

@Injectable()
export class SiteResolver implements Resolve<any>{
    constructor(private service: SiteService){}
    
    resolve(route: ActivatedRouteSnapshot) {
        const id:any = route.paramMap.get('id')
    return this.service.get(id).pipe(
      map((res):any => {
        if (res && res.id) {
          return res;
        }
        location.href = environment.FRONTEND_ROUTES.SITE;
      }),
      catchError(error => {
        location.href = environment.FRONTEND_ROUTES.SITE;
        return of(null)
      })
    );

    }
}