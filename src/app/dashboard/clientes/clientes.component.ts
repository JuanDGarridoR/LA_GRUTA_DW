import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/usuarios/cliente/cliente.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[] = [];
  loading = true;

  constructor(private clienteService: ClienteService, private router: Router) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes() {
    this.clienteService.getAll().subscribe({
      next: (data) => {
        this.clientes = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  eliminar(id: number | undefined) {
    if (!id) return;

    this.clienteService.delete(id).subscribe(() => {
      this.clientes = this.clientes.filter(c => c.id !== id);
    });
  }
}
