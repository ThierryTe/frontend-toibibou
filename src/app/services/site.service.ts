import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SiteModel } from '../models/site.model';
import { GeneralService } from './general.service';

@Injectable()
export class SiteService extends GeneralService<SiteModel> {

  constructor(public http:HttpClient) { super(http);}

  public getUrl(): string {
      return environment.APP.SITE_API;
  }

}
