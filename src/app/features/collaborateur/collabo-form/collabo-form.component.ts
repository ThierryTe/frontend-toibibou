import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { CollaborateurModel } from 'src/app/models/collaborateur.model';
import { PaysModel } from 'src/app/models/pays.model';
import { SiteModel } from 'src/app/models/site.model';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { PaysService } from 'src/app/services/pays.service';
import { SiteService } from 'src/app/services/site.service';
import { AppConfirmService } from 'src/app/shared/app-confirm/app-confirm.service';
import { ToibibouUtils } from 'src/app/shared/utils.functions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-collabo-form',
  templateUrl: './collabo-form.component.html',
  styleUrls: ['./collabo-form.component.scss']
})
export class CollaboFormComponent implements OnInit {
  public formulaire!: FormGroup;
  public isLoadingResults:boolean = false;
  public collaborateur!:CollaborateurModel
  public showImage:boolean = false;
  sites: any= [];
  paysS: any=[];
  public passwordHide:boolean = true;
  sexes=[
    'Masculin',
    'Féminin'
  ]
  specialites =[
    'Pédiatre',
    'Aide-soignant',
    'Accueil',
    'Facturation'
  ]
  public get image(){return this.formulaire.get('image');}
  public get confirmation(){return this.formulaire.get('confirmation')}
  constructor(private collaborateurService: CollaborateurService,
    private _snackBar: MatSnackBar,private _adapter: DateAdapter<any>,
   public fb: FormBuilder,public confirmService: AppConfirmService,
   private route: ActivatedRoute,private router: Router,private siteService:SiteService, private paysService:PaysService)
   {
     
     this.formulaire = this.fb.group({
       id:[null],
       nom:[null,Validators.required],
       prenom:[null, Validators.required],
       dateNaissance:[null,Validators.required],
       sexe:[null, Validators.required],
       specialite:[null,Validators.required],
       pays:[null],
       ville:[null,Validators.required],
       adresse:[null],
       site:[null, Validators.required],
       password:[null, Validators.required],
       confirmation:[null, Validators.required],
       image:[null]
     })
    }

  ngOnInit(): void {
    this._adapter.setLocale("fr");
    this.getSite();
    this.getPays();

    this.collaborateur = this.route.snapshot.data["collaborateur"]

    if(this.collaborateur){
      this.formulaire.patchValue({
        id:this.collaborateur.id,
        nom:this.collaborateur.nom,
        prenom:this.collaborateur.prenom,
        dateNaissance: this.collaborateur.dateNaissance,
        sexe:this.collaborateur.sexe,
        specialite:this.collaborateur.specialite,
        pays:this.collaborateur.pays.id,
        ville:this.collaborateur.ville,
        adresse:this.collaborateur.adresse,
        site:this.collaborateur.site.map((site: { id: any; }) =>site.id),
        password:this.collaborateur.password,
        confirmation:this.collaborateur.confirmation,
        image:this.collaborateur.image
      })
    }else{
      this.collaborateur = new CollaborateurModel();
    }
  }

  public fileChange(files:any){ 
    if(files.length){
      this.formulaire.controls.image.patchValue(files[0].content); 
    } 
    else{
      this.formulaire.controls.image.patchValue(null); 
    }
  } 

  resetForm(){
    this.router.navigate([`${environment.FRONTEND_ROUTES.COLLABORATEUR}`]);
}

onSubmit() {
  if (this.formulaire.value) {
    this.isLoadingResults=true;
    if (this.formulaire.value.id) {
      this.collaborateurService.update(this.collaborateur.id,this.formulaire.value).subscribe(data => {
        this.isLoadingResults=false;
        this.openSnackBar("Collaborateur modifié avec succès","OK");
        this.router.navigate([environment.FRONTEND_ROUTES.COLLABORATEUR]);
        },
        errorResponse => {
          this.isLoadingResults=false;
          ToibibouUtils.notifyRemoteError(errorResponse.error, this._snackBar);
        }
      );
    } else {
      this.collaborateurService.add(this.formulaire.value).subscribe(data => {
        this.isLoadingResults=false;
        this.openSnackBar("Collaborateur ajouté avec succès","OK");
        this.router.navigate([environment.FRONTEND_ROUTES.COLLABORATEUR]);
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

public getSite(){
  return this.siteService.getAll().subscribe(data =>{
    this.sites = data;
  })
}
public getPays(){
  return this.paysService.getAll().subscribe(data =>{
    this.paysS = data;
  })
}
}
