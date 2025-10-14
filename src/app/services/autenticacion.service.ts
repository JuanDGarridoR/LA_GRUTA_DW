import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user/user.model'; // 🔹 importa tu modelo User

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

  // 🔹 Subjects globales para emitir cambios
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  private roleSubject = new BehaviorSubject<string | null>(null);
  private usernameSubject = new BehaviorSubject<string | null>(null);

  // 🔹 Nuevo BehaviorSubject para el usuario completo
  private usuarioActualSubject = new BehaviorSubject<User | null>(this.getUsuarioActual());
  usuario$ = this.usuarioActualSubject.asObservable();

  // Observables para componentes
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
        // Guardar datos del usuario
        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('id', user.id.toString());
        localStorage.setItem('role', user.role);
        localStorage.setItem('username', user.username);
        localStorage.setItem('user', JSON.stringify(user)); // 🔹 Guardar usuario completo

        // Emitir cambios globales
        this.loggedInSubject.next(true);
        this.roleSubject.next(user.role);
        this.usernameSubject.next(user.username);
        this.usuarioActualSubject.next(user as User); // 🔹 emitir el usuario

        // Redirigir según rol
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

  // 🟠 LOGOUT
  logout(): void {
    localStorage.clear();
    this.loggedInSubject.next(false);
    this.roleSubject.next(null);
    this.usernameSubject.next(null);
    this.usuarioActualSubject.next(null);
    this.router.navigate(['/login']);
  }

  // 🧠 Obtener usuario actual (sin suscripción)
  get currentUser(): User | null {
    return this.usuarioActualSubject.value;
  }

  // 🔹 Obtener usuario guardado del localStorage
  getUsuarioActual(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // 🔹 Actualizar usuario global (cuando se edita el perfil)
  setUsuario(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('username', user.username ?? '');
    this.usuarioActualSubject.next(user);
    this.usernameSubject.next(user.username ?? '');
  }

  // ♻️ Restaurar sesión al recargar la página
  private restoreSession(): void {
    if (localStorage.getItem('loggedIn') === 'true') {
      const role = localStorage.getItem('role');
      const username = localStorage.getItem('username');
      const user = this.getUsuarioActual();

      this.loggedInSubject.next(true);
      this.roleSubject.next(role);
      this.usernameSubject.next(username);
      this.usuarioActualSubject.next(user);
    }
  }
}
