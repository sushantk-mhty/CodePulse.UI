import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/features/auth/models/iuser.model';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit,OnDestroy {

  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);
  private authServiceSubscription?:Subscription;
  user?:IUser;
  
  ngOnInit(): void {
    this.authServiceSubscription=this.authService.user()
      .subscribe({
        next: (response) => {
          this.user=response;
        }
      });
     this.user= this.authService.getUser();
  }

  onLogout():void{
    this.authService.logout();
    this.router.navigateByUrl('/');
  }
  ngOnDestroy(): void {
    this.authServiceSubscription?.unsubscribe();
  }
}
