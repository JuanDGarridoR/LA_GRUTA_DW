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
  // 🔐 Observables de autenticación
  isLoggedIn$!: Observable<boolean>;
  role$!: Observable<string | null>;
  username$!: Observable<string | null>;

  // 🔸 Valores locales (para mostrar inmediatamente)
  role: string | null = null;
  username: string | null = null;

  headerClass: string = 'header-general solid';
  isScrolled = false;

  // 🔔 Variables para carrito y animaciones
  pulseCart = false;
  showMiniToast = false;
  lastAdded?: { nombre: string; precio: number; image?: string; cantidad: number };
  private toastTimer?: any;
  private pulseTimer?: any;

  // 🔄 Subscripciones
  private subs: Subscription[] = [];

  constructor(
    private authService: AutenticacionService,
    private router: Router,
    private cart: CartService
  ) {}

  ngOnInit(): void {
    // ✅ Inicializar observables de autenticación
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.role$ = this.authService.role$;
    this.username$ = this.authService.username$;

    // ✅ Suscribirse a los cambios globales (incluye nombre actualizado del perfil)
    this.subs.push(
      this.role$.subscribe(role => (this.role = role)),
      this.username$.subscribe(username => {
        this.username = username;
        console.log('🔁 Username actualizado en header:', username);
      }),
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.updateHeaderClass(event.urlAfterRedirects);
        }
      }),
      // 🔔 Animación del carrito
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

        clearTimeout(this.toastTimer);
        clearTimeout(this.pulseTimer);
        this.toastTimer = setTimeout(() => (this.showMiniToast = false), 2500);
        this.pulseTimer = setTimeout(() => (this.pulseCart = false), 1200);
      })
    );

    // ✅ Configuración inicial
    this.updateHeaderClass(this.router.url);
    this.onScroll();
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
    clearTimeout(this.toastTimer);
    clearTimeout(this.pulseTimer);
  }

  // ===== Scroll handler =====
  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 4;
  }

  // ==== Helpers de UI ====
  cartCount(): number {
    return this.cart.count();
  }

  logout(): void {
    this.authService.logout();
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
