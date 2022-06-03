import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Observable, of, switchMap, take, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UtilService } from '../services/util.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  isRefreshing: boolean = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private authService: AuthService,
    private util: UtilService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const user = this.authService.getUser;
    const token = user ? user.accessToken : null;
    // console.log(token);
    if (!!user && token) {
      request = this.addTokenHeader(request, token);
    }

    return next.handle(request).pipe(catchError((error: any) => {
      // if (error instanceof HttpErrorResponse && error.status === 401) {
      if (error.status === 401 && !error.url.includes('/auth/')) {
        return this.handle401Error(request, next);
      } else {
        throw error;
      }
    }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authService.refreshToken().pipe(
        tap((token: any) => {
          const sessionData = this.util.getSession('session');
          this.util.setSession('session', { ...sessionData, accessToken: token.accessToken });
        }),
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.accessToken);
          return next.handle(this.addTokenHeader(request, token.accessToken));
        })
      );
    }
    return this.refreshTokenSubject.pipe(
      filter((token: any) => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }
}
