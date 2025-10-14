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
    this.loading = true;
    this.errorMsg = '';

    this.authService.login(this.credentials).subscribe({
      next: () => {
        this.loading = false;
        // el servicio ya redirige según el rol
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg =
          typeof err.error === 'string'
            ? err.error
            : 'Error al iniciar sesión. Verifique sus credenciales.';
      }
    });
  }
}
