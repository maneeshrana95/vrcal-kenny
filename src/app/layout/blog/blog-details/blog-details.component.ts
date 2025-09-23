// src/app/layout/blog-details/blog-details.component.ts
import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router'; 
import { RouterModule } from '@angular/router';
import { WpService } from '../../../services/wp.service';
import { Title, Meta } from '@angular/platform-browser';
import { CourseSliderComponent } from '../../../components/course-slider/course-slider/course-slider.component';
import { EmbedYoutubePipe } from '../../../pipes/embed-youtube.pipe';
import { SafeUrlPipe } from '../../../pipes/safe-url.pipe'; // pipe ka import

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule, RouterModule,SafeUrlPipe, CourseSliderComponent, EmbedYoutubePipe],
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent {
post: any; 
  private route = inject(ActivatedRoute);
  private wp = inject(WpService);
  private titleService = inject(Title);
  private metaService = inject(Meta);

 

  loading = true;
  courseImage = '';
  featuredImage = '';

  constructor() {}

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');

    if (slug) {
      this.wp.getpostSlug(slug).subscribe((res) => {
        if (res.length > 0) {
          this.post = res[0];
 
            // ✅ Yoast SEO data
          const yoast = this.post.yoast_head_json;
          if (yoast) {
            this.titleService.setTitle(yoast.title || this.post.title.rendered);
            this.metaService.updateTag({
              name: 'description',
              content: yoast.description || this.post.excerpt.rendered
            });
            this.metaService.updateTag({
              property: 'og:image',
              content: yoast.og_image?.[0]?.url || ''
            });
            console.log('Yoast JSON:', this.post.yoast_head_json);

          }

          this.courseImage = this.post.acf?.postimage || '';

          this.featuredImage =
            this.post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
        }

        this.loading = false;
      });
    }

  }
}
