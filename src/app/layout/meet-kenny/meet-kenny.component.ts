import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CourseSliderComponent } from "../../components/course-slider/course-slider/course-slider.component";

@Component({
  selector: 'app-meet-kenny',
  standalone: true,
  imports: [RouterModule, CommonModule, CourseSliderComponent],
  templateUrl: './meet-kenny.component.html',
  styleUrls: ['./meet-kenny.component.css']
})
export class MeetKennyComponent implements OnInit, OnDestroy {
  isExpanded = false;
  audios = [
  { url: 'https://samples.audible.com/bk/acx0/105161/bk_acx0_105161_sample.mp3', player: null as HTMLAudioElement | null, isPlaying: false },
    { url: 'https://samples.audible.com/bk/acx0/385990/bk_acx0_385990_sample.mp3', player: null as HTMLAudioElement | null, isPlaying: false }
  ];

  constructor(
    private titleService: Title,
    private metaService: Meta,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    console.log('MeetKennyComponent loaded!');
    this.titleService.setTitle('Meet Kenny Weiss | Coach for Relationship, Narcissistic Patterns & Self-Sabotage');
    this.metaService.updateTag(
      {
        name: 'description',
        content: `Struggling with childhood wounds, codependency, or self-sabotage? Meet Kenny Weiss, a coach who helps you break cycles and build emotional strength.`,
      },
      "name='description'"
    );

    // Browser-only code
    if (isPlatformBrowser(this.platformId)) {
      this.audios.forEach((a, i) => {
        a.player = new Audio();
        a.player.src = a.url;
        a.player.addEventListener('ended', () => {
          this.audios[i].isPlaying = false;
        });
      });
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.audios.forEach(a => {
        a.player?.pause();
        a.isPlaying = false;
        if (a.player) a.player.currentTime = 0;
      });
    }
  }

  toggleKannyContent() {
    this.isExpanded = !this.isExpanded;
  }

  toggleAudio(index: number) {
    if (!isPlatformBrowser(this.platformId)) return;

    // Pause all except the clicked one
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
}
