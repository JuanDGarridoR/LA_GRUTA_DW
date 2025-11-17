import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/app/models/usuarios/admin/admin.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-administradores-form',
  templateUrl: './administradores-form.component.html'
})
export class AdministradoresFormComponent implements OnInit {

  id?: number;

  admin: Admin = {
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    direccion: '',
    user: {
      id: undefined,
      username: '',
      password: '',
      roles: [{ id: 1, name: 'ADMIN' }]
    }
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.adminService.getById(this.id).subscribe({
        next: (data) => this.admin = data
      });
    }
  }

  guardar() {
    if (this.id) {
      this.adminService.update(this.id, this.admin).subscribe(() => {
        this.router.navigate(['/dashboard/administradores']);
      });
    } else {
      this.adminService.create(this.admin).subscribe(() => {
        this.router.navigate(['/dashboard/administradores']);
      });
    }
  }
}
