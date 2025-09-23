import { CommonModule, isPlatformBrowser, NgIf } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { WpService } from '../../services/wp.service';
@Component({
  selector: 'app-books',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule, NgIf ],
  templateUrl: './books.component.html',
  styleUrls : ['./books.component.css']
})
export class BooksComponent implements OnInit {
isBrowser: boolean;
formData = {
    name: '', 
    email: '', 
  };
formSubmitted = false; 
  formSuccessBooks = false;

constructor(private titleService: Title, private metaService: Meta, private wpService: WpService,  @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }




submitFormBooks() {
  this.formSubmitted = true;

  if (!this.formData.name || !this.formData.email) {
    return; // Required fields empty
  }

  this.wpService.sendFormBookspage(this.formData).subscribe({
    next: (res) => {
      console.log('✅ Success:', res);
      this.formSuccessBooks = true;

      // Reset form
      this.formData = { name: '', email: '' };
      this.formSubmitted = false;
 
    },
    error: (err) => {
      console.error('❌ Error:', err);
      alert('Failed to send message. Please try again.');
    }
  });
}



ngOnInit() {


if (this.isBrowser) {
      this.titleService.setTitle('Break Toxic Patterns & Reclaim Love | Kenny Weiss Books');
      this.metaService.updateTag(
        {
          name: 'description',
          content: ` Struggling with codependency, narcissistic patterns, or self-sabotage? Discover Kenny Weiss’s books to reclaim your voice, love, and emotional freedom.`,
        },
        "name='description'"
      );
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


}
