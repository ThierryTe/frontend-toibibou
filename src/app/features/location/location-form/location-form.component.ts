import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationModel } from 'src/app/models/location.model';
import { LocationService } from 'src/app/services/location.service';
import { LocationUtils } from 'src/app/shared/utils.functions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit {
  public formulaire!: FormGroup;
  public isLoadingResults:boolean = false;
  public location!: LocationModel;
  status=[
    'Disponible',
    'Occupée'
  ]

   get ville(){return this.formulaire.get('ville');}
   get quartier(){return this.formulaire.get('quartier');}
   get titre(){return this.formulaire.get('titre');}
   get description(){return this.formulaire.get('description');}
   get prix(){return this.formulaire.get('prix');}
   get condition(){return this.formulaire.get('condition');}
   get statut(){return this.formulaire.get('statut');}

  constructor(private locationService:LocationService,
    private _snackBar: MatSnackBar,
   public fb: FormBuilder,
   private route: ActivatedRoute,private router: Router) {
    this.location = this.route.snapshot.data['location'];
    this.formulaire = this.fb.group({
      id:[null],
      ville:[null, Validators.required],
      quartier:[null,Validators.required],
      titre:[null,Validators.required],
      description:[null,Validators.required],
      prix:[null,Validators.required],
      statut:[null,Validators.required],
      condition:[null,Validators.required],
      lien:[null]
    })
   }

  ngOnInit(): void {
    if(this.location){
      this.formulaire.patchValue({
        id:this.location.id,
        quartier:this.location.quartier,
        ville:this.location.ville,
        titre:this.location.titre,
        description:this.location.description,
        prix:this.location.prix,
        statut:this.location.statut,
        condition:this.location.condition,
        lien:this.location.lien,
      })
    }else{
      this.location = new LocationModel();
    }
  }

  resetForm(){
    this.router.navigate([`${environment.FRONTEND_ROUTES.LOCATION}`]);
}

onSubmit() {
  if (this.formulaire.value) {
    this.isLoadingResults=true;
    if (this.formulaire.value.guid) {

      this.locationService.update(this.formulaire.value).subscribe(data => {
        this.isLoadingResults=false;
        this.openSnackBar("Location modifiée  avec succès","OK");
        this.router.navigate([environment.FRONTEND_ROUTES.LOCATION]);
        },
        errorResponse => {
          this.isLoadingResults=false;
          LocationUtils.notifyRemoteError(errorResponse.error, this._snackBar);
        }
      );

    } else {
      this.locationService.add(this.formulaire.value).subscribe(data => {
        this.isLoadingResults=false;
        this.openSnackBar("Location ajoutée avec succès","OK");
        this.router.navigate([environment.FRONTEND_ROUTES.LOCATION]);
        },
        errorResponse => {
          this.isLoadingResults=false;
         LocationUtils.notifyRemoteError(errorResponse.error, this._snackBar);
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
