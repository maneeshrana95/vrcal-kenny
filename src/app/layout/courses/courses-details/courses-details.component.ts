import { Component, inject} from '@angular/core';
import { RouterModule,ActivatedRoute } from '@angular/router'; 
import { SafeUrlPipe } from '../../../pipes/safe-url.pipe'; // pipe ka import
import { Title, Meta } from '@angular/platform-browser'; 
import { WpService } from '../../../services/wp.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses-details',
  standalone: true,
  imports: [RouterModule, CommonModule, SafeUrlPipe],
  templateUrl: './courses-details.component.html',
  styleUrl: './courses-details.component.css' 
})
export class CoursesDetailsComponent {
  service: any = { acf: {} };
  private route = inject(ActivatedRoute);
  private wp = inject(WpService);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  loading = true;
  bannerHeading = '';
  courseImage = '';
  featuredImage = ''; 
  serviceLoaded = false;
  backgroundImage = ''; 
  mainImage ='';
  videoImage ='';
  secondcardVedioleftImage = '';
  secondcardleftImage = '';
  rdVedioleftImage = '';
  readyVedioleftImage= '';
  benefits: string[] = [];
  curriculum_list: string[] = [];
  videoUrl: string = ''; 
  introvideoUrl: string = ''; 
 faqQ: { question: string; answer: string; open?: boolean }[] = [];

  


  constructor( 
  ) {
    
  }

ngOnInit() {
  this.courseImage = '';
  this.backgroundImage = '';
  this.featuredImage = ''; 
  
  const slug = this.route.snapshot.paramMap.get('slug');
  
  if (slug) {
    this.wp.getServiceBySlug(slug).subscribe((res) => {
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

        // Background Image
        const backgroundImageId = this.service.acf?.background_img;
        if (backgroundImageId) {
          this.wp.getMediaById(backgroundImageId).subscribe((mediaRes) => {
            this.backgroundImage = mediaRes.source_url;
          });
        }
          // first section main Image
        const mainmageId = this.service.acf?.main_image;
        if (mainmageId) {
          this.wp.getMediaById(mainmageId).subscribe((mediaRes) => {
            this.mainImage = mediaRes.source_url;
          });
        }
        // first section video Image
           const videomageId = this.service.acf?.video_image;
        if (videomageId) {
          this.wp.getMediaById(videomageId).subscribe((mediaRes) => {
            this.videoImage = mediaRes.source_url;
          });
        }
        // second card Image
           const seconcardmageId = this.service.acf?.left_main_image;
        if (seconcardmageId) {
          this.wp.getMediaById(seconcardmageId).subscribe((mediaRes) => {
            this.secondcardleftImage = mediaRes.source_url;
          });
        }
         // second card video Image
           const seconcardVDmageId = this.service.acf?.left_video_image;
        if (seconcardVDmageId) {
          this.wp.getMediaById(seconcardVDmageId).subscribe((mediaRes) => {
            this.secondcardVedioleftImage = mediaRes.source_url;
          });
        }

         // ready card video Image
           const readycardVDmageId = this.service.acf?.ready_to_take_main_img;
        if (readycardVDmageId) {
          this.wp.getMediaById(readycardVDmageId).subscribe((mediaRes) => {
            this.rdVedioleftImage = mediaRes.source_url;
          });
        }
            const readyvdcardVDmageId = this.service.acf?.ready_to_take_second_img;
        if (readyvdcardVDmageId) {
          this.wp.getMediaById(readyvdcardVDmageId).subscribe((mediaRes) => {
            this.readyVedioleftImage = mediaRes.source_url;
          });
        }
      }
    if (this.service.acf?.benefits) {
      this.benefits = this.service.acf.benefits.map((b: any) => b.field_688c63539c27a);
    }
    if (this.service.acf?.curriculum_list) {
      this.curriculum_list = this.service.acf.curriculum_list.map((b: any) => b.field_688c676a1c3df);
      //console.log(this.service.acf.curriculum_list)
    }
  //  if (this.service.acf?.faq_repeater) { 
  //     this.faqQ = this.service.acf.faq_repeater.map((b: any) => b.field_688c954685cea);
  //     console.log(this.service.acf.faq_repeater)
  //   }
if (this.service.acf?.faq_repeater) {
    this.faqQ = this.service.acf.faq_repeater.map((b: any) => ({
      question: b.field_688c954685cea ?? '',
      answer: b.field_688c956b85ceb ?? '',
      open: false // start closed      
    })); 

  }


           // ✅ Yahan video field check karo
       // console.log('ACF Data:', this.service.acf);
        this.videoUrl = this.service.acf?.video_embed_url || '';
        this.introvideoUrl = this.service.acf?.video_iframe_url || '';


         this.loading = false;
    });
  }
   const scriptId = 'elfsight-script';
  if (!document.getElementById(scriptId)) {
    const script = document.createElement('script');
    script.id = scriptId;
    script.src = "https://elfsightcdn.com/platform.js";
    script.async = true;
    document.body.appendChild(script);
  }
}
toggleFaq(index: number) {
  this.faqQ[index].open = !this.faqQ[index].open;
}
 
}