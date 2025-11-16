import { Component } from '@angular/core';
import { AutenticacionService, LoginRequest } from '../services/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials: LoginRequest = { username: '', password: '' };
  errorMsg = '';
  loading = false;

  constructor(private authService: AutenticacionService) {}

  login(): void {
    this.errorMsg = '';
    this.loading = true;

    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.loading = false;
        // El servicio ya redirige según el rol
      },
      error: (err) => {
        this.loading = false;

        if (err.status === 401) {
          this.errorMsg = 'Usuario o contraseña incorrectos.';
        } else {
          this.errorMsg = 'Error al iniciar sesión.';
        }
      }
    });
  }
}
