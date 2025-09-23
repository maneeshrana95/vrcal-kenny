// src/app/services/wp.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../env/env';


@Injectable({
  providedIn: 'root',
})
export class WpService {
  private baseUrl = environment.baseUrl;
  private contactUrl = environment.contactBaseUrl;
  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get(`${this.baseUrl}/posts?_embed`);
  }
  getAllPosts(): Observable<any[]> {
    const maxPerPage = 100;

    // Pehle 100 posts lo
    return this.http.get<any[]>(
      `${this.baseUrl}/posts?_embed&per_page=${maxPerPage}`
    );
  }

  getPost(id: number) {
    return this.http.get(`${this.baseUrl}/posts/${id}?_embed`);
  }
  getpostSlug(slug: string): Observable<any> {
  return this.http.get<any[]>(`${this.baseUrl}/posts?slug=${slug}&_embed`);
}

 getServices(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/services?_embed`);
}
 gethealingServices(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/emotional_healing?_embed`);
}
gethealingServicesSlug(slug: string): Observable<any> {
  return this.http.get<any[]>(`${this.baseUrl}/emotional_healing?slug=${slug}&_embed`);
}
 getwdc(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/worst-day-cycle?_embed`);
}
getwdcSlug(slug: string): Observable<any> {
  return this.http.get<any[]>(`${this.baseUrl}/worst-day-cycle?slug=${slug}&_embed`);
}
 
getServiceBySlug(slug: string): Observable<any> {
  return this.http.get<any[]>(`${this.baseUrl}/services?slug=${slug}&_embed`);
}
getMediaById(id: number) { 
  return this.http.get<any>(`${this.baseUrl}/media/${id}`);
}



  /////////Contact
  sendForm(data: any) {
   const url = `${this.contactUrl}/contact-forms/573/feedback`;
  const body = new FormData();
  body.append('your-name', data.name);
  body.append('your-email', data.email);
  body.append('last-name', data.lastname);
  body.append('tel-572', data.phone); 
  body.append('your-message', data.message);
  // Required hidden fields
  body.append('_wpcf7', '573');
  body.append('_wpcf7_version', '6.1.1');
  body.append('_wpcf7_locale', 'en_US');
  body.append('_wpcf7_unit_tag', 'wpcf7-f573-p574-o1');
  body.append('_wpcf7_container_post', '574');
  body.append('_wpcf7_posted_data_hash', '');
  return this.http.post(url, body);
}
/////////pdf
/////////Contact
  sendFormRejected(data: any) {
   const url = `${this.contactUrl}/contact-forms/578/feedback`;
  const body = new FormData();
  body.append('your-name', data.name);
  body.append('your-email', data.email);
  // Required hidden fields
  body.append('_wpcf7', '578');
  body.append('_wpcf7_version', '6.1.1');
  body.append('_wpcf7_locale', 'en_US');
  body.append('_wpcf7_unit_tag', 'wpcf7-f578-p574-o2');
  body.append('_wpcf7_container_post', '574');
  body.append('_wpcf7_posted_data_hash', '');
  return this.http.post(url, body);
}
/////////pdf
/////////Codependence Questionnaire
  sendFormcodependencequestionnaire(data: any) {
   const url = `${this.contactUrl}/contact-forms/580/feedback`;
  const body = new FormData();
  body.append('your-name', data.name);
  body.append('your-email', data.email);
  // Required hidden fields
  body.append('_wpcf7', '580');
  body.append('_wpcf7_version', '6.1.1');
  body.append('_wpcf7_locale', 'en_US');
  body.append('_wpcf7_unit_tag', 'wpcf7-f578-p574-o3');
  body.append('_wpcf7_container_post', '574');
  body.append('_wpcf7_posted_data_hash', '');
  return this.http.post(url, body);
}

/////////pdf
/////////Boundaries
  sendFormboundaries (data: any) {
   const url = `${this.contactUrl}/contact-forms/582/feedback`;
  const body = new FormData();
  body.append('your-name', data.name);
  body.append('your-email', data.email);
  // Required hidden fields
  body.append('_wpcf7', '582');
  body.append('_wpcf7_version', '6.1.1');
  body.append('_wpcf7_locale', 'en_US');
  body.append('_wpcf7_unit_tag', 'wpcf7-f582-p574-o4');
  body.append('_wpcf7_container_post', '574');
  body.append('_wpcf7_posted_data_hash', '');
  return this.http.post(url, body);
}

/////////Conquer Confrontation
  sendFormConquerConfrontation(data: any) {
   const url = `${this.contactUrl}/contact-forms/584/feedback`;
  const body = new FormData();
  body.append('your-name', data.name);
  body.append('your-email', data.email);
  // Required hidden fields
  body.append('_wpcf7', '584');
  body.append('_wpcf7_version', '6.1.1');
  body.append('_wpcf7_locale', 'en_US');
  body.append('_wpcf7_unit_tag', 'wpcf7-f584-p574-o5');
  body.append('_wpcf7_container_post', '574');
  body.append('_wpcf7_posted_data_hash', '');
  return this.http.post(url, body);
}
  
/////////Codependence Giving
  sendFormCodependenceGiving(data: any) {
   const url = `${this.contactUrl}/contact-forms/586/feedback`;
  const body = new FormData();
  body.append('your-name', data.name);
  body.append('your-email', data.email);
  // Required hidden fields
  body.append('_wpcf7', '586');
  body.append('_wpcf7_version', '6.1.1');
  body.append('_wpcf7_locale', 'en_US');
  body.append('_wpcf7_unit_tag', 'wpcf7-f578-p574-o6');
  body.append('_wpcf7_container_post', '574');
  body.append('_wpcf7_posted_data_hash', '');
  return this.http.post(url, body);
}

/////////Feelings Wheel
  sendFormFeelingsWheel(data: any) {
   const url = `${this.contactUrl}/contact-forms/595/feedback`;
  const body = new FormData();
  body.append('your-name', data.name);
  body.append('your-email', data.email);
  // Required hidden fields
  body.append('_wpcf7', '595');
  body.append('_wpcf7_version', '6.1.1');
  body.append('_wpcf7_locale', 'en_US');
  body.append('_wpcf7_unit_tag', 'wpcf7-f578-p574-o7');
  body.append('_wpcf7_container_post', '574');
  body.append('_wpcf7_posted_data_hash', '');
  return this.http.post(url, body);
}


  sendFormFeelingsWheel2(data: any) {
   const url = `${this.contactUrl}/contact-forms/3216/feedback`;
  const body = new FormData();
  body.append('your-name', data.name);
  body.append('your-email', data.email);
  // Required hidden fields
  body.append('_wpcf7', '3216');
  body.append('_wpcf7_version', '6.1.1');
  body.append('_wpcf7_locale', 'en_US');
  body.append('_wpcf7_unit_tag', 'wpcf7-f3216-p574-o9');
  body.append('_wpcf7_container_post', '574');
  body.append('_wpcf7_posted_data_hash', '');
  return this.http.post(url, body);
}



  sendFormBookspage(data: any) {
   const url = `${this.contactUrl}/contact-forms/3220/feedback`;
  const body = new FormData();
  body.append('your-name', data.name);
  body.append('your-email', data.email);
  // Required hidden fields
  body.append('_wpcf7', '3220');
  body.append('_wpcf7_version', '6.1.1');
  body.append('_wpcf7_locale', 'en_US');
  body.append('_wpcf7_unit_tag', 'wpcf7-f3220-p574-o10');
  body.append('_wpcf7_container_post', '574');
  body.append('_wpcf7_posted_data_hash', '');
  return this.http.post(url, body);
}



}