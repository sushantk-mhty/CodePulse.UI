import { Component, OnDestroy, ViewChild, inject } from '@angular/core';
import { ILoginRequest } from '../../models/ilogin-request.model';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as alertify from 'alertifyjs';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {

  public model: ILoginRequest = {} as ILoginRequest;
  private authService: AuthService = inject(AuthService);
  private cookieService: CookieService = inject(CookieService);
  private router: Router = inject(Router);
  private userLoginSubscription?:Subscription;
  private userRegisterSubscription?:Subscription;
  @ViewChild('form',{static:false}) loginForm?:NgForm;
  onFormSubmit(): void {
   this.userLoginSubscription= this.authService.login(this.model)
      .subscribe({
        next: (response) => {
          //set Auth Cookie
          this.cookieService.set('Authorization', `Bearer ${response.token}`,
            undefined, '/', undefined, true, 'Strict');

          //set User
          this.authService.setUser({
            email: response.email,
            roles: response.roles
          });

          //Redirect to Home Page
          this.router.navigateByUrl('/');
        }
      })
  }
  onRegisterSubmit():void{
     this.userRegisterSubscription= this.authService.register(this.model)
      .subscribe({
        next:()=>{
          alertify.success('Registered Successfully');
          setTimeout(() => {
            this.router.navigateByUrl('/login').then();
          }, 5000);
          this.loginForm?.resetForm();
        }
      })
  }
  ngOnDestroy(): void {
    this.userLoginSubscription?.unsubscribe();
    this.userRegisterSubscription?.unsubscribe();
  }
}
