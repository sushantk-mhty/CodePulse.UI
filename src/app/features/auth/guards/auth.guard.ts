import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.service';
import jwt_decode from 'jwt-decode';
import * as alertify from 'alertifyjs';
export const authGuard: CanActivateFn = (route, state) => {
  const cookieService: CookieService = inject(CookieService);
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);
  const user=authService.getUser();
  //Check for JWT token
  let token = cookieService.get('Authorization');

  if (token && user) {
    token = token.replace('Bearer ', '');
    const decodedToken: any = jwt_decode(token);

    //Check if token has expired

    const expirationDate = decodedToken.exp * 1000;
    const currentTime = new Date().getTime();

    if (expirationDate < currentTime) {
       //Logout
    authService.logout();
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
    }
    else{
      //Token Still Valid
      if(user.roles.includes('Writer')){
        return true;
      }else{
        alertify.error('Unauthorized');
        //router.navigateByUrl('/');
        let currentUrl = router.url;
        router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            router.navigate([currentUrl]);
          });

        return false;
      }
    }
  }
  else {
    //Logout
    authService.logout();
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }
};
