import { Component, HostListener  } from '@angular/core';
import { RouterModule,  Router, NavigationEnd } from '@angular/router'; // 
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


isMenuOpen: boolean = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }




bgcolor = false;
isHomeOrBlog = false;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    this.bgcolor = scrollY > 50;
  }
  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects;
      this.isHomeOrBlog = 
      url === '/' ||
            url === '/courses/how-to-create-lasting-love-and-connection' ||
            url === '/courses/how-to-set-and-negotiate-healthy-boundaries' ||
            url === '/courses/how-to-break-free-from-toxic-relationship-patterns' ||
            url === '/courses/how-to-put-an-end-to-people-pleasing' ||
            url === '/courses/how-to-break-the-chains-of-fear-and-achieve-your-dreams' ||
            url === '/courses/how-to-look-yourself-in-the-mirror-and-love-it' ||
            url === '/courses/how-to-love-and-accept-your-perfect-imperfections';


      if (window.innerWidth <= 1200) {
      this.isMenuOpen = false;
    }
    }); 

  }



 


}
