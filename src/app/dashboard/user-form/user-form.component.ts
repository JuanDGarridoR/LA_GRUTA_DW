import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/usuarios/user/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
})
export class UserFormComponent implements OnInit {

  user: User = {
    id: undefined,
    username: '',
    password: '',
    roles: [] // ← los roles se agregan aquí
  };

  isEditMode = false;
  pageTitle = 'Crear Usuario Administrativo';

  // Roles disponibles en tu backend
  availableRoles = ['ADMIN', 'OPERADOR'];

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.pageTitle = 'Editar Usuario Administrativo';

      this.userService.getById(+id).subscribe({
        next: (data) => {
          this.user = {
            id: data.id,
            username: data.username,
            password: '', // nunca traemos password
            roles: data.roles || []
          };
        },
        error: () => {
          alert('No se pudo cargar el usuario.');
          this.router.navigate(['/dashboard/usuarios']);
        }
      });
    }
  }

  guardarUsuario(): void {

    if (this.isEditMode) {
      this.userService.update(this.user).subscribe({
        next: () => {
          alert('Usuario actualizado.');
          this.router.navigate(['/dashboard/usuarios']);
        },
        error: () => alert('Error al actualizar usuario.')
      });

    } else {
      this.userService.add(this.user).subscribe({
        next: () => {
          alert('Usuario creado correctamente');
          this.router.navigate(['/dashboard/usuarios']);
        },
        error: () => alert('Error al crear usuario.')
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/dashboard/usuarios']);
  }
}
