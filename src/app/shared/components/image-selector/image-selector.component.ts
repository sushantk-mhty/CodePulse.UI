import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { Observable, Subscription } from 'rxjs';
import { IBlogImage } from '../../models/iblog-image.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.scss']
})
export class ImageSelectorComponent implements OnInit , OnDestroy{
  private file?:File;
  fileName:string='';
  title:string='';
  images$?:Observable<IBlogImage[]>;
  private uploadImageSubscription?: Subscription;
  private imageService:ImageService=inject(ImageService) ;
 @ViewChild('form',{static:false}) imageUploadForm?:NgForm;
 @ViewChild('inputFile',{static: false}) imageUploader?: ElementRef;
  ngOnInit(): void {
    this.getImages();
    
  }
  public onFileUploadChange(event:Event):void{
    const element=event.currentTarget as HTMLInputElement;
    this.file=element.files?.[0];
  }
  public onUploadImage():void{
    if(this.file && this.fileName !=='' && this.title !=='' ){
    //Image service to upload the Image
     this.uploadImageSubscription=this.imageService.uploadImage(this.file,this.fileName,this.title)
     .subscribe({
      next:(response)=>{
        if (this.imageUploader)
        this.imageUploader.nativeElement.value='';
        this.imageUploadForm?.resetForm();
        this.getImages();
      }
     })
    }
  }
  private getImages(){
    this.images$=this.imageService.getAllImages();
  }
  public onSelectImage(image:IBlogImage):void{
    this.imageService.selectImage(image);
    
  }
  ngOnDestroy(): void {
    this.uploadImageSubscription?.unsubscribe();
  }
}
