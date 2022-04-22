import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocationModel } from '../models/location.model';
import { GeneralService } from './general.service';

@Injectable()
export class LocationService extends GeneralService<LocationModel> {

  constructor(public http:HttpClient) { super(http);}

  public getUrl(): string {
      return environment.APP.LOCATION_API;
  }

}
