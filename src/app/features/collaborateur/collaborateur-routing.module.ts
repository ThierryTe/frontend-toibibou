import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollaboFormComponent } from './collabo-form/collabo-form.component';
import { CollaborateurResolver } from './collaborateur-resolver';
import { CollaborateurComponent } from './collaborateur.component';

const routes: Routes = [{ path: '', component: CollaborateurComponent },
{path:'ajout',component: CollaboFormComponent, data:{breadcrumb:"Ajouter un collaborateur"}},
{path:"modifier/:id", component: CollaboFormComponent, resolve:{collaborateur: CollaborateurResolver}, data:{breadcrumb:"Modification"}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollaborateurRoutingModule { }
