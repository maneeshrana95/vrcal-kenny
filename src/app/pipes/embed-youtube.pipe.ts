import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'embedYoutube',
  standalone: true   // ✅ standalone pipe
})
export class EmbedYoutubePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(content: string): SafeHtml {
    if (!content) return '';

    // [embedyt] https://www.youtube.com/watch?v=xxxx [/embedyt] ko iframe me badalna
    const newContent = content.replace(
      /\[embedyt\]\s*(https?:\/\/www\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)).*?\[\/embedyt\]/g,
      `<iframe width="560" height="315"
         src="https://www.youtube.com/embed/$2"
         frameborder="0" allowfullscreen></iframe>`
    );

    return this.sanitizer.bypassSecurityTrustHtml(newContent);
  }
}
