import { Component, OnDestroy } from '@angular/core';
import { IAddCategoryRequest } from '../../models/iadd-category-request.model';
import { CategoryService } from '../../services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy {
  public model: IAddCategoryRequest = {} as IAddCategoryRequest;
  private addCategorySubscription?:Subscription;

  constructor(private categoryService: CategoryService, 
              private router:Router) { }

  

  onFormSubmit() {
    this.addCategorySubscription=this.categoryService.addCategory(this.model)
      .subscribe({
        next: (response) => {
         alertify.success('Save Successfully');
            setTimeout(() => {
              this.router.navigateByUrl('/admin/categories').then();
            }, 5000);
        },
        error: (error) => {
 
        }

      });
  }

  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }
}
