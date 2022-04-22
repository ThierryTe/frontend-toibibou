import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationFormComponent } from './location-form/location-form.component';
import { LocationResolver } from './location-resolver';
import { LocationComponent } from './location.component';

const routes: Routes = [
  { path: '', component: LocationComponent },
   {path:'edition',component: LocationFormComponent, data:{breadcrumb:"Création"}},
  {path:'edition/:id',component:LocationFormComponent, resolve:{location:LocationResolver},data:{breadcrumb:"Modification"}}     ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
