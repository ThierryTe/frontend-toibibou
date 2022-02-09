import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { DatePipe } from '@angular/common';

import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { AgmCoreModule } from '@agm/core'; 

import { environment } from 'src/environments/environment';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader'; 
export function HttpLoaderFactory(httpClient: HttpClient) { 
  return new TranslateHttpLoader(httpClient, environment.url +'/assets/i18n/', '.json');
}
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorI18nService } from './theme/utils/mat-paginator-i18n.service';

import { OverlayContainer } from '@angular/cdk/overlay';
import { CustomOverlayContainer } from './theme/utils/custom-overlay-container';
import { AppInterceptor } from './theme/utils/app-interceptor';

import { AssociationRoutingModule } from './association-routing.module'; 
import { SharedModule } from './shared/shared.module'; 
import { AppComponent } from './app.component';
import { AppSettings } from './app.settings';
import { AdminComponent } from './layout/admin-page/admin.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AdminModule } from './layout/admin-page/admin.module';
 



@NgModule({
  declarations: [
    AppComponent,  
  ],
  imports: [  
    BrowserModule.withServerTransition({ appId: 'serverApp' }), 
    BrowserAnimationsModule,
    AdminModule,
    HttpClientModule, 
    NgProgressModule,
    NgProgressHttpModule,
    MatToolbarModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAO7Mg2Cs1qzo_3jkKkZAKY6jtwIlm41-I',
      libraries: ["places"]
    }), 
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AssociationRoutingModule
    
  ],
  providers: [ 
    AppSettings,
    { provide: OverlayContainer, useClass: CustomOverlayContainer },
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    DatePipe,
    { provide: MatPaginatorIntl, useClass: MatPaginatorI18nService }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
