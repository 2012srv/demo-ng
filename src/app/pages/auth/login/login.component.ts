import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UtilService } from 'src/app/services/util.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public util: UtilService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // const options = {
    //   title: 'Remove Application',
    //   message: 'Are you sure to remove ',
    //   cancelText: 'No',
    //   confirmText: 'Yes'
    // };
    // this.confirmService.open(options);
    // this.confirmService.confirmed().subscribe(confirmed => {
    //   console.log(confirmed);
    // });
  }

  signIn(): void {
    const postData = { email: "2012srv@gmail.com", password: "2012srv" };
    this.authService.doLogin(postData).subscribe(
      {
        next: (res: any) => {
          console.log(res);
          this.util.setSession('session', res);
          this.authService.isLoggedIn$.next(true);
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
    // this.util.setSession('accessToken', res.accessToken);
    // this.util.setSession('refreshToken', res.refreshToken);

    // 
  }

}
