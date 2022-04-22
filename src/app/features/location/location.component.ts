import { Compiler, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {LocationModel } from 'src/app/models/location.model';
import { LocationService } from 'src/app/services/location.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  displayedColumns: string[] = ['id', 'ville', 'quartier', 'titre', 'description','prix','condition','lien','statut','actions'];
  dataSource!: any;
  location: LocationModel[]=[];
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  isLoadingResults = false;
  constructor( public locationService:LocationService, private _snackBar: MatSnackBar,
    public dialog: MatDialog,private compiler: Compiler, private router: Router) { }

  ngOnInit(): void {
    this.getLocation();
  }


  public ajout() {
    this.router.navigate([`${environment.FRONTEND_ROUTES.LOCATION}/edition`]);
  }

  public modifier(location:LocationModel) {
    this.router.navigate([`${environment.FRONTEND_ROUTES.LOCATION}/edition`, location.id]);
   }

  public supprimer(data:any) {
   this.locationService.delete(data.id).subscribe(
     data => {
       this.openSnackBar("La location a été supprimée avec succès","OK");
     },
     errorResponse => {
       let errorData = errorResponse.error;
  
       this.openSnackBar("Impossible de supprimer la location","OK");
     }
   );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 25000,
      verticalPosition:'top'
   
    });
   }

   public getLocation(){
     this.locationService.getAll().subscribe(data =>{
       this.location=data;
       this.dataSource = new MatTableDataSource(this.location);
     });
   }
}
