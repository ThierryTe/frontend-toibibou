import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { LocationService } from "src/app/services/location.service";
import { environment } from "src/environments/environment";

@Injectable()
export class LocationResolver implements Resolve<any>{
    constructor(private service: LocationService){}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id:any = route.paramMap.get("id");
    return this.service.get(id).pipe(
      map((res):any => {
        if (res && res.id) {
          return res;
        }
        location.href = environment.FRONTEND_ROUTES.LOCATION;
      }),
      catchError(error => {
        location.href = environment.FRONTEND_ROUTES.LOCATION;
        return of(null)
      })
    );

    }
}