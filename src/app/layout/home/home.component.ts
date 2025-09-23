import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  HostListener,
  ElementRef,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

import { EmotionalswiperComponent } from '../../components/emotionalswiper/emotionalswiper.component';
import { CourseSliderComponent } from '../../components/course-slider/course-slider/course-slider.component';
import { ExercisesWorkbookComponent } from '../../components/exercises-workbook/exercises-workbook.component';
import { RouterModule } from '@angular/router';
import { WpService } from '../../services/wp.service';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    EmotionalswiperComponent,
    CourseSliderComponent,
    RouterModule,
    CommonModule,
    SafeUrlPipe,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  isExpanded = false;
  posts: any[] = [];

  audios = [
    { url: 'https://samples.audible.com/bk/acx0/105161/bk_acx0_105161_sample.mp3', player: null as HTMLAudioElement | null, isPlaying: false },
    { url: 'https://samples.audible.com/bk/acx0/385990/bk_acx0_385990_sample.mp3', player: null as HTMLAudioElement | null, isPlaying: false }
  ];

  isLightboxOpen = false;
  videoUrl = 'https://www.youtube.com/embed/SKqP2K0R1z4';

  private steps: HTMLElement[] = [];

  constructor(
    private el: ElementRef,
    private titleService: Title,
    private metaService: Meta,
    private wp: WpService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    // ===== SSR Ready Meta & Title =====
    this.titleService.setTitle(
      'Trauma Recovery and Relationship Life Coach | Kenny Weiss'
    );
    this.metaService.updateTag({
      name: 'description',
      content:
        'Struggling with emotions or repeating relationship patterns? Kenny Weiss offers deep rooted help you heal emotional pain and create authentic love.',
    });

    if (isPlatformBrowser(this.platformId)) {
      // Initialize audios
      this.audios.forEach((a, i) => {
        a.player = new Audio();
        a.player.src = a.url;
        a.player.addEventListener('ended', () => (this.audios[i].isPlaying = false));
      });

      // Load external script dynamically
      const scriptId = 'elfsight-script';
      if (!document.getElementById(scriptId)) {
        const script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://elfsightcdn.com/platform.js';
        script.async = true;
        document.body.appendChild(script);
      }

      // Fetch WP posts dynamically
      this.wp.getPosts().subscribe((data: any) => {
        this.posts = data.map((post: any) => ({
          ...post,
          courseImage: post.acf?.postimage || '',
          featuredImage:
            post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
        }));
      });
    }
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.steps = Array.from(
        this.el.nativeElement.querySelectorAll('.step')
      );
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!isPlatformBrowser(this.platformId)) return;

    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const scrollMiddle = scrollTop + windowHeight / 2;

    this.steps.forEach((step) => {
      const rect = step.getBoundingClientRect();
      const offsetTop = rect.top + window.scrollY;
      const offsetBottom = offsetTop + rect.height;

      if (scrollMiddle >= offsetTop && scrollMiddle < offsetBottom) {
        this.steps.forEach((s) => s.classList.remove('active'));
        step.classList.add('active');
      }
    });
  }

  toggleKannyContent() {
    this.isExpanded = !this.isExpanded;
  }

  toggleAudio(index: number) {
    if (!isPlatformBrowser(this.platformId)) return;

    this.audios.forEach((a, i) => {
      if (i !== index && a.player) {
        a.player.pause();
        a.isPlaying = false;
        a.player.currentTime = 0;
      }
    });

    const audioItem = this.audios[index];
    if (!audioItem.player) return;

    if (audioItem.isPlaying) {
      audioItem.player.pause();
    } else {
      audioItem.player.play();
    }
    audioItem.isPlaying = !audioItem.isPlaying;
  }

  toggleContent(): void {
    this.isExpanded = !this.isExpanded;
  }

  openLightbox() {
    this.isLightboxOpen = true;
  }

  closeLightbox() {
    this.isLightboxOpen = false;
    const temp = this.videoUrl;
    this.videoUrl = '';
    setTimeout(() => (this.videoUrl = temp));
  }

  getShortContent(htmlContent: string, wordLimit: number = 30): string {
    if (!htmlContent) return '';
    const text = htmlContent.replace(/<[^>]+>/g, '');
    const words = text.split(/\s+/).slice(0, wordLimit);
    return (
      words.join(' ') + (words.length >= wordLimit ? '...' : '')
    );
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.audios.forEach((a) => {
        if (a.player) {
          a.player.pause();
          a.player.currentTime = 0;
        }
        a.isPlaying = false;
      });
    }
  }
}
