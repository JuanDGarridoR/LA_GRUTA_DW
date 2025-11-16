import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/usuarios/cliente/cliente.model';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {

  form!: FormGroup;
  cliente!: Cliente;
  clienteId!: number;

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void {

    const storedUserId = localStorage.getItem('id');
    if (!storedUserId) {
      console.error("❌ No hay usuario logueado.");
      return;
    }

    const userId = Number(storedUserId);

    // Cargar cliente por id de usuario
    this.clienteService.getByUserId(userId).subscribe({
      next: (cli) => {
        this.cliente = cli;
        this.clienteId = cli.id!;

        this.form.patchValue({
          nombre: cli.nombre,
          apellido: cli.apellido,
          correo: cli.correo,
          telefono: cli.telefono,
          direccion: cli.direccion
        });
      },
      error: (err) => console.error("❌ Error cargando cliente", err)
    });

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: [''],
      direccion: ['']
    });
  }

  guardarCambios(): void {
    if (this.form.invalid) return;

    const updatedCliente: Cliente = {
      ...this.cliente,
      ...this.form.value
    };

    this.clienteService.update(updatedCliente).subscribe({
      next: () => {
        alert("Perfil actualizado correctamente");
      },
      error: () => alert("No se pudo actualizar el perfil.")
    });
  }
}
