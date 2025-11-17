import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  userData = {
    username: '',
    password: '',
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    direccion: ''
  };

  successMsg = '';
  errorMsg = '';

  constructor(private http: HttpClient, private router: Router) {}

  register(): void {

    const payload = {
      user: {
        username: this.userData.username,
        password: this.userData.password
      },
      nombre: this.userData.nombre,
      apellido: this.userData.apellido,
      correo: this.userData.correo,
      telefono: this.userData.telefono,
      direccion: this.userData.direccion
    };

    this.http.post('http://localhost:8080/api/users/register-cliente', payload)
      .subscribe({
        next: () => {
          this.successMsg = 'Cuenta creada correctamente. Redirigiendo...';
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: (err) => {
          console.error(err);
          this.errorMsg = err.error?.error || 'No se pudo crear la cuenta.';
        }
      });
  }
}
