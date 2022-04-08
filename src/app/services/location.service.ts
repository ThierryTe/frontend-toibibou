import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LocationService {

  constructor(public http:HttpClient) { }


}
