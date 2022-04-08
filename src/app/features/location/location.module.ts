import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationRoutingModule } from './location-routing.module';
import { LocationComponent } from './location.component';
import { LocationFormComponent } from './location-form/location-form.component';
import { LocationService } from 'src/app/services/location.service';


@NgModule({
  declarations: [
    LocationComponent,
    LocationFormComponent
  ],
  imports: [
    CommonModule,
    LocationRoutingModule
  ],
  providers:[LocationService]
})
export class LocationModule { }
