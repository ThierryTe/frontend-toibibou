import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";

@Injectable()
export class LocationResolver implements Resolve<any>{
    constructor(){}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        throw new Error("Method not implemented.");
    }
}