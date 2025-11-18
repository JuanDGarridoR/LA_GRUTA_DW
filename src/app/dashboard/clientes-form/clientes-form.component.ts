import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from 'src/app/services/cliente.service';
import { Cliente } from 'src/app/models/usuarios/cliente/cliente.model';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente = {
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    direccion: '',
    user: {
      username: '',
      password: '',
      roles: [{ id: 2, name: 'CLIENTE' }]   // 👈 ROLE CLIENTE
    }
  };

  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.editMode = true;
      this.clienteService.getById(+id).subscribe(cli => {
        this.cliente = cli;
      });
    }
  }

  guardar() {
    if (this.editMode) {
      this.clienteService.update(this.cliente).subscribe(() => {
        this.router.navigate(['/dashboard/clientes']);
      });
    } else {
      this.clienteService.create(this.cliente).subscribe(() => {
        this.router.navigate(['/dashboard/clientes']);
      });
    }
  }
}
