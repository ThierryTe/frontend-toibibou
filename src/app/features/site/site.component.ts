import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppSettings, Settings } from 'src/app/app.settings';
import { SiteModel } from 'src/app/models/site.model';
import { SiteService } from 'src/app/services/site.service';
import { AppConfirmService } from 'src/app/shared/app-confirm/app-confirm.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
  public sites:SiteModel[] = [];
    public searchText: string = '';
    public page:any;
    public settings!: Settings;
    public maxSize:number = 5;
    public loading = false;
    public autoHide:boolean = true;
    
  constructor(public appSettings:AppSettings, 
    public dialog: MatDialog,
    public siteService:SiteService,private router: Router,private _snackBar: MatSnackBar,public confirmService:AppConfirmService) {
      this.settings = this.appSettings.settings;
     }

  ngOnInit(): void {
    this.loading=true;
    this.getSite();
  }

  public getSite(){
    this.sites=[];
    this.siteService.getAll().subscribe(site =>{
      this.sites = site;
      this.loading=false;
    })
  }
  
  public ajout(){
  this.router.navigate([`${environment.FRONTEND_ROUTES.SITE}/ajout`]);
  }

  public modifier(site:SiteModel){
   this.router.navigate([`${environment.FRONTEND_ROUTES.SITE}/modifier/${site.id}`]);
  }

  public delete(site:SiteModel | any){
    this.confirmService.confirm().subscribe((choix)=>{
      if(choix==true){
        this.siteService.delete(site.id).subscribe((data)=>{
          this.openSnackBar("Lieu supprimé avec success !","OK");
          this.loading=false;
          this.getSite();
        })
    }
  });
    
 }
 openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 25000,
    verticalPosition:'top'
 
  });
 }
 public onPageChanged(event:any){
  this.page = event;
  this.getSite();
  window.scrollTo(0,0);
}
}
