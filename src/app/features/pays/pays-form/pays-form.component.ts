import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { PaysModel } from 'src/app/models/pays.model';
import { PaysService } from 'src/app/services/pays.service';
import { ToibibouUtils } from 'src/app/shared/utils.functions';

@Component({
  selector: 'app-pays-form',
  templateUrl: './pays-form.component.html',
  styleUrls: ['./pays-form.component.scss']
})
export class PaysFormComponent implements OnInit {
  public formulaire!: FormGroup;
  private _onDestroy = new Subject<void>();
  public isLoadingResults:boolean = false;
  listPays:any = []
  constructor(public dialogRef: MatDialogRef<PaysFormComponent>,
    @Inject(MAT_DIALOG_DATA) public pays: PaysModel, private _snackBar: MatSnackBar,
    public fb: FormBuilder, public paysService: PaysService) { 
      this.formulaire=this.fb.group({
        id:[null],
        code:[null, Validators.required],
        libelle:[null, Validators.compose([Validators.required])]
      });
    }

  ngOnInit(): void {
    if(this.pays){
      this.formulaire.patchValue({
        id:this.pays.id,
        code:this.pays.code,
        libelle:this.pays.libelle
      })  
    }else{
      this.pays= new PaysModel();
    }
  }
 onSubmit() {
    if (this.formulaire.value) {
      this.isLoadingResults = true;
      if (this.formulaire.value.id) {
        this.paysService.update(this.pays.id,this.formulaire.value).subscribe(
          data => {
            this.isLoadingResults = false;
            this.dialogRef.close(data);
          },
          errorResponse => {
            this.isLoadingResults = false;
            ToibibouUtils.notifyRemoteError(errorResponse.error, this._snackBar);
            }
        );
      } else {
        this.paysService.add(this.formulaire.value).subscribe(
          data => {
            this.isLoadingResults = false;
            this.dialogRef.close(this.formulaire.value);
          },
          errorResponse => {
            this.isLoadingResults = false;
            ToibibouUtils.notifyRemoteError(errorResponse.error, this._snackBar);
            }
        );
      }
    }

} 
closeFormModal(): void {
  this.dialogRef.close();
}
openSnackBar(message: string, action: string) {
  this._snackBar.open(message, action, {
    duration: 25000,
    verticalPosition: "top",
  });
}

ngOnDestroy() {
  this._onDestroy.next();
  this._onDestroy.complete();
}

public getPays(){
  return this.paysService.getAll().subscribe(data =>{
    this.listPays = data;
  })
}
}
