import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OperadorService } from 'src/app/services/operador.service';
import { Operador } from 'src/app/models/usuarios/operador/operador.model';

@Component({
  selector: 'app-operadores-form',
  templateUrl: './operadoresform.component.html',
  styleUrls: ['./operadoresform.component.css']
})
export class OperadoresFormComponent implements OnInit {

  operador: Operador = {
    nombre: '',
    user: {
      username: '',
      password: ''
    }
  };

  editMode = false;

  constructor(
    private operadorService: OperadorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.editMode = true;
      this.cargarOperador(+id);
    }
  }

  // ==========================
  // 🔹 Cargar Operador por ID
  // ==========================
  cargarOperador(id: number) {
    this.operadorService.getById(id).subscribe({
      next: (data) => {
        this.operador = {
          id: data.id,
          nombre: data.nombre,
          user: {
            id: data.user?.id,
            username: data.user?.username,
            password: ''   // vacio para no mostrar
          }
        };
      },
      error: () => alert('Error cargando operador')
    });
  }

  // ==========================
  // 🔹 Crear o actualizar
  // ==========================
  guardar() {
    if (this.editMode) {
      this.operadorService.update(this.operador).subscribe({
        next: () => {
          alert('Operador actualizado');
          this.router.navigate(['/dashboard/operadores']);
        },
        error: () => alert('Error actualizando operador')
      });
    } else {
      this.operadorService.create(this.operador).subscribe({
        next: () => {
          alert('Operador creado correctamente');
          this.router.navigate(['/dashboard/operadores']);
        },
        error: (err) => {
          alert(err.error?.error || 'Error creando operador');
        }
      });
    }
  }

  cancelar() {
    this.router.navigate(['/dashboard/operadores']);
  }
}
