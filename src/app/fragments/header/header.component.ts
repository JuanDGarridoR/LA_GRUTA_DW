import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AutenticacionService } from '../../services/autenticacion.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Observables de autenticación
  isLoggedIn$!: Observable<boolean>;
  role$!: Observable<string | null>;
  username$!: Observable<string | null>;

  // Valores locales (para no usar | async en el HTML)
  isLoggedIn = false;
  role: string | null = null;
  username: string | null = null;

  headerClass: string = 'header-general solid';
  isScrolled = false;

  // Variables de carrito y animaciones
  pulseCart = false;
  showMiniToast = false;
  lastAdded: { nombre: string; precio: number; image?: string; cantidad: number } | null = null;

  // timers (usar number para browser)
  private toastTimer?: number;
  private pulseTimer?: number;

  private subs: Subscription[] = [];

  // contador derivado del carrito
  itemsCount = 0;

  constructor(
    private authService: AutenticacionService,
    private router: Router,
    private cart: CartService
  ) {}

  ngOnInit(): void {
    // Inicializar observables de autenticación
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.role$ = this.authService.role$;
    this.username$ = this.authService.username$;

    // Suscripciones a auth -> valores locales
    this.subs.push(
      this.isLoggedIn$.subscribe(v => (this.isLoggedIn = v)),
      this.role$.subscribe(role => (this.role = role)),
      this.username$.subscribe(username => (this.username = username))
    );

    // Suscribirse a cambios del carrito para mantener contador reactivo
    this.subs.push(
      this.cart.items$.subscribe(items => {
        this.itemsCount = (items ?? []).reduce((s, it) => s + (it.cantidad ?? 0), 0);
      })
    );

    // Escuchar navegación para actualizar clases del header
    this.subs.push(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.updateHeaderClass(event.urlAfterRedirects);
        }
      })
    );

    // Animación del carrito (mini-toast y pulso)
    this.subs.push(
      this.cart.lastAdded$?.subscribe(item => {
        if (!item) return;
        this.lastAdded = {
          nombre: item.nombre,
          precio: item.precio,
          image: item.image,
          cantidad: item.cantidad
        };
        this.showMiniToast = true;
        this.pulseCart = true;

        if (this.toastTimer) window.clearTimeout(this.toastTimer);
        if (this.pulseTimer) window.clearTimeout(this.pulseTimer);

        this.toastTimer = window.setTimeout(() => (this.showMiniToast = false), 2500);
        this.pulseTimer = window.setTimeout(() => (this.pulseCart = false), 1200);
      })
    );

    // Configuración inicial
    this.updateHeaderClass(this.router.url);
    this.onScroll();
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
    if (this.toastTimer) window.clearTimeout(this.toastTimer);
    if (this.pulseTimer) window.clearTimeout(this.pulseTimer);
  }

  // ===== Scroll handler =====
  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 4;
  }

  // ===== Helpers de UI =====
  cartCount(): number {
    return this.itemsCount;
  }

  logout(): void {
    this.authService.logout();
    // Por si el logout no navegara:
    this.router.navigate(['/login']);
  }

  esHome(): boolean {
    const currentRoute = this.router.url.split('#')[0];
    return currentRoute === '/home';
  }

  isMenu(): boolean {
    const current = this.router.url.split('?')[0];
    return current.startsWith('/menu');
  }

  private updateHeaderClass(url: string) {
    this.headerClass = url.startsWith('/home')
      ? 'header-general transparent'
      : 'header-general solid';
  }

  scrollToFragment(event: Event, fragment: string): void {
    event.preventDefault();
    const element = document.getElementById(fragment);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      this.router.navigate(['/home']).then(() => {
        setTimeout(() => {
          document.getElementById(fragment)?.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      });
    }
  }
}
