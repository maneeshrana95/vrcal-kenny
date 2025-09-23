import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { WpService } from '../../services/wp.service';  


@Component({
  selector: 'app-worst-day-cycle',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './worst-day-cycle.component.html',
  styleUrls: ['./worst-day-cycle.component.css']   
})
export class WorstDayCycleComponent {

  isBrowser:boolean
    wdcposts: any[] = []; 
   acfData: any;
   bannerHeading = '';  
    loading = true;
  constructor(private titleService: Title, private metaService: Meta, private wp: WpService, @Inject(PLATFORM_ID) private platformId: Object) {
    // this.titleService.setTitle('Worst Day Cycle | Life Coach | Personal Development Coach');
    // this.metaService.updateTag({
    //   name: 'description',
    //   content: 'Absorbing childhood trauma leads to self-destructive behavior. Learn about breaking The Worst Day Cycle. Hire a personal development coach...',
    // });

this.isBrowser = isPlatformBrowser(this.platformId);

  }
  getShortContent(htmlContent: string, wordLimit: number = 30): string {
  if (!htmlContent) return '';

  // HTML tags hatao
  const text = htmlContent.replace(/<[^>]+>/g, '');

  // Words me split karke limit lagao
  const words = text.split(/\s+/).slice(0, wordLimit);

  return words.join(' ') + (words.length >= wordLimit ? '...' : '');
}
  ngOnInit() {
    this.wp.getwdc().subscribe((data) => {
      this.wdcposts = data;
      console.log(data);
      this.bannerHeading = data[0]?.acf?.banner_heading || ''; 
     this.wdcposts = data.map((wdcpost: any) => {
      return {
        ...wdcpost,
        courseImage: wdcpost.acf?.course_image_url || '',
        featuredImage:
          wdcpost._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
      };
    });
        this.wdcposts.forEach((service: any) => {
        const videoImageId = service.acf?.video_image;
        if (videoImageId) {
          this.wp.getMediaById(videoImageId).subscribe((mediaRes: any) => {
            service.videoImage = mediaRes.source_url; // store in that service object
          });
        }
      });
      
    this.loading = false;
    });
  


 if (this.isBrowser) {
    this.titleService.setTitle('Worst Day Cycle: Break Free from Self-Sabotage | Kenny Weiss');
    this.metaService.updateTag(
      {
        name: 'description',
        content: ` Discover Kenny Weiss's Worst Day Cycle—a 4-stage pattern of trauma, fear, shame, and denial—and learn how to heal and reclaim your authentic self.`,
      },
      "name='description'"
    );
  }


  }



}
