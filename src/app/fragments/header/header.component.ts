import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../../services/autenticacion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$!: Observable<boolean>;
  role$!: Observable<string | null>;
  username$!: Observable<string | null>;

  headerClass: string = 'header-general solid';

  constructor(
    private authService: AutenticacionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.role$ = this.authService.role$;
    this.username$ = this.authService.username$;

    // Detectar cambios de ruta
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateHeaderClass(event.urlAfterRedirects);
      }
    });

    // Inicial
    this.updateHeaderClass(this.router.url);
  }

  logout(): void {
    this.authService.logout();
  }

  // Determina si la ruta es /home
  esHome(): boolean {
    const currentRoute = this.router.url.split('#')[0];
    return currentRoute === '/home';
  }

  // Actualiza la clase del header según la ruta y scroll
  private updateHeaderClass(url: string) {
    if (url.startsWith('/home')) {
      this.headerClass = 'header-general transparent';
    } else {
      this.headerClass = 'header-general solid';
    }
  }

scrollToFragment(event: Event, fragment: string): void {
  event.preventDefault(); // Evita reload

  // Buscar el elemento en la página actual
  const element = document.getElementById(fragment);

  if (element) {
    // Si existe, hacer scroll
    element.scrollIntoView({ behavior: 'smooth' });
  } else {
    // Si no existe, navegar a /home y luego hacer scroll
    this.router.navigate(['/home']).then(() => {
      setTimeout(() => {
        const target = document.getElementById(fragment);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
    });
  }
}


}
