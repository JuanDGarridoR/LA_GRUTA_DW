import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OperadorService } from 'src/app/services/operador.service';
import { Operador } from 'src/app/models/usuarios/operador/operador.model';

@Component({
  selector: 'app-operadores-form',
  templateUrl: './operadores-form.component.html',
})
export class OperadoresFormComponent implements OnInit {

  operador: Operador = {
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    user: {
      username: '',
      password: '',
      roles: [{ id: 3, name: 'OPERADOR' }]
    }
  };

  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private operadoresService: OperadorService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.editMode = true;
      this.operadoresService.getById(+id).subscribe(op => {
        this.operador = op;
      });
    }
  }

  guardar() {
    if (this.editMode) {
      this.operadoresService.update(this.operador).subscribe(() => {
        this.router.navigate(['/dashboard/operadores']);
      });
    } else {
      this.operadoresService.create(this.operador).subscribe(() => {
        this.router.navigate(['/dashboard/operadores']);
      });
    }
  }
}
