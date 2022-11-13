import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _snackBar: MatSnackBar) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        var err: Error;
        err = error.error;
        if (typeof err.errorCode === 'undefined') {
          this._snackBar.open(`Response status ${error.message}`, undefined, {
            duration: 2500,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['MatSnack'],
          });
        } else {
          this._snackBar.open(`${err.errorCode}`, undefined, {
            duration: 2500,
            verticalPosition: 'top',
            horizontalPosition: 'right',
            panelClass: ['MatSnack'],
          });
        }
        return throwError(error.message);
      })
    );
  }
}

interface Error {
  errorCode: string;
  status: string;
  errorMessage: string;
}
