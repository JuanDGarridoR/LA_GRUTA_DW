import { Component } from '@angular/core';
import { Router } from '@angular/router'; // 1. Asegúrate de importar el Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  // Ya no necesitamos la variable 'credentials', pero la podemos dejar por ahora
  credentials = {
    username: '',
    password: ''
  };

  // 2. Inyecta el Router en el constructor para poder usarlo
  constructor(private router: Router) { }

  // 3. Simplificamos la función login a una sola línea
  login() {
    console.log('Botón de ingresar presionado, redirigiendo al dashboard...');
    this.router.navigate(['/dashboard/clientes']);
  }
}