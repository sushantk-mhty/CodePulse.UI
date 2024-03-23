import { Injectable, inject } from '@angular/core';
import { IAddCategoryRequest } from '../models/iadd-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ICategory } from '../models/icategory.model';
import { environment } from 'src/environments/environment';
import { IUpdateCategoryRequest } from '../models/iupdate-category-request.model';
import { CookieService } from 'ngx-cookie-service';
import { APIConstant } from '../../constant/APIConstants';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  //private  serverUrl:string=`https://localhost:7163`;

  public getAllCategories(query?: string,sortBy?:string,sortDirection?:string,pageNumber ?:number,pageSize ?:number ): Observable<ICategory[]> {
    //let dataURL: string = `${environment.apiBaseUrl}/api/categories`;

    let params = new HttpParams();
    if (query) { params = params.set('query', query); }
    if (sortBy) { params = params.set('sortBy', sortBy); }
    if (sortDirection) { params = params.set('sortDirection', sortDirection); }
    if (pageNumber) { params = params.set('pageNumber', pageNumber); }
    if (pageSize) { params = params.set('pageSize', pageSize); }
    
    let dataURL: string = `${
      environment.apiBaseUrl + APIConstant.category.Categories
    }`;
    
    return this.http.get<ICategory[]>(dataURL, {
      params: params
    });
  }
  public getCatagoryById(id: string): Observable<ICategory> {
    //let dataURL: string = `${environment.apiBaseUrl}/api/categories/${id}`;
    let dataURL: string = `${environment.apiBaseUrl + APIConstant.category.Categories}/${id}`;
    return this.http.get<ICategory>(dataURL);
  }

  public getCatagoryCount(): Observable<number> {
    let dataURL: string = `${environment.apiBaseUrl + APIConstant.category.Categories}/count`;
    return this.http.get<number>(dataURL);
  }

  public addCategory(model: IAddCategoryRequest): Observable<void> {
    let dataURL: string = `${environment.apiBaseUrl}/api/categories?addAuth=true`;
    return this.http.post<void>(dataURL, model);
  }

  public updateCatagory(
    id: string,
    updateCategoryRequest: IUpdateCategoryRequest
  ): Observable<ICategory> {
    let dataURL: string = `${environment.apiBaseUrl}/api/categories/${id}?addAuth=true`;
    return this.http.put<ICategory>(dataURL, updateCategoryRequest);
  }

  public deleteCatagory(id: string): Observable<ICategory> {
    let dataURL: string = `${environment.apiBaseUrl}/api/categories/${id}?addAuth=true`;
    return this.http.delete<ICategory>(dataURL);
  }

  public deleteMultipleCatagory(ids: string[]): Observable<void> {
    let dataURL: string = `${environment.apiBaseUrl}/api/categories/DeleteCategories?addAuth=true`;
    return this.http.post<void>(dataURL, ids);
  }
}
