import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { IBlogPost } from 'src/app/features/blog-post/models/iblog-post.model';
import { BlogPostService } from 'src/app/features/blog-post/services/blog-post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private blogPostService=inject(BlogPostService); 
  blogs$?:Observable<IBlogPost[]>;

  ngOnInit(): void {
    this.blogs$=this.blogPostService.getAllBlogPosts();
    
  } 
  
  ngOnDestroy(): void {
    
  }

}
