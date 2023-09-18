import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ICategory } from '../../models/icategory.model';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit, OnDestroy {

  categories?: ICategory[];
  categories$?: Observable<ICategory[]>;
  HighlightRow?: string;
  selectedRow?: string;
  deleteCategoriesSubscription?: Subscription;
  getAllCategoriesSubscription?: Subscription;
  constructor(private categoryService: CategoryService, private router: Router) {

  }

  ngOnInit(): void {
    this.getAllCategoriesSubscription = this.categoryService.getAllCategories()
      .subscribe({
        next: (response) => {
          this.categories = response;
        }
      });
    //this.categories$ = this.categoryService.getAllCategories();
  }

  onClickRow(Guid: string) {
    this.HighlightRow = Guid;
  }
  onClickEditCategories() {
    if (this.HighlightRow?.length) {
      this.selectedRow = this.HighlightRow;
      this.router.navigate(['/admin/categories', this.selectedRow]);
    } else {
      alertify.error('Please select one row!');
    }
  }
  isAllCheckBoxChecked() {
    return this.categories?.every(p => p.checked);
  }
  checkAllCheckBox(ev: any) {
    this.categories?.forEach(x => x.checked = ev.target.checked)
  }
  onDelete(): void {
    const selectedCategories = this.categories?.filter(category => category.checked).map(p => p.id);
    if (selectedCategories && selectedCategories.length > 0) {
      alertify.confirm('Delete Records', "Are you want to delete the records?",
        () => {
          this.deleteCategoriesSubscription = this.categoryService.deleteMultipleCatagory(selectedCategories as string[])
            .subscribe({
              next: (response) => {
                alertify.success('Deleted successfully');
                setTimeout(() => {
                  this.router.navigateByUrl('/admin/categories').then();
                }, 4000);
              }
            })
        },
        () => {
        });
    }
    else {
      alertify.error('Please select atleast one row!');
    }
  }

  ngOnDestroy(): void {
    this.getAllCategoriesSubscription?.unsubscribe();
    this.deleteCategoriesSubscription?.unsubscribe();
  }
}