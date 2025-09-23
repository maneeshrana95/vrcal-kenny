import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WpService } from '../../services/wp.service';
import { BlogDetailsComponent } from '../blog/blog-details/blog-details.component';
import { WdcDetailsComponent } from '../worst-day-cycle/wdc-details/wdc-details.component';

@Component({
  selector: 'app-slug-handler',
  standalone: true,
  imports: [BlogDetailsComponent,WdcDetailsComponent ],
  template: `
<app-blog-details *ngIf="type === 'blog' && data" [post]="data"></app-blog-details>
<app-wdc-details *ngIf="type === 'wdc' && data" [posting]="data"></app-wdc-details>

  `
})
export class SlugHandlerComponent {
  route = inject(ActivatedRoute);
  wp = inject(WpService);

  type: 'blog' | 'wdc' | null = null;
  data: any = null;

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (!slug) return;
 
    // 🔹 Pehle WDC slug check karo
    this.wp.getwdcSlug(slug).subscribe(res => {
      if (res.length) {
        this.type = 'wdc';
        this.data = res[0]; 
      } else {
        // 🔹 Agar WDC nahi mila to blog check karo
        this.wp.getpostSlug(slug).subscribe(blogRes => {
          if (blogRes.length) {
            this.type = 'blog';
            this.data = blogRes[0];
          }
        });
      }
    });
  }
}
