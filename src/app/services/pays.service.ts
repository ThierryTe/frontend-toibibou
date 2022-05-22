import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { PaysModel } from "../models/pays.model";
import { GeneralService } from "./general.service";

@Injectable()
export class PaysService extends GeneralService<PaysModel>{

    constructor(public http:HttpClient){super(http);}

    public getUrl(): string {
        return environment.APP.PAYS_API;
    }
}