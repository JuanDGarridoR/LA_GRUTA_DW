import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/models/usuarios/admin/admin.model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-administradores',
  templateUrl: './administradores.component.html'
})
export class AdministradoresComponent implements OnInit {

  admins: Admin[] = [];
  loading = false;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.cargarAdmins();
  }

  cargarAdmins() {
    this.loading = true;
    this.adminService.getAll().subscribe({
      next: (data) => {
        this.admins = data;
        this.loading = false;
      },
      error: (err) => {
        console.error("Error cargando admins", err);
        this.loading = false;
      }
    });
  }

  eliminar(id: number | undefined) {
    if (!id) return;

    if (!confirm('¿Seguro que deseas eliminar este administrador?')) return;

    this.adminService.delete(id).subscribe(() => {
      this.cargarAdmins();
    });
  }
}
