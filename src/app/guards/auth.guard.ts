import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AutenticacionService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role')?.toUpperCase();

    // 🟥 No logueado o sin token → redirige al login
    if (!loggedIn || !token) {
      this.router.navigate(['/login']);
      return false;
    }

    // 🟨 Verifica roles si la ruta tiene restricción
    const expectedRoles: string[] = route.data['roles'] || [];
    if (expectedRoles.length && !expectedRoles.includes(userRole!)) {
      this.router.navigate(['/home']); // o una ruta /403 si la tienes
      return false;
    }

    // 🟢 Autorizado
    return true;
  }
}
