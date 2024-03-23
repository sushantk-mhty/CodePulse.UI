import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { CategoryListComponent } from './features/category/components/category-list/category-list.component';
import { AddCategoryComponent } from './features/category/components/add-category/add-category.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { EditCategoryComponent } from './features/category/components/edit-category/edit-category.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { BlogpostListComponent } from './features/blog-post/components/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/blog-post/components/add-blogpost/add-blogpost.component';
import { MarkdownModule } from 'ngx-markdown';
import { EditBlogpostComponent } from './features/blog-post/components/edit-blogpost/edit-blogpost.component';
import { ImageSelectorComponent } from './shared/components/image-selector/image-selector.component';
import { HomeComponent } from './features/public/components/home/home.component';
import { BlogDetailsComponent } from './features/public/components/blog-details/blog-details.component';
import { LoginComponent } from './features/auth/components/login/login.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { CachingInterceptor } from './core/interceptors/caching.interceptor';
import { HttperrorInterceptor } from './core/interceptors/httperror.interceptor';
import { ScrollToTopDirective } from './shared/directives/scroll-to-top.directive';
import { UsingFormGroupComponent } from './core/components/using-form-group/using-form-group.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoryListComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    BlogpostListComponent,
    AddBlogpostComponent,
    EditBlogpostComponent,
    ImageSelectorComponent,
    HomeComponent,
    BlogDetailsComponent,
    LoginComponent,
    ScrollToTopDirective,
    UsingFormGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    NgxUiLoaderModule.forRoot({  
    "bgsColor": "red",
    "bgsOpacity": 0.5,
    "bgsPosition": "bottom-right",
    "bgsSize": 60,
    "bgsType": "ball-spin-clockwise",
    "blur": 5,
    "delay": 0,
    "fastFadeOut": true,
    "fgsColor": "#ffffff",
    "fgsPosition": "center-center",
    "fgsSize": 60,
    "fgsType": "three-strings",
    "gap": 24,
    "logoPosition": "center-center",
    "logoSize": 120,
    "logoUrl": "",
    "masterLoaderId": "master",
    "overlayBorderRadius": "0",
    "overlayColor": "rgba(40, 40, 40, 0.8)",
    "pbColor": "red",
    "pbDirection": "ltr",
    "pbThickness": 3,
    "hasProgressBar": false,
    "text": "Loading...",
    "textColor": "#FFFFFF",
    "textPosition": "center-center",
    "maxTime": -1,
    "minTime": 300
  }),
    NgxUiLoaderHttpModule.forRoot({ showForeground: true })
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:HttperrorInterceptor,
      multi:true
    },
    // {
    //   provide:HTTP_INTERCEPTORS,
    //   useClass:CachingInterceptor,
    //   multi:true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
