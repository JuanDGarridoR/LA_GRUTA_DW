import { Component, OnInit } from '@angular/core';
import { Comida } from '../models/comida/comida.model';
import { Categoria, CATEGORIAS } from '../models/categoria/categoria.model';
import { ComidaService } from '../services/comida.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  comidas: Comida[] = [];
  categorias: Categoria[] = [];

  constructor(private comidaService: ComidaService) {}

  ngOnInit(): void {
    this.categorias = CATEGORIAS;

    this.comidaService.getComidas().subscribe({
      next: (data: Comida[]) => {
        this.comidas = data;
      },
      error: (err: any) => {
        console.error('❌ Error al cargar comidas:', err);
      }
    });
  }

  // ---------- Métodos de lógica del menú ----------
  verAdicionales(comida: Comida) {
    console.log('Ver adicionales de', comida.nombre);
  }

  agregarPedido(comida: Comida) {
    console.log('Agregar al pedido', comida.nombre);
  }

  sumarCantidad(comida: Comida) {
    comida.cantidad = (comida.cantidad || 0) + 1;
  }

  restarCantidad(comida: Comida) {
    if ((comida.cantidad || 0) >= 1) {
      comida.cantidad = comida.cantidad! - 1;
    }
  }

  // ---------- Imagen segura ----------
  getImageUrl(path: string | undefined): string {
  if (!path) {
    return 'assets/images/default-placeholder.png';
  }

  if (path.startsWith('http')) {
    return path;
  }

  return `http://localhost:8080${encodeURIComponent(path)}`;
}

}
