import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router'; 
import { WpService } from '../../services/wp.service';
import { CommonModule } from '@angular/common';

 

@Component({
  selector: 'app-healing-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './healing-services.component.html',
  styleUrl: './healing-services.component.css'
})
export class HealingServicesComponent {
   healservices: any[] = [];
   acfData: any;
   bannerHeading = ''; 
  loading = true;
   constructor(private titleService: Title, private metaService: Meta, private wp: WpService,private route: ActivatedRoute) {
    this.titleService.setTitle('Begin Your Journey Course - Kenny Weiss');
    this.metaService.updateTag({
      name: 'description',
      content: 'This journey to Emotional Authenticity is for those who have looked everywhere and are desperate for a solution. If that&#039;s you, you&#039;re ready. Best Emotional Authenticity coach.',
    });
  }
 
  ngOnInit() {
    this.wp.gethealingServices().subscribe((data) => {
      this.healservices = data;
      console.log(data); 
     this.healservices = data.map((service: any) => {
      return {
        ...service,
        courseImage: service.acf?.course_image_url || '',
        featuredImage:
          service._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
      };
    });
     this.loading = false;
    });
  }
}
