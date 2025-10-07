import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {
    username: '',
    password: '',
    role: '',
    direccion: '',
    telefono: ''
  };
  successMsg = '';
  errorMsg = '';

  constructor(private http: HttpClient, private router: Router) {}

  register(): void {
    this.errorMsg = '';
    this.successMsg = '';

    if (!this.user.username || !this.user.password || !this.user.role) {
      this.errorMsg = 'Debe llenar todos los campos.';
      return;
    }

    this.http.post('http://localhost:8080/api/users', this.user).subscribe({
      next: () => {
        this.successMsg = 'Cuenta creada correctamente. Redirigiendo...';
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: () => {
        this.errorMsg = 'No se pudo crear el usuario. Intente de nuevo.';
      }
    });
  }
}
