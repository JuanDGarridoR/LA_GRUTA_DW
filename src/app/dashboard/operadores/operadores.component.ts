import { Component, OnInit } from '@angular/core';
import { OperadorService } from 'src/app/services/operador.service';
import { Operador } from 'src/app/models/usuarios/operador/operador.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-operadores',
  templateUrl: './operadores.component.html',
  styleUrls: ['./operadores.component.css']
})
export class OperadoresComponent implements OnInit {

  operadores: Operador[] = [];

  // Formulario
  operadorForm: Operador = {
    nombre: '',
    user: {
      username: '',
      password: ''
    }
  };

  editMode: boolean = false;

  constructor(private operadorService: OperadorService) {}

  ngOnInit(): void {
    this.cargarOperadores();
  }

  // =============================
  // 🔹 Cargar todos los operadores
  // =============================
  cargarOperadores(): void {
    this.operadorService.getAll().subscribe({
      next: (data) => {
        this.operadores = data;
      },
      error: (err: HttpErrorResponse) => {
        console.error('❌ Error cargando operadores', err);
        alert('No se pudieron cargar los operadores.');
      }
    });
  }

  // =============================
  // 🔹 Guardar (crear o editar)
  // =============================
  guardarOperador() {
    if (this.editMode) {
      // EDITAR
      this.operadorService.update(this.operadorForm).subscribe({
        next: (opActualizado) => {
          alert('Operador actualizado');
          this.resetForm();
          this.cargarOperadores();
        },
        error: () => alert('Error actualizando operador')
      });
    } else {
      // CREAR
      this.operadorService.create(this.operadorForm).subscribe({
        next: (nuevo) => {
          alert('Operador creado');
          this.resetForm();
          this.cargarOperadores();
        },
        error: (err) => {
          console.error(err);
          alert(err.error?.error || 'Error creando operador');
        }
      });
    }
  }

  // =============================
  // 🔹 Preparar formulario para editar
  // =============================
  editarOperador(op: Operador) {
    this.editMode = true;

    this.operadorForm = {
      id: op.id,
      nombre: op.nombre,
      user: {
        id: op.user?.id,
        username: op.user?.username,
        password: '' // vacío para no romper el form
      }
    };
  }

  // =============================
  // 🔹 Eliminar operador
  // =============================
  eliminarOperador(id?: number) {
    if (!id) return;

    if (!confirm('¿Eliminar este operador?')) return;

    this.operadorService.delete(id).subscribe({
      next: () => {
        alert('Operador eliminado');
        this.cargarOperadores();
      },
      error: () => alert('Error eliminando operador')
    });
  }

  // =============================
  // 🔹 Resetear formulario
  // =============================
  resetForm() {
    this.operadorForm = {
      nombre: '',
      user: {
        username: '',
        password: ''
      }
    };
    this.editMode = false;
  }
}
