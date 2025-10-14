import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {
  usuarios: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.userService.getAll().subscribe({
      next: (data) => (this.usuarios = data),
      error: (err: HttpErrorResponse) => {
        console.error('❌ No se pudieron cargar los usuarios', err);
        alert('No se pudieron cargar los usuarios desde el servidor.');
      },
    });
  }

eliminarUsuario(id?: number): void {
  if (!id) return;

  const confirmacion = confirm('¿Seguro que deseas eliminar este usuario?');
  if (!confirmacion) return;

  this.userService.deleteUser(Number(id)).subscribe({  // ⚡ forzar a número
    next: () => {
      // ⚡ Actualizar la lista sin recargar desde backend
      this.usuarios = this.usuarios.filter(u => u.id !== id);
      console.log(`✅ Usuario con ID ${id} eliminado del backend y frontend`);
    },
    error: (err) => {
      console.error('❌ Error al eliminar usuario en backend:', err);
      alert('No se pudo eliminar el usuario.');
    }
  });
}

}