import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/usuarios/user/user.model';
import { CartService } from './cart.service';

// === MODELOS QUE EL BACKEND USA ===
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  roles: string[]; // ej: ["CLIENTE"], ["DOMICILIARIO"], ["ADMIN"]
}

@Injectable({ providedIn: 'root' })
export class AutenticacionService {

  private apiUrl = 'http://localhost:8080/api/auth/login';

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  private rolesSubject = new BehaviorSubject<string[] | null>(null);
  private usernameSubject = new BehaviorSubject<string | null>(null);
  private usuarioActualSubject = new BehaviorSubject<User | null>(this.getUsuarioActual());

  usuario$ = this.usuarioActualSubject.asObservable();
  isLoggedIn$ = this.loggedInSubject.asObservable();
  roles$ = this.rolesSubject.asObservable();
  username$ = this.usernameSubject.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient,
    private injector: Injector
  ) {
    this.restoreSession();
  }

  // ============================
  // ✔ LOGIN NUEVO
  // ============================
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, credentials).pipe(
      tap((res) => {

        // Guardamos sesión
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userId', res.id.toString());
        localStorage.setItem('username', res.username);
        localStorage.setItem('roles', JSON.stringify(res.roles));

        // Emitimos cambios
        this.loggedInSubject.next(true);
        this.usernameSubject.next(res.username);
        this.rolesSubject.next(res.roles);

        // Guardamos user completo (puedes mejorarlo con más datos si quieres)
        const user: User = {
          id: res.id,
          username: res.username,
          roles: res.roles
        } as User;

        localStorage.setItem('user', JSON.stringify(user));
        this.usuarioActualSubject.next(user);

        // Sincronizar carrito
        setTimeout(() => {
          const cart = this.injector.get(CartService);
          cart.syncWithUser(true); // migrar carrito invitado
        }, 0);

        // Redirecciones según rol
        if (res.roles.includes('ADMIN')) {
          this.router.navigate(['/dashboard']);
        } else if (res.roles.includes('DOMICILIARIO')) {
          this.router.navigate(['/pedidos-asignados']);
        } else if (res.roles.includes('OPERADOR')) {
          this.router.navigate(['/operador/portal']);
        } else if (res.roles.includes('CLIENTE')) {
          this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/home']);
        }

      })
    );
  }

  // ============================
  // ✔ LOGOUT
  // ============================
  logout(): void {
    const authKeys = ['loggedIn', 'userId', 'username', 'roles', 'user'];
    authKeys.forEach(k => localStorage.removeItem(k));

    setTimeout(() => {
      const cart = this.injector.get(CartService);
      cart.syncAsGuest();
    }, 0);

    this.loggedInSubject.next(false);
    this.rolesSubject.next(null);
    this.usernameSubject.next(null);
    this.usuarioActualSubject.next(null);

    this.router.navigate(['/login']);
  }

  // ============================
  // ✔ Getters
  // ============================
  getUsuarioActual(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  getUserId(): number | null {
    const id = localStorage.getItem('userId');
    return id ? Number(id) : null;
  }

  // ============================
  // ✔ Restaurar sesión al recargar página
  // ============================
  private restoreSession(): void {
    if (localStorage.getItem('loggedIn') === 'true') {
      const username = localStorage.getItem('username');
      const rolesStr = localStorage.getItem('roles');
      const roles = rolesStr ? JSON.parse(rolesStr) : null;
      const user = this.getUsuarioActual();

      this.loggedInSubject.next(true);
      this.usernameSubject.next(username);
      this.rolesSubject.next(roles);
      this.usuarioActualSubject.next(user);

      setTimeout(() => {
        const cart = this.injector.get(CartService);
        cart.syncWithUser(false);
      }, 0);

    } else {
      setTimeout(() => {
        const cart = this.injector.get(CartService);
        cart.syncAsGuest();
      }, 0);
    }
  }
}
