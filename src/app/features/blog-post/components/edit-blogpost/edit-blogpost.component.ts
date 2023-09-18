import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from 'src/app/features/category/services/category.service';
import { BlogPostService } from '../../services/blog-post.service';
import { IBlogPost } from '../../models/iblog-post.model';
import { ICategory } from 'src/app/features/category/models/icategory.model';
import { IUpdateBlogpostRequest } from '../../models/iupdate-blogpost-request.model';
import * as alertify from 'alertifyjs';
import { ImageService } from 'src/app/shared/services/image.service';
@Component({
  selector: 'app-edit-blogpost',
  templateUrl: './edit-blogpost.component.html',
  styleUrls: ['./edit-blogpost.component.scss']
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  id: string | null = null;
  paramSubscription?: Subscription;
  updateBlogPostSubscription?: Subscription;
  getBlogPostSubscription?: Subscription;
  deleteBlogPostSubscription?: Subscription;
  imageSelectSubscription?: Subscription;
  categories$?: Observable<ICategory[]>;
  public model: IBlogPost = {} as IBlogPost;
  selectedCategories?: string[];
  isImageSelectorVisible: boolean = false;
  constructor(private route: ActivatedRoute, private blogPostService: BlogPostService, private router: Router, private categoryService: CategoryService, private imageService:ImageService) { }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
    this.paramSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          //GET BlogPost data from the API for this category Id
          this.getBlogPostSubscription = this.blogPostService.getBlogPostById(this.id)
            .subscribe({
              next: (response) => {
                this.model = response;
                this.selectedCategories = response.categories.map(x => x.id);
              }
            });
        }
        this.imageSelectSubscription= this.imageService.onSelectImage()
        .subscribe({
          next:(response)=>{
           if(this.model)
           this.model.featuredImageUrl=response.url;
           this.isImageSelectorVisible=false;

          }
        })
      }
    })
  }
  onFormBlogPostSubmit(): void {
    //convert this model to Request Object
    if (this.model && this.id) {
      var updateBlogPost: IUpdateBlogpostRequest = {
        author: this.model.author,
        content: this.model.content,
        shortDescription: this.model.shortDescription,
        featuredImageUrl: this.model.featuredImageUrl,
        isVisible: this.model.isVisible,
        publishedDate: this.model.publishedDate,
        title: this.model.title,
        urlHandle: this.model.urlHandle,
        categories: this.selectedCategories ?? []
      };
      this.updateBlogPostSubscription = this.blogPostService.updateBlogPost(this.id, updateBlogPost)
        .subscribe({
          next: (response) => {
            alertify.success('Updated successfully');
            setTimeout(() => {
              this.router.navigateByUrl('/admin/blogposts').then();
            }, 5000);
          }
        })
    }
  }
  onDelete(): void {
    alertify.confirm('Delete Record', "Are you want to Delete the records?",
      () => {
        if (this.id)
          this.deleteBlogPostSubscription = this.blogPostService.deleteBlogPost(this.id)
            .subscribe({
              next: (response) => {
                alertify.success('Deleted successfully');
                setTimeout(() => {
                  this.router.navigateByUrl('/admin/blogposts').then();
                }, 5000);
              }
            })
      },
      () => {
      });
  }
  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }
  closeImageSelector(): void {
    this.isImageSelectorVisible = false;
  }
  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
    this.imageSelectSubscription?.unsubscribe();
  }
}
