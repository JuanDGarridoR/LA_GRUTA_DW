import { Component } from '@angular/core';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  usuarios = [
    { id: 1803, nombre: 'Admin1' },
    { id: 1804, nombre: 'juan' },
    { id: 1852, nombre: 'profe' },
    { id: 1902, nombre: 'nuevo@gmail.com' },
    { id: 1903, nombre: 'admin5' },
    { id: 3502, nombre: 'pipe' },
    { id: 3552, nombre: 'pipe' }
  ];

  constructor() { }

  editarUsuario(id: number) {
    console.log('Editar usuario con ID:', id);
  }

  eliminarUsuario(id: number) {
    console.log('Eliminar usuario con ID:', id);
  }
}