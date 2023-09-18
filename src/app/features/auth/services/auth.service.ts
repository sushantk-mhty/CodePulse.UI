import { Injectable, inject } from '@angular/core';
import { ILoginRequest } from '../models/ilogin-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ILoginResponse } from '../models/ilogin-response.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IUser } from '../models/iuser.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http: HttpClient = inject(HttpClient);
  private cookieService: CookieService = inject(CookieService);
  $user = new BehaviorSubject<IUser | undefined>(undefined);
  constructor() { }

  // public login(request:ILoginRequest):Observable<ILoginResponse>{
  //   const postData:ILoginRequest={email:request.email,password:request.password};
  //   let dataURL: string = `${environment.apiBaseUrl}/api/auth/login`;
  //   return this.http.post<ILoginResponse>(dataURL, postData);
  // }

  public login(request: ILoginRequest): Observable<ILoginResponse> {
    let dataURL: string = `${environment.apiBaseUrl}/api/auth/login`;
    return this.http.post<ILoginResponse>(dataURL, request);
  }

  public setUser(user: IUser): void {
    this.$user.next(user);
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
  }

  public user(): Observable<IUser | undefined> {
    return this.$user.asObservable();
  }
  public getUser(): IUser | undefined {
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');
    if (email && roles){
      const user: IUser = {
        email: email,
        roles: roles?.split(',')
      };
      return user;
    }
    return undefined;
  }
  public logout(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined);
  }

  public register(request: ILoginRequest): Observable<ILoginResponse> {
    let dataURL: string = `${environment.apiBaseUrl}/api/auth/register`;
    return this.http.post<ILoginResponse>(dataURL, request);
  }
}
