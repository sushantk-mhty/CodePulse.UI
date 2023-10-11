import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import * as alertify from 'alertifyjs';

@Injectable()
export class HttperrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("Http Request started");
    return next.handle(request)
    .pipe(
      catchError((error:HttpErrorResponse)=>{
        const errorMessage=this.setError(error);
        console.log(error);
        alertify.error(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
  setError(error:HttpErrorResponse):string{
    let errorMessage= ' Unknown Error occured';
    if(error.error instanceof ErrorEvent){
      //Client Side Error
      errorMessage=error.error.message;
    }else{
      //Server side Error
      if(error.status !=0)
      errorMessage=error.error.title;
    }
    return errorMessage;
  }
}
