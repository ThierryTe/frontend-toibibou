import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import { SiteComponent } from './site.component';
import { SiteFormComponent } from './site-form/site-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SiteService } from 'src/app/services/site.service';
import { SiteResolver } from './site-resolver';
import { PipesModule } from 'src/app/theme/pipes/pipes.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SiteComponent,
    SiteFormComponent
  ],
  imports: [
    CommonModule,
    SiteRoutingModule,
    SharedModule,
    PipesModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers:[SiteService,SiteResolver]
})
export class SiteModule { }
