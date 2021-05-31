import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ToastService } from '../services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {

  constructor(
    private toast: ToastService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // console.log('HTTP INTECEPTADO ===== ' + JSON.stringify(next));
    return next.handle(req).pipe(
      catchError(error => {
        let errorMessage = '';
        if (error instanceof ErrorEvent) {
          // Error de cliente
          // errorMessage = `Client-side error: ${error.error.message}`;
          this.toast.showMsgError('Error en front');
        } else {
          // Error de backend
          // errorMessage = `Server-side error: ${error.status} ${error.message}`;
          this.toast.showMsgError('Error conectando con backend');
        }        
        // código que muestre el error en alguna parte fija de la pantalla.
        return throwError(errorMessage);
      })
    );
  }

}
