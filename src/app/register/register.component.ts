import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  // Datos del formulario
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
  this.errorMsg = '';
  this.successMsg = '';

  if (!this.userData.username || !this.userData.password || !this.userData.nombre || !this.userData.apellido) {
    this.errorMsg = 'Debe llenar todos los campos obligatorios.';
    return;
  }

  // Enviar todo de una vez al endpoint correcto
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

  this.http.post('http://localhost:8080/api/users/register-cliente', payload).subscribe({
    next: () => {
      this.successMsg = 'Cuenta creada correctamente. Redirigiendo...';
      setTimeout(() => this.router.navigate(['/login']), 2000);
    },
    error: (err) => {
      console.error(err);
      this.errorMsg = 'No se pudo crear la cuenta.';
    }
  });
}


}
