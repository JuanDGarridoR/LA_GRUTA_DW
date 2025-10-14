import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user/user.model';
import { AutenticacionService } from '../services/autenticacion.service'; // 🔹 importar servicio de autenticación

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {
  form!: FormGroup;
  userId!: number;
  userData!: User;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AutenticacionService // 🔹 inyectar autenticación
  ) {}

  ngOnInit(): void {
    // ✅ Obtener ID del usuario logueado
    const storedId = localStorage.getItem('id');
    if (storedId) {
      this.userId = Number(storedId);
      this.cargarUsuario();
    } else {
      console.error('❌ No se encontró el ID del usuario en localStorage');
    }

    // ✅ Inicializar formulario
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      direccion: [''],
      telefono: ['']
    });
  }

  cargarUsuario(): void {
    this.userService.getById(this.userId).subscribe({
      next: (user) => {
        this.userData = user;

        // ✅ Rellenar formulario con los datos actuales del usuario
        this.form.patchValue({
          username: user.username,
          password: user.password,
          direccion: user.direccion,
          telefono: user.telefono
        });
      },
      error: (err) => {
        console.error('❌ Error al cargar usuario:', err);
      }
    });
  }

  guardarCambios(): void {
    if (this.form.invalid) {
      return;
    }

    const updatedUser: User = {
      id: this.userId, // ✅ importante, viene de localStorage
      username: this.form.value.username,
      password: this.form.value.password,
      direccion: this.form.value.direccion,
      telefono: this.form.value.telefono,
      role: this.userData.role // ✅ mantener el mismo rol
    };

    this.userService.update(updatedUser).subscribe({
      next: (response) => {
        // ✅ Actualizar el usuario global en autenticación
        this.authService.setUsuario(response);

        alert('✅ Perfil actualizado correctamente');
      },
      error: (err) => {
        console.error('❌ Error al editar perfil:', err);
        alert('❌ Error al editar perfil');
      }
    });
  }
}
