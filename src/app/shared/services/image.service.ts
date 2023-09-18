import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBlogImage } from '../models/iblog-image.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private http = inject(HttpClient);
  selectedImage:BehaviorSubject<IBlogImage> = new BehaviorSubject<IBlogImage>({
    id:'',
    fileExtension:'',
    fileName:'',
    title:'',
    url:''
  });
  constructor() { }


  public getAllImages(): Observable<IBlogImage[]> {
    let dataURL: string = `${environment.apiBaseUrl}/api/images`;
    return this.http.get<IBlogImage[]>(dataURL);
  }

  public uploadImage(file: File, fileName: string, title: string): Observable<IBlogImage> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('title', title);
    let dataURL: string = `${environment.apiBaseUrl}/api/images`;
    return this.http.post<IBlogImage>(dataURL, formData);
  }
  public selectImage(image:IBlogImage):void{
     this.selectedImage.next(image);
  }
  public onSelectImage():Observable<IBlogImage>{
    return this.selectedImage.asObservable();
  }

}
