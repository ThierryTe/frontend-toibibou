import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { AppSettings } from 'src/app/app.settings'; 
import { environment } from 'src/environments/environment';   
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AppService {
 
  
  public url = environment.url + '/assets/data/'; 
  
  constructor(public http:HttpClient, 
              private datePipe:DatePipe,
              private bottomSheet: MatBottomSheet, 
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              public appSettings:AppSettings,
              public translateService: TranslateService) { }  

  public openCart(component:any){  
    this.bottomSheet.open(component, {
      direction: (this.appSettings.settings.rtl) ? 'rtl':'ltr'
    }).afterDismissed().subscribe(isRedirect=>{  
      if(isRedirect){ 
        window.scrollTo(0,0);  
      }        
    });  
  }

  public openDialog(component:any, data:any, panelClass:any){ 
    return this.dialog.open(component, {
      data: data, 
      panelClass: panelClass,
      autoFocus: false,
      direction: (this.appSettings.settings.rtl) ? 'rtl':'ltr'
    });  
  } 

  public getTranslateValue(key:string, param:string = ''){  
    let value = null;
    this.translateService.get(key, { param: param }).subscribe((res: string) => {
      value = res;
    }) 
    return value; 
  } 

  private mailApi = 'https://mailthis.to/codeninja'
  public PostMessage(input: any) {
    return this.http.post(this.mailApi, input, { responseType: 'text' })
      .pipe(
        map(
          (response:any) => {
            if (response) {
              return response;
            }
          },
          (error: any) => {
            return error;
          }
        )
      )
  } 

}
