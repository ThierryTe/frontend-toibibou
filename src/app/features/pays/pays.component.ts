import { HttpErrorResponse } from '@angular/common/http';
import { Compiler, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { PaysModel } from 'src/app/models/pays.model';
import { PaysService } from 'src/app/services/pays.service';
import { AppConfirmService } from 'src/app/shared/app-confirm/app-confirm.service';
import { PaysFormComponent } from './pays-form/pays-form.component';

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.scss']
})
export class PaysComponent implements OnInit {
  displayedColumns: string[] = ['code', 'libelle','actions'];
  dataSource!: any;
  loading=false;
  pays: PaysModel[]=[];
  public refeshDataSubject: Subject<string> = new Subject<string>();
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  constructor(public paysService:PaysService, private _snackBar: MatSnackBar,
    public dialog: MatDialog,private compiler: Compiler,  public appConfirme: AppConfirmService,private router: Router) { }

  ngOnInit(): void {
    this.loading=true;
    this.getPays();
  }


  public initDataSource(data:any){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;  
  }  
  public openFormModal(pays: PaysModel | null){
    this.dialogRef = this.dialog.open(PaysFormComponent, {
      data: pays,
      width: '40vw',
      height:'50vh',
      disableClose:true
    });

    this.dialogRef.afterClosed().subscribe(pays => {
      if(pays){
        if(pays.id) {
          this.openSnackBar("Le pays a été modifié avec succès","OK");   
        }else {
         this.openSnackBar("Le pays a été ajouté avec succès","OK");
        }
       }
       this.getPays();
       this.loading=false;
       this.refeshDataSubject.next("");
  });

  }
  public dialogRef?: MatDialogRef<PaysFormComponent, any>;

  public ajout(){
    this.openFormModal(null);
    }
  
    public modifier(pays:any) {
      this.openFormModal(pays);
     }


     public delete(collabo:PaysModel | any){
      this.appConfirme.confirm().subscribe((choix)=>{
        if(choix==true){
          this.paysService.delete(collabo.id).subscribe((data)=>{
            this.openSnackBar("Pays Supprimé avec success !","OK");
           this.getPays();
           this.loading=false;
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

   public getPays(){
     this.paysService.getAll().subscribe(data =>{
       this.pays=data;
       this.dataSource = new MatTableDataSource(this.pays);
       this.initDataSource(data); 
       this.loading=false
     });
   }


}
