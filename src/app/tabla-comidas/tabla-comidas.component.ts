import { Component, OnInit } from '@angular/core';
import { Comida } from '../models/comida/comida.model';
import { Categoria, CATEGORIAS } from '../models/categoria/categoria.model'; 
import { ComidaService } from '../services/comida.service'; // 👈 Importa el service

@Component({
  selector: 'app-tabla-comidas',
  templateUrl: './tabla-comidas.component.html',
  styleUrls: ['./tabla-comidas.component.css']
})
export class TablaComidasComponent implements OnInit {

  comidas: Comida[] = [];
  categorias: Categoria[] = [];

  // ✅ Inyectamos el servicio
  constructor(private comidaService: ComidaService) {}

  ngOnInit(): void {
    this.categorias = CATEGORIAS;

    // ✅ Ahora sí llamamos al backend
    this.comidaService.getComidas().subscribe({
      next: (data: Comida[]) => {
        this.comidas = data;
      },
      error: (err: any) => {
        console.error('❌ Error al cargar comidas:', err);
      }
    });
  }

  // 🔗 Método para armar la URL de la imagen
  getImageUrl(path: string | undefined): string {
    if (!path) {
      return 'assets/images/default-placeholder.png';
    }

    // Si ya viene con http, lo dejamos tal cual
    if (path.startsWith('http')) {
      return path;
    }

    // Si no, añadimos la ruta del backend
    return `http://localhost:8080${path}`;
  }
}
