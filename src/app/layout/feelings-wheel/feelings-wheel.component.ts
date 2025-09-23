import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { WpService } from '../../services/wp.service';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common'; // 👈 Import this
import { NgIf } from '@angular/common'; //
@Component({
  selector: 'app-feelings-wheel',
  standalone: true,
  imports: [RouterModule, FormsModule,CommonModule,NgIf ],
  templateUrl: './feelings-wheel.component.html',
  styleUrls: ['./feelings-wheel.component.css']
})
export class FeelingsWheelComponent {
[x: string]: any;
isBrowser:boolean
formData = {
    name: '', 
    email: '', 
  };
formSubmitted = false; 
  formSuccessFeelingsWheel2 = false;

  constructor(private titleService: Title, private metaService: Meta, private wpService: WpService, @Inject(PLATFORM_ID) private platformId: Object) {
    // this.titleService.setTitle('Feelings Wheel - Kenny Weiss');
    // this.metaService.updateTag({
    //   name: 'description',
    //   content: 'The Feelings Wheel will help you identify how you are feeling so you can recognize how the unhealed pain from the past is being relived...',
    // });

    this.isBrowser = isPlatformBrowser(this.platformId);
  }




submitFormFeelingsWheel2() {
  this.formSubmitted = true;

  if (!this.formData.name || !this.formData.email) {
    return; // Required fields empty
  }

  this.wpService.sendFormFeelingsWheel2(this.formData).subscribe({
    next: (res) => {
      console.log('✅ Success:', res);
      this.formSuccessFeelingsWheel2 = true;

      // Reset form
      this.formData = { name: '', email: '' };
      this.formSubmitted = false;

      // PDF open
      window.open('/images/pdf/Feelings-Wheel-Download-kenny-weiss.pdf', '_self');
    },
    error: (err) => {
      console.error('❌ Error:', err);
      alert('Failed to send message. Please try again.');
    }
  });
}


 ngOnInit() { 
    if (this.isBrowser) {
    this.titleService.setTitle('Feelings Wheel: Identify & Understand Your Emotions | Kenny Weiss');
    this.metaService.updateTag(
      {
        name: 'description',
        content: `Explore Feelings Wheel to pinpoint your emotions, enhance emotional awareness, and foster personal growth and healing.`,
      },
      "name='description'"
    );
  }
}


}
