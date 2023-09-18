import { Injectable, inject } from '@angular/core';
import { IAddCategoryRequest } from '../models/iadd-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICategory } from '../models/icategory.model';
import { environment } from 'src/environments/environment';
import { IUpdateCategoryRequest } from '../models/iupdate-category-request.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http: HttpClient = inject(HttpClient);

  constructor() { }

  //private  serverUrl:string=`https://localhost:7163`;

  public getAllCategories(): Observable<ICategory[]> {
    let dataURL: string = `${environment.apiBaseUrl}/api/categories`;
    return this.http.get<ICategory[]>(dataURL);
  }
  public getCatagoryById(id: string): Observable<ICategory> {
    let dataURL: string = `${environment.apiBaseUrl}/api/categories/${id}`;
    return this.http.get<ICategory>(dataURL);
  }

  public addCategory(model: IAddCategoryRequest): Observable<void> {
    let dataURL: string = `${environment.apiBaseUrl}/api/categories?addAuth=true`;
    return this.http.post<void>(dataURL, model);
  }

  public updateCatagory(id: string, updateCategoryRequest: IUpdateCategoryRequest): Observable<ICategory> {
    let dataURL: string = `${environment.apiBaseUrl}/api/categories/${id}?addAuth=true`;
    return this.http.put<ICategory>(dataURL, updateCategoryRequest)
  }

  public deleteCatagory(id: string): Observable<ICategory> {
    let dataURL: string = `${environment.apiBaseUrl}/api/categories/${id}?addAuth=true`;
    return this.http.delete<ICategory>(dataURL);
  }

  public deleteMultipleCatagory(ids: string[]): Observable<void> {
    let dataURL: string = `${environment.apiBaseUrl}/api/categories/DeleteCategories?addAuth=true`;
    return this.http.post<void>(dataURL, ids)
  }
}
