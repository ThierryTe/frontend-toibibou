import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppSettings, Settings } from 'src/app/app.settings';
import { CollaborateurModel } from 'src/app/models/collaborateur.model';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { AppConfirmService } from 'src/app/shared/app-confirm/app-confirm.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-collaborateur',
  templateUrl: './collaborateur.component.html',
  styleUrls: ['./collaborateur.component.scss']
})
export class CollaborateurComponent implements OnInit {
  public collaborateurs:CollaborateurModel[] = [];
  public searchText: string = '';
  public page:any;
  public settings!: Settings;
  public maxSize:number = 4;
  public loading = false;
  public autoHide:boolean = true;
  
  constructor(public appSettings:AppSettings, 
    public dialog: MatDialog,
    public collaboService:CollaborateurService,private router: Router,private _snackBar: MatSnackBar,public confirmService:AppConfirmService) 
    { 
      this.settings = this.appSettings.settings;
    }

  ngOnInit(): void {
    this.loading=true;
    this.getCollaborateur();
  }
  public getCollaborateur(){
    this.collaborateurs=[];
    this.collaboService.getAll().subscribe(data =>{
      this.collaborateurs = data;
      this.loading=false;
    })
  }
  
  public ajout(){
  this.router.navigate([`${environment.FRONTEND_ROUTES.COLLABORATEUR}/ajout`]);
  }

  public modifier(collabo:CollaborateurModel){
   this.router.navigate([`${environment.FRONTEND_ROUTES.COLLABORATEUR}/modifier`,collabo.id]);
  }

  public delete(collabo:CollaborateurModel | any){
    this.confirmService.confirm().subscribe((choix)=>{
      if(choix==true){
        this.collaboService.delete(collabo.id).subscribe((data)=>{
          this.openSnackBar("Collaborateur supprimé avec success !","OK");
         this.getCollaborateur();
         this.loading=false;
        })
    }
 })
}
 openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 25000,
    verticalPosition:'top'
 
  });
 }


 public onPageChanged(event:any){
  this.page = event;
  this.getCollaborateur();
  window.scrollTo(0,0);
}

}
