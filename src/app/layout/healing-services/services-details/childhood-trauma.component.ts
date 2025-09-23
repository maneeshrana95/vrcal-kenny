import { Component, inject } from '@angular/core';
import { RouterModule,ActivatedRoute } from '@angular/router';
import { EmotionalswiperComponent } from '../../../components/emotionalswiper/emotionalswiper.component'; 
import { Title, Meta } from '@angular/platform-browser'; 
import { WpService } from '../../../services/wp.service';
import { CommonModule } from '@angular/common'; 



@Component({
  selector: 'app-childhood-trauma',
  standalone: true,
  imports: [RouterModule, EmotionalswiperComponent,CommonModule],
  templateUrl: './childhood-trauma.component.html',
  styleUrl: './childhood-trauma.component.css'
})
export class ChildhoodTraumaComponent {

  private route = inject(ActivatedRoute);
  private wp = inject(WpService);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  choosePathData: any;
    loading = true;
  service: any = { acf: {} };
  bannerHeading = '';
  courseImage = '';
  featuredImage = ''; 
  cardImage1 = '';
  cardImage2 = '';
  cardImage3 = '';
  postcardImage1 = '';
  postcardImage2 = '';
  postcardicfImage = '';

    constructor( ) {
     
    }

ngOnInit() {
  this.courseImage = ''; 
  this.featuredImage = ''; 
  this.cardImage1 = '';
  this.cardImage2 = '';
  this.cardImage3 = '';
  this.postcardImage1 = '';
  this.postcardImage2 = '';
  this.postcardicfImage ='';
  const slug = this.route.snapshot.paramMap.get('slug');
  
  if (slug) {
    this.wp.gethealingServicesSlug(slug).subscribe((res) => {
      if (res.length > 0) {
        this.service = res[0];

         // ✅ Yoast SEO data
          const yoast = this.service.yoast_head_json;
          if (yoast) {
            this.titleService.setTitle(yoast.title || this.service.title.rendered);
            this.metaService.updateTag({
              name: 'description',
              content: yoast.description || this.service.excerpt.rendered
            });
            this.metaService.updateTag({
              property: 'og:image',
              content: yoast.og_image?.[0]?.url || ''
            });
          }

        // Banner Heading
        this.bannerHeading = this.service.acf?.banner_heading || ''; 

        // Featured image
        this.featuredImage = this.service._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

        // Course Image
        const courseImageId = this.service.acf?.course_image;
        if (courseImageId) {
          this.wp.getMediaById(courseImageId).subscribe((mediaRes) => {
            this.courseImage = mediaRes.source_url;
          });
        }
 
 
      const cardImage1Id = this.service.acf?.healing_service_card_one_image;
        if (cardImage1Id) {
          this.wp.getMediaById(cardImage1Id).subscribe((mediaRes) => {
            this.cardImage1 = mediaRes.source_url;
          });
        }


const cardImage2Id = this.service.acf?.healing_service_card_tow_image;
        if (cardImage2Id) {
          this.wp.getMediaById(cardImage2Id).subscribe((mediaRes) => {
            this.cardImage2 = mediaRes.source_url;
          });
        }


const cardImage3Id = this.service.acf?.healing_service_card_three_image;
        if (cardImage3Id) {
          this.wp.getMediaById(cardImage3Id).subscribe((mediaRes) => {
            this.cardImage3 = mediaRes.source_url;
          });
        }


const postcardImage1Id = this.service.acf?.post_card_one_image;
        if (postcardImage1Id) {
          this.wp.getMediaById(postcardImage1Id).subscribe((mediaRes) => {
            this.postcardImage1 = mediaRes.source_url;
          });
        }
    

      
const postcardImage2Id = this.service.acf?.post_card_tow_image;
        if (postcardImage2Id) {
          this.wp.getMediaById(postcardImage2Id).subscribe((mediaRes) => {
            this.postcardImage2 = mediaRes.source_url;
          });
        }


const postcardicfImageId = this.service.acf?.post_card_tow_ifc_image;
        if (postcardicfImageId) {
          this.wp.getMediaById(postcardicfImageId).subscribe((mediaRes) => {
            this.postcardicfImage = mediaRes.source_url;
          });
        }
    

      }
 this.loading = false;
    });
  }
  
}
}
