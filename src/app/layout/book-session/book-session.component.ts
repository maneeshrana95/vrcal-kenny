import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
declare var Calendly: any;


@Component({
  selector: 'app-book-session',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './book-session.component.html',
  styleUrls: ['./book-session.component.css']   
})
export class BookSessionComponent  implements OnInit {
  isLoading = true;
  
  isBrowser:boolean;
      private iframeChecker: any;
  private maxWaitTimeout: any;
  constructor(private titleService: Title, private metaService: Meta,
@Inject(PLATFORM_ID) private platformId: Object

  ) {
     this.isBrowser = isPlatformBrowser(this.platformId);
    // this.titleService.setTitle('Book a Session');
    // this.metaService.updateTag({
    //   name: 'description',
    //   content: '',
    // });
  }

 ngOnInit(): void {
 
 

if (this.isBrowser) {
    this.titleService.setTitle('Book a Session with Kenny Weiss | Overcome Emotional Struggles & Toxic Patterns');
    this.metaService.updateTag(
      {
        name: 'description',
        content: ` Struggling with childhood wounds, toxic patterns, or narcissistic relationships? Book a session with Kenny Weiss to strengthen yourself and your relationships.`,
      },
      "name='description'"
    );
  }

  }
 


 ngAfterViewInit(): void {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => {
      // Force Calendly to load immediately
      Calendly.initInlineWidget({
        url: 'https://calendly.com/kennyweiss/single-session-350?hide_gdpr_banner=1',
        parentElement: document.querySelector('.calendly-inline-widget'),
        prefill: {},
        utm: {}
      });

      // Wait for iframe to load
      this.waitForIframe();
    };
    document.body.appendChild(script);
  }

  private waitForIframe() {
    const maxWait = setTimeout(() => {
      this.isLoading = false; // fallback after 10s
    }, 10000);

    const checkIframe = setInterval(() => {
      const iframe = document.querySelector<HTMLIFrameElement>('.calendly-inline-widget iframe');
      if (iframe) {
        iframe.addEventListener('load', () => {
          this.isLoading = false;
          clearTimeout(maxWait);
        });
        clearInterval(checkIframe);
      }
    }, 200);
  }
 
}
