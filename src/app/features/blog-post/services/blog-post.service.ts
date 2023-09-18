import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAddBlogPostRequest } from '../models/iadd-blogpost-request.model';
import { IBlogPost } from '../models/iblog-post.model';
import { IUpdateBlogpostRequest } from '../models/iupdate-blogpost-request.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {
  private http: HttpClient = inject(HttpClient);
  constructor() { }
  public createBlogPost(data: IAddBlogPostRequest): Observable<IBlogPost> {
    let dataURL: string = `${environment.apiBaseUrl}/api/BlogPosts?addAuth=true`;
    return this.http.post<IBlogPost>(dataURL, data);
  }

  public getAllBlogPosts(): Observable<IBlogPost[]> {
    let dataURL: string = `${environment.apiBaseUrl}/api/BlogPosts`;
    return this.http.get<IBlogPost[]>(dataURL);
  }

  public getBlogPostById(id: string): Observable<IBlogPost> {
    let dataURL: string = `${environment.apiBaseUrl}/api/BlogPosts/${id}`;
    return this.http.get<IBlogPost>(dataURL);
  }

  public getBlogPostByUrlHandle(urlHandle: string): Observable<IBlogPost> {
    let dataURL: string = `${environment.apiBaseUrl}/api/blogPosts/${urlHandle}`;
    return this.http.get<IBlogPost>(dataURL);
  }

  public updateBlogPost(id: string, updateBlogPostRequest: IUpdateBlogpostRequest): Observable<IBlogPost> {
    let dataURL: string = `${environment.apiBaseUrl}/api/BlogPosts/${id}?addAuth=true`;
    return this.http.put<IBlogPost>(dataURL, updateBlogPostRequest);
  }
  public deleteBlogPost(id: string): Observable<IBlogPost> {
    let dataURL: string = `${environment.apiBaseUrl}/api/BlogPosts/${id}?addAuth=true`;
    return this.http.delete<IBlogPost>(dataURL);
  }
}
