import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [FormsModule, CommonModule ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  email = '';
  message = '';
  messageType: 'success' | 'error' | '' = '';

  constructor(private http: HttpClient) {}

  submitSubscribe() {
    if (!this.email || !this.validateEmail(this.email)) {
      this.message = 'Please enter a valid email address.';
      this.messageType = 'error';
      return;
    }

    const url = 'https://kennyweiss.net/cms/wp-json/contact-form-7/v1/contact-forms/607/feedback';

    const body = new FormData();
    body.append('your-email', this.email);
    body.append('_wpcf7', '607');
    body.append('_wpcf7_version', '6.1.1');
    body.append('_wpcf7_locale', 'en_US');
    body.append('_wpcf7_unit_tag', 'wpcf7-f607-p574-o8');
    body.append('_wpcf7_container_post', '123');

    this.http.post(url, body).subscribe({
      next: (res: any) => {
        if (res.status === 'mail_sent') {
          this.message = ' Subscribed successfully!';
          this.messageType = 'success';
          this.email = '';

          // Clear after 3 seconds
          setTimeout(() => {
            this.message = '';
            this.messageType = '';
          }, 3000);
        } else {
          this.message = res.message || '⚠️ Something went wrong.';
          this.messageType = 'error';
        }
      },
      error: () => {
        this.message = '❌ Failed to subscribe.';
        this.messageType = 'error';
      }
    });
  }

  private validateEmail(email: string): boolean {
     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
}



