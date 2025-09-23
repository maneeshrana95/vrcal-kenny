// src/app/posts/posts.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WpService } from '../../services/wp.service';
import { RouterModule } from '@angular/router'; //
import { Title, Meta } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination'; 

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterModule, NgxPaginationModule ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit{
  posts: any[] = []; 
   acfData: any;
   bannerHeading = ''; 
    loading = true;
  

  page = 1;       // current page
  itemsPerPage = 10; // har page me 10 post


  constructor(
    private wp: WpService,
    private titleService: Title,
    private metaService: Meta
  ) {
    this.titleService.setTitle('Best Day Blog - Kenny Weiss');
    this.metaService.updateTag({
      name: 'description',
      content: 'Kenny Weiss&#039;s best day blog is packed with useful information to help you move out of the Worst Day Cycle and into better days ahead.',
    });
  }

  ngOnInit() {
    this.wp.getAllPosts().subscribe((data: any) => {
      this.posts = data; 
       this.posts = data.map((post: any) => {
      return {
        ...post,
        courseImage: post.acf?.postimage || '',
        featuredImage:
          post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
      };
    });
      this.loading = false; 
    });

 
   
  }
  
}
