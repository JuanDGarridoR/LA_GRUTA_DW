import { Component, OnInit } from '@angular/core';
import { Domiciliario } from '../../models/domiciliario/domiciliario.model';
import { DomiciliarioService } from 'src/app/services/domiciliario.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-domiciliarios',
  templateUrl: './domiciliarios.component.html',
})
export class DomiciliariosComponent implements OnInit {
  domiciliarios: Domiciliario[] = [];

  constructor(private domiciliarioService: DomiciliarioService) {}

  ngOnInit(): void {
    this.cargarDomiciliarios();
  }

  cargarDomiciliarios(): void {
    this.domiciliarioService.getAll().subscribe({
      next: (data) => (this.domiciliarios = data),
      error: (err: HttpErrorResponse) => {
        console.error('❌ Error cargando domiciliarios', err);
        alert('No se pudieron cargar los domiciliarios.');
      },
    });
  }

  eliminarDomiciliario(id?: number): void {
    if (!id) return;
    const confirmacion = confirm('¿Seguro que deseas eliminar este domiciliario?');
    if (!confirmacion) return;

    this.domiciliarioService.delete(id).subscribe({
      next: () => {
        this.domiciliarios = this.domiciliarios.filter((d) => d.id !== id);
        console.log(`✅ Domiciliario con ID ${id} eliminado`);
      },
      error: (err) => {
        console.error('❌ Error al eliminar domiciliario:', err);
        alert('No se pudo eliminar el domiciliario.');
      },
    });
  }
}
