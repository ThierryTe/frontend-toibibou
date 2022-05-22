import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CollaborateurModel } from '../models/collaborateur.model';
import { GeneralService } from './general.service';

@Injectable()
export class CollaborateurService extends GeneralService<CollaborateurModel> {

  constructor(public http:HttpClient) {super(http); }
  public getUrl(): string {
      return environment.APP.COLLABORATEUR_API;
  }
  public  getDateFields(): string[] {
    return ["dateNaissance"];
  }

}
