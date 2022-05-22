import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaysRoutingModule } from './pays-routing.module';
import { PaysComponent } from './pays.component';
import { PaysFormComponent } from './pays-form/pays-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaysService } from 'src/app/services/pays.service';


@NgModule({
  declarations: [
    PaysComponent,
    PaysFormComponent
  ],
  imports: [
    CommonModule,
    PaysRoutingModule,
    SharedModule
  ],
  providers:[PaysService]
})
export class PaysModule { }
