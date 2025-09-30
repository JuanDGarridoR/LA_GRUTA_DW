import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-cuenta',
  templateUrl: './crear-cuenta.component.html',
  styleUrls: ['./crear-cuenta.component.css']
})
export class CrearCuentaComponent {

  newUser = {
    username: '',
    password: ''
  };

  constructor(private router: Router) { }

  crearCuenta() {
    console.log('Creando nueva cuenta con los datos:', this.newUser);
    // Aquí iría la lógica para llamar a un servicio que registre al usuario.
    // Por ahora, después de "crearla", podríamos redirigir al login.
    // this.router.navigate(['/login']);
  }
}