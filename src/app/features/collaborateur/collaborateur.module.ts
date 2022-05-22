import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollaborateurRoutingModule } from './collaborateur-routing.module';
import { CollaborateurComponent } from './collaborateur.component';
import { CollaboFormComponent } from './collabo-form/collabo-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CollaborateurService } from 'src/app/services/collaborateur.service';
import { CollaborateurResolver } from './collaborateur-resolver';
import { SiteService } from 'src/app/services/site.service';
import { PaysService } from 'src/app/services/pays.service';
import { PipesModule } from 'src/app/theme/pipes/pipes.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CollaborateurComponent,
    CollaboFormComponent
  ],
  imports: [
    CommonModule,
    CollaborateurRoutingModule,
    SharedModule,
    PipesModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers:[CollaborateurService,CollaborateurResolver,SiteService,PaysService]
})
export class CollaborateurModule { }
