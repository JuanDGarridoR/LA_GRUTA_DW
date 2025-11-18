import { Component, OnInit } from '@angular/core';
import { DomiciliarioService } from 'src/app/services/domiciliario.service';
import { Domiciliario } from '../../models/domiciliario/domiciliario.model';

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

  // Cargar todos los domiciliarios
  cargarDomiciliarios(): void {
    this.domiciliarioService.getAll().subscribe({
      next: (data) => this.domiciliarios = data,
      error: (err) => {
        console.error('❌ Error cargando domiciliarios', err);
        alert(err.error?.error || 'No se pudieron cargar los domiciliarios.');
      },
    });
  }

  // Eliminar domiciliario
  eliminarDomiciliario(id?: number): void {
    if (!id) return;
    const confirmacion = confirm('¿Seguro que deseas eliminar este domiciliario?');
    if (!confirmacion) return;

    this.domiciliarioService.delete(id).subscribe({
      next: (res) => {
        // Filtrar el eliminado de la lista local
        this.domiciliarios = this.domiciliarios.filter((d) => d.id !== id);
        alert(res.mensaje);
      },
      error: (err) => {
        console.error('❌ Error al eliminar domiciliario:', err);
        alert(err.error?.error || 'No se pudo eliminar el domiciliario.');
      },
    });
  }

  // Agregar domiciliario
  agregarDomiciliario(domiciliario: Domiciliario): void {
    this.domiciliarioService.add(domiciliario).subscribe({
      next: (res) => {
        alert(res.mensaje);
        this.cargarDomiciliarios();
      },
      error: (err) => {
        console.error('❌ Error al agregar domiciliario', err);
        alert(err.error?.error || 'No se pudo agregar el domiciliario.');
      },
    });
  }

  // Actualizar domiciliario
  actualizarDomiciliario(domiciliario: Domiciliario): void {
    this.domiciliarioService.update(domiciliario).subscribe({
      next: (res) => {
        alert(res.mensaje);
        this.cargarDomiciliarios();
      },
      error: (err) => {
        console.error('❌ Error al actualizar domiciliario', err);
        alert(err.error?.error || 'No se pudo actualizar el domiciliario.');
      },
    });
  }
}
