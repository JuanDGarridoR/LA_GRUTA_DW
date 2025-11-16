import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/usuarios/user/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-operadores',
  templateUrl: './operadores.component.html',
})
export class OperadoresComponent implements OnInit {

  operadores: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.cargarOperadores();
  }

  cargarOperadores(): void {
    this.userService.getAll().subscribe({
      next: (data) => {
        // Filtrar solo los usuarios con rol OPERADOR
        this.operadores = data.filter(u =>
  u.roles?.includes('OPERADOR')
);

      },
      error: (err: HttpErrorResponse) => {
        console.error('❌ Error cargando operadores', err);
        alert('No se pudieron cargar los operadores.');
      }
    });
  }

  eliminarOperador(id?: number): void {
    if (!id) return;

    if (!confirm('¿Eliminar este operador?')) return;

    this.userService.deleteUser(id).subscribe({
      next: () => {
        this.operadores = this.operadores.filter(o => o.id !== id);
        console.log(`✅ Operador con ID ${id} eliminado.`);
      },
      error: (err) => {
        console.error('❌ No se pudo eliminar el operador:', err);
        alert('Error eliminando operador.');
      }
    });
  }
}
