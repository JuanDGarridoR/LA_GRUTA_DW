import { Component, OnInit } from '@angular/core';
import { Comida } from '../../models/comida/comida.model';
import { ComidaService } from 'src/app/services/comida.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-comidas',
  templateUrl: './comidas.component.html',
  styleUrls: ['./comidas.component.css']
})
export class ComidasComponent implements OnInit {

  comidas: Comida[] = [];

  // 👇 Inyecta el servicio correctamente
  constructor(private comidaService: ComidaService) {}

  ngOnInit(): void {
    // ⚡ Ya no uses COMIDAS quemadas
    this.cargarComidas();
  }

  cargarComidas(): void {
    this.comidaService.getComidas().subscribe({
      next: (data) => this.comidas = data,
      error: (err) => console.error('❌ Error al cargar comidas:', err)
    });
  }

  eliminarComida(id: number | undefined): void {
    if (!id) return;

    const confirmacion = confirm('¿Estás seguro de que deseas eliminar esta comida?');

    if (confirmacion) {
      this.comidaService.deleteComida(id).subscribe({
        next: () => {
          this.comidas = this.comidas.filter(comida => comida.id !== id);
          console.log(`✅ Comida con ID ${id} eliminada del backend y frontend`);
        },
        error: (err: HttpErrorResponse) => {
          console.error('❌ Error al eliminar en backend:', err);
          alert('No se pudo eliminar la comida en la base de datos');
        }
      });
    }
  }
}
