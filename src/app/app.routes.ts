import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'best-day-blog',
    loadComponent: () =>
      import('./layout/blog/blog.component').then((m) => m.BlogComponent),
  },

   {
  path: 'about-kenny-weiss',
  loadComponent: () =>
    import('./layout/meet-kenny/meet-kenny.component').then(m => m.MeetKennyComponent)
}
,

   {
  path: 'books-by-kenny-weiss',
  loadComponent: () =>
    import('./layout/books/books.component').then(m => m.BooksComponent)
},


 {
  path: 'courses',
  loadComponent: () =>
    import('./layout/courses/courses.component').then(m => m.CoursesComponent)
},

 {
  path: 'resources',
  loadComponent: () =>
    import('./layout/resources/resources.component').then(m => m.ResourcesComponent)
},

 {
  path: 'podcast',
  loadComponent: () =>
    import('./layout/podcast/podcast.component').then(m => m.PodcastComponent)
},

{
  path: 'feelings-wheel',
  loadComponent: () =>
    import('./layout/feelings-wheel/feelings-wheel.component').then(m => m.FeelingsWheelComponent)
},

{
  path: 'worst-day-cycle',
  loadComponent: () =>
    import('./layout/worst-day-cycle/worst-day-cycle.component').then(m => m.WorstDayCycleComponent)
}
,
{
  path: 'thank-you',
  loadComponent: () =>
    import('./layout/thank-you/thank-you.component').then(m => m.ThankYouComponent)
}
,



{
  path: 'contact',
  loadComponent: () =>
    import('./layout/contact/contact.component').then(m => m.ContactComponent)
},

{
  path: 'book-a-session-with-kenny-weiss',
  loadComponent: () =>
    import('./layout/book-session/book-session.component').then(m => m.BookSessionComponent)
},

 {
  path: 'coaching/:slug',
  loadComponent: () =>
    import('./layout/healing-services/services-details/childhood-trauma.component').then(m => m.ChildhoodTraumaComponent)
},
{
  path: 'courses/:slug',
  loadComponent: () =>
    import('./layout/courses/courses-details/courses-details.component').then(m => m.CoursesDetailsComponent)
} 
,
{
  path: 'healing-services',
  loadComponent: () =>
    import('./layout/healing-services/healing-services.component').then(m => m.HealingServicesComponent)
} 
,
{
  path: 'worst-day-cycle/:slug',
  loadComponent: () =>
    import('./layout/worst-day-cycle/wdc-details/wdc-details.component').then(m => m.WdcDetailsComponent)
} ,
{
  path: ':slug',
  loadComponent: () =>
    import('./layout/blog/blog-details/blog-details.component').then(m => m.BlogDetailsComponent)
} ,
{
  path: '**',
  loadComponent: () =>
    import('./layout/not-found/not-found.component').then(m => m.NotFoundComponent)
} ,
 
 
];
