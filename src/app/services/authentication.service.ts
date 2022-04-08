import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserElement } from '../models/user.model';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{
  constructor(private http: HttpClient,public router:Router) { }

  login(user:any):Observable<any> {
    return this.http.post(`${environment.auth.LOGIN_API}`, 
    { username:user.username, 
      password:user.password},
    httpOptions);
}
logout(){
  window.sessionStorage.clear();
  this.router.navigateByUrl('login');
}

 register(user:any): Observable<any> {
  return this.http.post(environment.auth.INSCRIPTION_API, {
    type: user.type,
    nom: user.nom,
    prenom:user.prenom ,
    contact:user.contact,
    email:user.email,
    societe:user.societe,
    image: user.image,
    username:user.username,
    password:user.password
  }, httpOptions);
} 
  
  /* handleErrorServer() { 
    this.handleError<any>(`ERROR SERVER`)
    console.log("handleErrorServer");

    this.router.navigate(['/error']); 
  } */
  refreshtoken(token: string){
    return this.http.post(`${environment.auth.REFRESH_TOKEN_API}`,{
      refreshToken: token
    },
    httpOptions
    );

  }
  public checkIfAmLogin(): Observable<boolean> {

    return this.http.head(environment.auth.CHECK_IF_AM_LOGIN, { observe: "response" }).pipe(
      map((res) => {
        if(res.status===200){
          return  true;
         }else {
           return false;
         }
      }),
      catchError((err) => {
        return of(false)
      }),);
  }
  
}
