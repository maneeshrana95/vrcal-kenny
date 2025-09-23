import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule ,ActivatedRoute } from '@angular/router';
import { WpService } from '../../../services/wp.service';
import { Title, Meta,DomSanitizer, SafeHtml } from '@angular/platform-browser'; 
import { CourseSliderComponent } from '../../../components/course-slider/course-slider/course-slider.component';

@Component({
  selector: 'app-wdc-details',
  standalone: true,
  imports: [CommonModule, RouterModule, CourseSliderComponent],
  templateUrl: './wdc-details.component.html',
  styleUrls: ['./wdc-details.component.css']
})
export class WdcDetailsComponent {
  private route = inject(ActivatedRoute);
  private wp = inject(WpService);
  private titleService = inject(Title);
  private metaService = inject(Meta);

@Input() posting: any;
  loading = true; 
  wdcpost: any = { acf: {} };
  courseImage = '';
  featuredImage = '';
safeContent!: SafeHtml;  
  constructor( private sanitizer: DomSanitizer ) {   }
  ngOnInit() {
  this.courseImage = ''; 
  this.featuredImage = ''; 
  
const slug = this.route.snapshot.paramMap.get('slug');
console.log('Slug:', slug);  // ✅ add this

  
  if (slug) {
    this.wp.getwdcSlug(slug).subscribe((res: any) => {
      if (res.length > 0) {
        this.wdcpost = res[0];
     // ✅ Yoast SEO data
          const yoast = this.wdcpost.yoast_head_json;
          if (yoast) {
            this.titleService.setTitle(yoast.title || this.wdcpost.title.rendered);
            this.metaService.updateTag({
              name: 'description',
              content: yoast.description || this.wdcpost.excerpt.rendered
            });
            this.metaService.updateTag({
              property: 'og:image',
              content: yoast.og_image?.[0]?.url || ''
            });
          }


        let content = this.wdcpost.content.rendered;


content = content.replace(
            /(https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+))/g,
            `<iframe width="560" height="315" 
                src="https://www.youtube.com/embed/$2" 
                frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
             </iframe>`
          );

          // ✅ Step 3: sanitize
          this.safeContent = this.sanitizer.bypassSecurityTrustHtml(content);


        // Featured image
        this.featuredImage = this.wdcpost._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

        // Course Image
        const courseImageId = this.wdcpost.acf?.course_image;
        if (courseImageId) {
          this.wp.getMediaById(courseImageId).subscribe((mediaRes) => {
            this.courseImage = mediaRes.source_url;
          });
        }
        console.log('WDC POST:', this.wdcpost);

      }
    console.log('WDC POST:ddd', this.wdcpost);

         this.loading = false;
    });
  }
  
}
}
