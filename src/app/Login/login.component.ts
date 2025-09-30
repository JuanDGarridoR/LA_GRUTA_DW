import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  credentials = {
    username: '',
    password: ''
  };

  constructor(private router: Router) { }

  login(): void {
    console.log('Iniciando sesión con el usuario:', this.credentials.username);

    // Convertimos el nombre de usuario a minúsculas para que no importe si escriben "Admin" o "admin"
    const userRole = this.credentials.username.toLowerCase();

    // Lógica de redirección basada solo en el nombre de usuario
    if (userRole === 'admin') {
      // Si el usuario es 'admin', va al dashboard de administrador
      this.router.navigate(['/dashboard/clientes']);

    } else if (userRole === 'operador') {
      // Si el usuario es 'operador', va al portal de operador
      this.router.navigate(['/operador/portal']);

    } else {
      // Para cualquier otro usuario (o si es 'cliente'), va a la página de inicio
      this.router.navigate(['/home']);
    }
  }
}