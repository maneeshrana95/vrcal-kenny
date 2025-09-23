import { Component, OnInit, AfterViewInit, PLATFORM_ID, Inject, ViewChild, ElementRef } from '@angular/core';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
import { CommonModule, isPlatformBrowser } from '@angular/common'; 
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router'; 
import { WpService } from '../../services/wp.service'; 
 

@Component({
   selector: 'app-emotionalswiper',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './emotionalswiper.component.html',
  styleUrls: ['./emotionalswiper.component.css'] 
})
export class EmotionalswiperComponent implements OnInit {
    @ViewChild('emotionalSwiper', { static: false }) swiperRef!: ElementRef;

     healservices: any[] = [];
    acfData: any;
    bannerHeading = ''; 

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private titleService: Title, 
    private metaService: Meta, 
    private wp: WpService,
    private route: ActivatedRoute
) {
 
}

 ngOnInit() {
  
    this.wp.gethealingServices().subscribe((data) => {
      this.healservices = data.map((service: any) => {
        return {
          ...service,
          courseImage: service.acf?.course_image_url || '',
          featuredImage: service._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
        };
      });
      const slugOrder = ['childhood-trauma', 'relationship-issues-coach', 'narcissistic-abuse', 'depression', 'parenting-issues'];
this.healservices = this.healservices.sort((a, b) => {
  const indexA = slugOrder.indexOf(a.slug);
  const indexB = slugOrder.indexOf(b.slug);
  return (indexA === -1 ? 999 : indexA) - (indexB === -1 ? 999 : indexB);
});

    if (isPlatformBrowser(this.platformId)) {
        setTimeout(() => {
          new Swiper('.emotional-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
            },
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            breakpoints: {
              991: { slidesPerView: 3 },
              767: { slidesPerView: 2 },
              480: { slidesPerView: 1 }
            }
          });
        }, 0);
      }
    });
  }
}
 

