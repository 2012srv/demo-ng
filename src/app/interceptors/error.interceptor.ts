import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

// import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    // this.toastr.error(`Error:`);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        retry(0),
        catchError((error: HttpErrorResponse) => {
          if ([403].includes(error.status)) {
            const options = {
              title: 'Session expired!',
              message: 'Please login again.',
              confirmText: 'Ok',
            };
            // this.alertService.open(options);
            // this.alertService.confirmed().subscribe(() => {
            //   this.authService.signOut();
            // });
            throw error.error;
          } else if (error.status === 500) {
            throw error.error;
          } else {
            throw error.error;
          }
        })
      )
  }

}
