import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { SiteModel } from 'src/app/models/site.model';
import { SiteService } from 'src/app/services/site.service';
import { AppConfirmService } from 'src/app/shared/app-confirm/app-confirm.service';
import { ToibibouUtils } from 'src/app/shared/utils.functions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-site-form',
  templateUrl: './site-form.component.html',
  styleUrls: ['./site-form.component.scss']
})
export class SiteFormComponent implements OnInit {
  public formulaire!: FormGroup;
  private _onDestroy = new Subject<void>();
  public isLoadingResults:boolean = false;
  public site:SiteModel | any;


  public get adresse(){return this.formulaire.get('adresse');}
  public get telephone(){return this.formulaire.get('telephone');}
  public get email(){return this.formulaire.get('email');}
  public get accessibilite(){return this.formulaire.get('accessibilite');}

  constructor(private siteService: SiteService,
    private _snackBar: MatSnackBar,
   public fb: FormBuilder,public confirmService: AppConfirmService,
   private route: ActivatedRoute,private router: Router) {

    this.site = this.route.snapshot.data["site"];

     this.formulaire=this.fb.group({
       id:[null],
       nom:[null, Validators.required],
       adresse:[null, Validators.required],
       email:[null, Validators.email],
       telephone:[null,Validators.required],
       fax:[null],
       accessibilite:[null,Validators.required],
       etage:[null]
     });
    }

  ngOnInit(): void {
    

    if(this.site){
      this.formulaire.patchValue({
        id:this.site.id,
        nom:this.site.nom,
        adresse:this.site.adresse,
        email:this.site.email,
        telephone:this.site.telephone,
        fax:this.site.fax,
        accessibilite:this.site.accessibilite,
        etage:this.site.etage
      })
    }else {
      this.site= new SiteModel();
    }
  }

  resetForm(){
    this.router.navigate([`${environment.FRONTEND_ROUTES.SITE}`]);
}

onSubmit() {
  if (this.formulaire.value) {
    this.isLoadingResults=true;
    if (this.formulaire.value.id) {
      this.siteService.update(this.site.id,this.formulaire.value).subscribe(data => {
        this.isLoadingResults=false;
        this.openSnackBar("Lieu modifié avec succès","OK");
        this.router.navigate([environment.FRONTEND_ROUTES.SITE]);
        },
        errorResponse => {
          this.isLoadingResults=false;
          ToibibouUtils.notifyRemoteError(errorResponse.error, this._snackBar);
        }
      );
    } else {
      this.siteService.add(this.formulaire.value).subscribe(data => {
        this.isLoadingResults=false;
        this.openSnackBar("Lieu ajouté avec succès","OK");
        this.router.navigate([environment.FRONTEND_ROUTES.SITE]);
        },
        errorResponse => {
          this.isLoadingResults=false;
          ToibibouUtils.notifyRemoteError(errorResponse.error, this._snackBar);
        }
      );
    }
  }
}
openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 25000,
    verticalPosition: "top",
  });
}

}
