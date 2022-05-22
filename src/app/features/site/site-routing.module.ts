import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SiteFormComponent } from './site-form/site-form.component';
import { SiteResolver } from './site-resolver';
import { SiteComponent } from './site.component';

const routes: Routes = [{ path: '', component: SiteComponent },
 {path:"ajout", component:SiteFormComponent,data:{breadcrumb: "Ajout d'un lieu"}},
{path:"modifier/:id", component:SiteFormComponent, resolve:{site: SiteResolver},data:{breadcrumb:"Modification"}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
