import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { ICategory } from '../../models/icategory.model';
import { IUpdateCategoryRequest } from '../../models/iupdate-category-request.model';
import * as alertify from 'alertifyjs';
@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  id: string | null = null;
  paramSubscription?: Subscription;
  editCategorySubscription?: Subscription;
  deleteCategorySubscription?: Subscription;
  public category: ICategory = {} as ICategory;
  constructor(private route: ActivatedRoute, private categoryService: CategoryService, private router: Router) {

  }
  ngOnInit(): void {
    this.paramSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');
        if (this.id) {
          //GET data from the API for this category Id
          this.categoryService.getCatagoryById(this.id)
            .subscribe({
              next: (response) => {
                this.category = response;
              }
            })
        }
      }
    })
  }
  onFormSubmit(): void {
    const updateCategoryRequest: IUpdateCategoryRequest = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? ''
    };
    //pass this object to service
    if (this.id)
      this.editCategorySubscription = this.categoryService.updateCatagory(this.id, updateCategoryRequest)
        .subscribe({
          next: (response) => {
            alertify.success('Updated successfully');
            setTimeout(() => {
              this.router.navigateByUrl('/admin/categories').then();
            }, 5000);
          }
        })

  }
  onDelete(): void {
    alertify.confirm('Delete Record',"Are you want to delete the records?",
       () => {
        if (this.id)
        this.deleteCategorySubscription = this.categoryService.deleteCatagory(this.id)
          .subscribe({
            next: (response) => {
              alertify.success('Deleted successfully');
              setTimeout(() => {
                this.router.navigateByUrl('/admin/categories').then();
              }, 4000);
            }
          })
      },
     ()=> {
       
      });
  }
  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
    this.deleteCategorySubscription?.unsubscribe();
  }
}
