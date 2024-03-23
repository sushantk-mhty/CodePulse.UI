import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { ICategory } from '../../models/icategory.model';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
})
export class CategoryListComponent implements OnInit, OnDestroy {
  categories?: ICategory[];
  categories$?: Observable<ICategory[]>;
  HighlightRow?: string;
  selectedRow?: string;
  totalCount?: number;
  listCount: number[] = [];
  pageNumber: number = 1;
  pageSize: number = 5;
  deleteCategoriesSubscription?: Subscription;
  getAllCategoriesSubscription?: Subscription;

  @ViewChild('queryText') queryValue :ElementRef | undefined;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.getCatagoryCount().subscribe({
      next: (value) => {
        this.totalCount = value;
        this.listCount = new Array(Math.ceil(value / this.pageSize));
        this.getAllCategories(
          undefined,
          undefined,
          undefined,
          this.pageNumber,
          this.pageSize
        );
      },
    });
  }
  getAllCategories(
    query?: string,
    sortBy?: string,
    sortDirection?: string,
    pageNumber?: number,
    pageSize?: number
  ) {
    this.getAllCategoriesSubscription = this.categoryService
      .getAllCategories(query, sortBy, sortDirection, pageNumber, pageSize)
      .subscribe({
        next: (response) => {
          this.categories = response;
        },
      });
  }
  onSearch(query: string) {
    if(query)
    this.getAllCategories(query, undefined, undefined);
  }
  sort(sortBy: string, sortDirection: string) {
    this.getAllCategories(undefined, sortBy, sortDirection);
  }
  getPage(pageNumber: number) {
    if(this.queryValue != undefined) this.queryValue.nativeElement.value ='';
    this.pageNumber=pageNumber;
    this.getAllCategories(
      undefined,
      undefined,
      undefined,
      this.pageNumber,
      this.pageSize
    );
  }
  getPrevPage(){
    if(this.queryValue != undefined) this.queryValue.nativeElement.value ='';
    if(this.pageNumber -1 <1){
      return;
    }
    this.pageNumber -=1;
    this.getAllCategories(
      undefined,
      undefined,
      undefined,
      this.pageNumber,
      this.pageSize
    );
  }
  getNextPage(){
    if(this.queryValue != undefined) this.queryValue.nativeElement.value ='';
    if(this.pageNumber +1 > this.listCount.length){
      return;
    }
    this.pageNumber +=1;
    this.getAllCategories(
      undefined,
      undefined,
      undefined,
      this.pageNumber,
      this.pageSize
    );
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
    return this.categories?.every((p) => p.checked);
  }
  checkAllCheckBox(ev: any) {
    this.categories?.forEach((x) => (x.checked = ev.target.checked));
  }
  onDelete(): void {
    const selectedCategories = this.categories
      ?.filter((category) => category.checked)
      .map((p) => p.id);
    if (selectedCategories && selectedCategories.length > 0) {
      alertify.confirm(
        'Delete Records',
        'Are you want to delete the records?',
        () => {
          this.deleteCategoriesSubscription = this.categoryService
            .deleteMultipleCatagory(selectedCategories as string[])
            .subscribe({
              next: (response) => {
                alertify.success('Deleted successfully');
                setTimeout(() => {
                  this.router.navigateByUrl('/admin/categories').then();
                }, 4000);
              },
            });
        },
        () => {}
      );
    } else {
      alertify.error('Please select atleast one row!');
    }
  }

  ngOnDestroy(): void {
    this.getAllCategoriesSubscription?.unsubscribe();
    this.deleteCategoriesSubscription?.unsubscribe();
  }
}
