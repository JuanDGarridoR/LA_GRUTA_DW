import { Component, OnInit } from '@angular/core';
import { Operador } from 'src/app/models/usuarios/operador/operador.model';
import { OperadorService } from 'src/app/services/operador.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-operadores',
  templateUrl: './operadores.component.html',
})
export class OperadoresComponent implements OnInit {

  operadores: Operador[] = [];
  loading = true;

  constructor(private operadoresService: OperadorService, private router: Router) {}

  ngOnInit(): void {
    this.cargarOperadores();
  }

  cargarOperadores() {
    this.operadoresService.getAll().subscribe({
      next: (data) => {
        this.operadores = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  eliminar(id: number | undefined) {
    if (!id) return;

    this.operadoresService.delete(id).subscribe(() => {
      this.operadores = this.operadores.filter(op => op.id !== id);
    });
  }
}
