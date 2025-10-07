import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Adicional } from '../../models/adicional/adicional.model';
import { Categoria } from '../../models/categoria/categoria.model';
import { AdicionalService } from '../../services/adicional.service';
import { HttpErrorResponse } from '@angular/common/http'; // Importa HttpErrorResponse si quieres ser más específico

@Component({
  selector: 'app-adicionales',
  templateUrl: './adicionales.component.html',
  styleUrls: ['./adicionales.component.css']
})
export class AdicionalesComponent implements OnInit {

  adicionales: Adicional[] = [];

  constructor(
    private adicionalService: AdicionalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cargarAdicionales();
  }

  cargarAdicionales(): void {
    // CAMBIO 1: Usar el nombre de método correcto 'getAdicionales'
    // CAMBIO 2: Añadir el tipo 'Adicional[]' al parámetro 'data'
    this.adicionalService.getAdicionales().subscribe({
      next: (data: Adicional[]) => this.adicionales = data,
      // CAMBIO 3: Añadir el tipo 'any' o 'HttpErrorResponse' al parámetro 'err'
      error: (err: any) => console.error('❌ Error al cargar adicionales:', err)
    });
  }

  getNombresCategorias(categorias: Categoria[] | undefined): string {
    if (!categorias || categorias.length === 0) {
      return '—';
    }
    return categorias.map(c => c.nombre).join(', ');
  }

  eliminarAdicional(id: number | undefined): void {
    if (!id) return;

    if (confirm('¿Estás seguro de que deseas eliminar este adicional?')) {
      // CAMBIO 4: Usar el nombre de método correcto 'eliminarAdicional'
      this.adicionalService.eliminarAdicional(id).subscribe({
        next: () => {
          this.adicionales = this.adicionales.filter(a => a.id !== id);
          console.log(`✅ Adicional con ID ${id} eliminado`);
        },
        error: (err: any) => {
          console.error('❌ Error al eliminar adicional:', err);
          alert('No se pudo eliminar el adicional.');
        }
      });
    }
  }
}