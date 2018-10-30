import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LogoutService } from 'src/app/login';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private logOutService: LogoutService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {        
        return next.handle(request).pipe(catchError(err => { 
            console.log("Error status is "+err.status)           
            if (err.status === 401 || err.status === 0) { //Status code 0 is NSHTTPURLResponse object generally means there was no response                
                this.logOutService.logout();                
            }
            
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}