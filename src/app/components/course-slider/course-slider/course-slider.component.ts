 
import { Component, AfterViewInit, Inject, PLATFORM_ID,OnInit  } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';  
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router'; 
import { WpService } from '../../../services/wp.service'; 


@Component({
  selector: 'app-course-slider',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-slider.component.html',
  styleUrl: './course-slider.component.css'
})
export class CourseSliderComponent implements AfterViewInit {
    services: any[] = [];
   acfData: any;
   bannerHeading = ''; 
constructor(@Inject(PLATFORM_ID) private platformId: Object, private titleService: Title, private metaService: Meta, private wp: WpService,private route: ActivatedRoute) {

  }

getShortText(text: string, wordLimit: number): string {
  if (!text) return '';
  const plainText = text.replace(/<[^>]+>/g, ''); // HTML remove
  const words = plainText.split(/\s+/);
  return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : plainText;
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
    });
  }
    ngAfterViewInit(): void {
     if (isPlatformBrowser(this.platformId)) {
    setTimeout(() => {
      new Swiper('.mySwiper', {
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
          768: {
            slidesPerView: 2
          },
          1024: {
            slidesPerView: 3
          }
        }
      });
    });
  }
}
}
