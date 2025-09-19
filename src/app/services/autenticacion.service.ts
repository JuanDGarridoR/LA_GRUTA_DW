import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AutenticacionService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  private roleSubject = new BehaviorSubject<string | null>(null);
  private usernameSubject = new BehaviorSubject<string | null>(null);

  isLoggedIn$ = this.loggedInSubject.asObservable();
  role$ = this.roleSubject.asObservable();
  username$ = this.usernameSubject.asObservable();

  constructor(private router: Router) {
    this.restoreSession();
  }

  login(username: string, role: string): void {
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('role', role);
    localStorage.setItem('username', username);

    this.loggedInSubject.next(true);
    this.roleSubject.next(role);
    this.usernameSubject.next(username);

    this.router.navigate(['/Home']);
  }

  logout(): void {
    localStorage.clear();
    this.loggedInSubject.next(false);
    this.roleSubject.next(null);
    this.usernameSubject.next(null);

    this.router.navigate(['/login']);
  }

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
