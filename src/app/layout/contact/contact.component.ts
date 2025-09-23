import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { WpService } from '../../services/wp.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common'; // 👈 Import this
import { NgIf } from '@angular/common'; // 👈 Optional if you prefer individual directive

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule,CommonModule, NgIf],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  formData = {
    name: '',
    lastname: '',
    email: '',
    phone: '',
    message: ''
  };
formSuccess = false;
formSubmitted = false;
isBrowser:boolean
  constructor(
    private titleService: Title,
    private metaService: Meta,
    private wpService: WpService,
     @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // this.titleService.setTitle('Contact Kenny Weiss - Kenny Weiss');
    // this.metaService.updateTag({
    //   name: 'description',
    //   content: 'Face your pain and break free from self-destructive behaviors with a video response from Kenny, directed to you privately.',
    // });
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

 submitForm(contactForm: any) {
    this.formSubmitted = true;

    // Prevent form submission if invalid
    if (contactForm.invalid) {
        console.log('⚠️ Form is invalid');
        return;
    }

    this.wpService.sendForm(this.formData).subscribe({
        next: (res) => {
            console.log('✅ Success:', res);
            this.formSuccess = true;

            // Reset form
            this.formData = {
                name: '',
                lastname: '',
                email: '',
                phone: '',
                message: ''
            };
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
    this.titleService.setTitle('Contact Kenny Weiss | Begin Your Healing Journey Today');
    this.metaService.updateTag(
      {
        name: 'description',
        content: ` Reach out to Kenny Weiss to start healing from emotional wounds, codependency, and toxic patterns. Schedule a session or subscribe to our newsletter for weekly insights.`,
      },
      "name='description'"
    );
  }


 }






}
