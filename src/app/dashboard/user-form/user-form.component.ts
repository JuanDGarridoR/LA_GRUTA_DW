// src/app/dashboard/user-form/user-form.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {
  user: User = {
    id: undefined,
    username: '',
    password: '',
    role: 'USER',
    direccion: '',
    telefono: ''
  };

  isEditMode = false;
  pageTitle = 'Nuevo Usuario';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.pageTitle = 'Editar Usuario';
      this.userService.getById(+id).subscribe({
        next: (data) => this.user = data,
        error: (err) => {
          console.error('❌ Error al cargar usuario', err);
          alert('No se pudo cargar el usuario desde el servidor.');
          this.router.navigate(['/dashboard/clientes']);
        }
      });
    }
  }

  guardarUsuario(): void {
    if (this.isEditMode) {
      // UPDATE
      this.userService.update(this.user).subscribe({
        next: () => {
          alert('Usuario actualizado correctamente');
          this.router.navigate(['/dashboard/clientes']);
        },
        error: (err) => {
          console.error('❌ Error actualizando usuario:', err);
          alert('No se pudo actualizar el usuario.');
        }
      });
    } else {
      // CREATE
      this.userService.add(this.user).subscribe({
        next: () => {
          alert('Usuario agregado correctamente');
          this.router.navigate(['/dashboard/clientes']);
        },
        error: (err) => {
          console.error('❌ Error creando usuario:', err);
          alert('No se pudo crear el usuario.');
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/dashboard/clientes']);
  }
}
