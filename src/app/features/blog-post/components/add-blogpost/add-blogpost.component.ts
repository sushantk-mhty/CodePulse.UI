import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { IAddBlogPostRequest } from '../../models/iadd-blogpost-request.model';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../../services/blog-post.service';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { CategoryService } from 'src/app/features/category/services/category.service';
import { ICategory } from 'src/app/features/category/models/icategory.model';
import { ImageService } from 'src/app/shared/services/image.service';
@Component({
  selector: 'app-add-blogpost',
  templateUrl: './add-blogpost.component.html',
  styleUrls: ['./add-blogpost.component.scss']
})
export class AddBlogpostComponent implements OnInit,OnDestroy{

  model: IAddBlogPostRequest = { isVisible: true, publishedDate: new Date() } as IAddBlogPostRequest;
  categories$ ?:Observable<ICategory[]>;
  private createBlogPostSubscription?: Subscription;
  private imageSelectSubscription?: Subscription;
  private categoryService:CategoryService=inject(CategoryService);
  private blogPostService:BlogPostService=inject(BlogPostService);
  private imageService:ImageService=inject(ImageService);
  private router:Router=inject(Router);
  isImageSelectorVisible: boolean = false;
  constructor(){}
  // constructor(private blogPostService: BlogPostService, private router: Router,private categoryService:CategoryService) {
  // }
  ngOnInit(): void {
    this.categories$=this.categoryService.getAllCategories();
   this.imageSelectSubscription= this.imageService.onSelectImage()
    .subscribe({
      next:(selectedImage)=>{
       this.model.featuredImageUrl=selectedImage.url;
       this.closeImageSelector();
      }
    })

  } 

  onFormBlogPostSubmit(): void {
    this.createBlogPostSubscription = this.blogPostService.createBlogPost(this.model)
      .subscribe({
        next: (response) => {
          alertify.success('Save Successfully');
          setTimeout(() => {
            this.router.navigateByUrl('/admin/blogposts').then();
          }, 5000);
        }
      })
  } 
  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }
  closeImageSelector(): void {
    this.isImageSelectorVisible = false;
  }
  ngOnDestroy(): void {
    this.createBlogPostSubscription?.unsubscribe();
    this.imageSelectSubscription?.unsubscribe();
  }
}
