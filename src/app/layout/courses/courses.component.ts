import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router'; 
import { WpService } from '../../services/wp.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [RouterModule, CommonModule ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  services: any = { acf: {} };
   //services: any[] = [];
   acfData: any;
   bannerHeading = ''; 
  videoImage= '';
   loading = true;
 isBrowser: boolean;  

constructor(private titleService: Title, private metaService: Meta, private wp: WpService,private route: ActivatedRoute, @Inject(PLATFORM_ID) private platformId: Object) {
  this.isBrowser = isPlatformBrowser(this.platformId);
    // this.titleService.setTitle('Begin Your Journey Course - Kenny Weiss');
    // this.metaService.updateTag({
    //   name: 'description',
    //   content: 'This journey to Emotional Authenticity is for those who have looked everywhere and are desperate for a solution. If that&#039;s you, you&#039;re ready. Best Emotional Authenticity coach.',
    // });
  }
 
 
  ngOnInit() { 
    this.wp.getServices().subscribe((data) => {
      this.services = data;
      console.log(data);
      this.bannerHeading = data[0]?.acf?.banner_heading || ''; 
     this.services = data.map((service: any) => {
      return {
        ...service,
        courseImage: service.acf?.course_image_url || '',
        featuredImage:
          service._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
      };
    });
        this.services.forEach((service: any) => {
        const videoImageId = service.acf?.video_image;
        if (videoImageId) {
          this.wp.getMediaById(videoImageId).subscribe((mediaRes: any) => {
            service.videoImage = mediaRes.source_url; // store in that service object
          });
        }
      });
      
    this.loading = false;
    });





    this.titleService.setTitle(' Online Courses to Strengthen Love, Boundaries & Self | Kenny Weiss');
    this.metaService.updateTag(
      {
        name: 'description',
        content: `Tired of repeating toxic cycles in love and life? Discover Kenny Weiss’s online courses to overcome narcissists, self-sabotage, and codependency.`,
      },
      "name='description'"
    );
 







  }
} 