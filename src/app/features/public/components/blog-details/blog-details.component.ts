
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IBlogPost } from 'src/app/features/blog-post/models/iblog-post.model';
import { BlogPostService } from 'src/app/features/blog-post/services/blog-post.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  url: string | null = null;
  blogPost$?: Observable<IBlogPost>;
  private blogPostService = inject(BlogPostService);
  private route = inject(ActivatedRoute);
  ngOnInit(): void {
    this.route.paramMap
      .subscribe({
        next: (params) => {
          this.url = params.get('url');
        }
      });
    // Fetch blog details by url
    if (this.url) {
      this.blogPost$ = this.blogPostService.getBlogPostByUrlHandle(this.url);
    }
  }
}