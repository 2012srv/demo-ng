import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<boolean>(this.util.getSession('session'));
  apiUrl: string = environment.apiUrl;

  constructor(private util: UtilService, private http: HttpClient) { }

  get getUser(): any {
    const user: any = this.isLoggedIn$.getValue();
    return user ? user : null;
  }

  doLogin(data: any): Observable<any> {
    return this.http.post(this.apiUrl + 'auth/login', data);
    // this.util.setSession('accessToken', res.accessToken);
    // this.util.setSession('refreshToken', res.refreshToken);

    // this.isLoggedIn$.next(true);
  }

  refreshToken() {
    // console.log(10);
    const refreshApi = this.apiUrl + 'auth/refresh';
    const sessionData = this.util.getSession('session');
    const token = sessionData ? sessionData.refreshToken : null;
    return this.http.post(refreshApi, {
      token
    });
  }

  signOut(): void {
    this.util.removeSession('session');
    this.isLoggedIn$.next(false);
  }

}
