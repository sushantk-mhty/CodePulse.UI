import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../../services/blog-post.service';
import { Observable } from 'rxjs';
import { IBlogPost } from '../../models/iblog-post.model';

@Component({
  selector: 'app-blogpost-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.scss']
})
export class BlogpostListComponent implements OnInit {
  blogPosts$?: Observable<IBlogPost[]>;

  constructor(private blogPostService: BlogPostService) { }

  ngOnInit(): void {
    //get All blog posts from API
    this.blogPosts$ = this.blogPostService.getAllBlogPosts();

  }

}
