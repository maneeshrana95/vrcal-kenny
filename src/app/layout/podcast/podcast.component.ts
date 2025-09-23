import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-podcast',
  standalone: true,
  imports: [],
  templateUrl: './podcast.component.html',
  styleUrl: './podcast.component.css'
})

export class PodcastComponent {
  isBrowser:boolean
  constructor(private titleService: Title, private metaService: Meta, @Inject(PLATFORM_ID) private platformId: Object) {
    // this.titleService.setTitle('Podcast - Kenny Weiss');
    // this.metaService.updateTag({
    //   name: 'description',
    //   content: 'Heal The Hurt is a podcast where Kenny Weiss shares the knowledge to reclaim your authentic self through the process of Emotional Authenticity.',
    // });
    this.isBrowser = isPlatformBrowser(this.platformId);

  }

   ngOnInit() { 
    if (this.isBrowser) {
    this.titleService.setTitle(' Heal the Hurt Podcast | Emotional Authenticity with Kenny Weiss');
    this.metaService.updateTag(
      {
        name: 'description',
        content: ` Join Kenny Weiss on 'Heal the Hurt' to uncover tools for overcoming trauma, codependency, narcissistic abuse, and building emotional authenticity.`,
      },
      "name='description'"
    );
  }
 

  }


}
