import { Component, OnInit } from '@angular/core';
import { Comida } from '../models/comida/comida.model';
import { Categoria, CATEGORIAS } from '../models/categoria/categoria.model';
import { ComidaService } from '../services/comida.service';
import { AdicionalService } from '../services/adicional.service';
import { Adicional } from '../models/adicional/adicional.model';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
addAdicionalToComida(_t54: Adicional) {
throw new Error('Method not implemented.');
}

  comidas: Comida[] = [];
  categorias: Categoria[] = [];
  extras: Adicional[] = [];            // lista de adicionales cargados
  showExtrasModal = false;             
  selectedComida?: Comida;             // guarda la comida que el usuario seleccionó
  loadingExtras = false; 
  selectedAdicional: Adicional | null = null;
              


  constructor(private comidaService: ComidaService, private adicionalService: AdicionalService) {}

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
  this.selectedComida = comida;
  this.extras = [];
  this.loadingExtras = true;
  this.showExtrasModal = true;

  const slug = comida.categoria?.slug;
  if (!slug) {
    console.warn('Esta comida no tiene categoría asociada.');
    this.loadingExtras = false;
    return;
  }

  // Consumir el endpoint del backend
  this.adicionalService.getByCategoriaSlug(slug).subscribe({
    next: (data: Adicional[]) => {
      this.extras = data;
      this.loadingExtras = false;
    },
    error: (err) => {
      console.error(' Error al cargar adicionales:', err);
      this.loadingExtras = false;
    }
  });
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

  // Filtra las comidas de una categoría
getComidasPorCategoria(slug: string): Comida[] {
  return this.comidas.filter(
    comida => comida.categoria?.slug?.toLowerCase() === slug.toLowerCase()
  );
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
