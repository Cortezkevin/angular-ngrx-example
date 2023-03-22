import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor {

  constructor(){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersSend = new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token') || ''
    });  
    let reqClon = req.clone({
      headers: headersSend
    });
    return next.handle(reqClon);
  }
}