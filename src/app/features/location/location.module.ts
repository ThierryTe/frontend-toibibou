import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationRoutingModule } from './location-routing.module';
import { LocationComponent } from './location.component';
import { LocationFormComponent } from './location-form/location-form.component';
import { LocationService } from 'src/app/services/location.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { LocationResolver } from './location-resolver';


@NgModule({
  declarations: [
    LocationComponent,
    LocationFormComponent
  ],
  imports: [
    CommonModule,
    LocationRoutingModule,
    SharedModule
  ],
  providers:[LocationService,LocationResolver]
})
export class LocationModule { }
