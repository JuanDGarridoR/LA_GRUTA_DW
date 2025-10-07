import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoggedUser {
  id: number;
  username: string;
  role: string;
}

@Injectable({ providedIn: 'root' })
export class AutenticacionService {
  private apiUrl = 'http://localhost:8080/api/users/login';

  // Subjects que emiten cambios globales
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  private roleSubject = new BehaviorSubject<string | null>(null);
  private usernameSubject = new BehaviorSubject<string | null>(null);

  // Observables para suscribirse desde componentes
  isLoggedIn$ = this.loggedInSubject.asObservable();
  role$ = this.roleSubject.asObservable();
  username$ = this.usernameSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) {
    this.restoreSession();
  }

  // 🟢 LOGIN
  login(credentials: LoginRequest): Observable<LoggedUser> {
    return this.http.post<LoggedUser>(this.apiUrl, credentials).pipe(
      tap(user => {
        // guardar datos en localStorage
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('role', user.role);
        localStorage.setItem('username', user.username);

        // emitir cambios globales
        this.loggedInSubject.next(true);
        this.roleSubject.next(user.role);
        this.usernameSubject.next(user.username);

        // redirigir según rol
        const role = user.role?.toUpperCase();
        if (role === 'ADMIN') {
          this.router.navigate(['/dashboard']);
        } else if (role === 'DOMICILIARIO') {
          this.router.navigate(['/pedidos-asignados']);
        } else {
          this.router.navigate(['/home']);
        }
      })
    );
  }

  // 🟠 LOGOUT
  logout(): void {
    localStorage.clear();
    this.loggedInSubject.next(false);
    this.roleSubject.next(null);
    this.usernameSubject.next(null);
    this.router.navigate(['/login']);
  }

  // 🧠 Obtener el usuario actual (sin suscripción)
  get currentUser(): { username: string | null; role: string | null } {
    return {
      username: this.usernameSubject.value,
      role: this.roleSubject.value
    };
  }

  // ♻️ Restaurar sesión si ya estaba logueado
  private restoreSession(): void {
    if (localStorage.getItem('loggedIn') === 'true') {
      const role = localStorage.getItem('role');
      const username = localStorage.getItem('username');
      this.loggedInSubject.next(true);
      this.roleSubject.next(role);
      this.usernameSubject.next(username);
    }
  }
}
