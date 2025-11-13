// src/app/services/autenticacion.service.ts
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user/user.model';
import { CartService } from './cart.service';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoggedUser {
  id: number;
  username: string;
  role: string;
  token?: string; // 👈 Añadido para manejar el token JWT
}

@Injectable({ providedIn: 'root' })
export class AutenticacionService {
  private apiUrl = 'http://localhost:8080/api/users/login';

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  private roleSubject = new BehaviorSubject<string | null>(null);
  private usernameSubject = new BehaviorSubject<string | null>(null);
  private usuarioActualSubject = new BehaviorSubject<User | null>(this.getUsuarioActual());

  usuario$ = this.usuarioActualSubject.asObservable();
  isLoggedIn$ = this.loggedInSubject.asObservable();
  role$ = this.roleSubject.asObservable();
  username$ = this.usernameSubject.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient,
    private injector: Injector
  ) {
    this.restoreSession();
  }

  // ============================
  // LOGIN
  // ============================
  login(credentials: LoginRequest): Observable<LoggedUser> {
    return this.http.post<LoggedUser>(this.apiUrl, credentials).pipe(
      tap(user => {
        // 🟢 Guardar token y sesión
        if (user.token) {
          localStorage.setItem('token', user.token); // <--- NUEVO
        }

        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('id', user.id.toString());
        localStorage.setItem('userId', user.id.toString());
        localStorage.setItem('role', user.role);
        localStorage.setItem('username', user.username);
        localStorage.setItem('user', JSON.stringify(user));

        // Emitir estado
        this.loggedInSubject.next(true);
        this.roleSubject.next(user.role);
        this.usernameSubject.next(user.username);
        this.usuarioActualSubject.next(user as User);

        // Sincronizar carrito
        setTimeout(() => {
          const cart = this.injector.get(CartService);
          cart.syncWithUser(true);
        }, 0);

        // Redirección por rol
        const role = user.role?.toUpperCase();
        if (role === 'ADMIN') {
          this.router.navigate(['/dashboard']);
        } else if (role === 'DOMICILIARIO') {
          this.router.navigate(['/pedidos-asignados']);
        } else if (role === 'OPERADOR') {
          this.router.navigate(['/operador/portal']);
        } else {
          this.router.navigate(['/home']);
        }
      })
    );
  }

  // ============================
  // LOGOUT
  // ============================
  logout(): void {
    const authKeys = ['token', 'loggedIn', 'id', 'userId', 'role', 'username', 'user'];
    authKeys.forEach(k => localStorage.removeItem(k));

    setTimeout(() => {
      const cart = this.injector.get(CartService);
      cart.syncAsGuest();
    }, 0);

    this.loggedInSubject.next(false);
    this.roleSubject.next(null);
    this.usernameSubject.next(null);
    this.usuarioActualSubject.next(null);

    this.router.navigate(['/login']);
  }

  // ============================
  // Utilidades
  // ============================
  get currentUser(): User | null {
    return this.usuarioActualSubject.value;
  }

  getUsuarioActual(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  setUsuario(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('username', user.username ?? '');
    this.usuarioActualSubject.next(user);
    this.usernameSubject.next(user.username ?? '');
  }

  // ============================
  // Restaurar sesión
  // ============================
  private restoreSession(): void {
    if (localStorage.getItem('loggedIn') === 'true') {
      const role = localStorage.getItem('role');
      const username = localStorage.getItem('username');
      const user = this.getUsuarioActual();

      this.loggedInSubject.next(true);
      this.roleSubject.next(role);
      this.usernameSubject.next(username);
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

  getUserId(): number | null {
    const id = localStorage.getItem('userId') || localStorage.getItem('id');
    return id ? Number(id) : null;
  }
}
