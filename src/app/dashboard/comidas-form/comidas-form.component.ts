import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Comida } from '../../models/comida/comida.model';
import { Categoria, CATEGORIAS } from '../../models/categoria/categoria.model';
import { ComidaService } from 'src/app/services/comida.service'; 

@Component({
  selector: 'app-comidas-form',
  templateUrl: './comidas-form.component.html',
  styleUrls: ['./comidas-form.component.css']
})
export class ComidasFormComponent implements OnInit {

  comida: Comida | undefined;
  categorias: Categoria[] = [];
  isEditMode = false;
  pageTitle = 'Agregar Nueva Comida';

  // Inyectamos ActivatedRoute para poder leer la URL
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private comidaService: ComidaService 
  ) { }

  ngOnInit(): void {
  this.categorias = CATEGORIAS; // Si luego expones categorías por API, cámbialo a un service

  const idParam = this.route.snapshot.paramMap.get('id');

  if (idParam) {
    // Modo editar
    this.isEditMode = true;
    this.pageTitle = 'Editar Comida';
    const comidaId = Number(idParam);

    // ✅ Cargar desde backend (ya no usamos COMIDAS.find)
    this.comidaService.getComidaById(comidaId).subscribe({
      next: (data: Comida) => {
        this.comida = { ...data }; // hacemos copia segura
      },
      error: (err) => {
        console.error('❌ Error al cargar comida', err);
        alert('No se pudo cargar la comida desde la base de datos.');
        this.router.navigate(['/dashboard/comidas']);
      }
    });
  } else {
    // Modo agregar
    this.isEditMode = false;
    this.pageTitle = 'Agregar Nueva Comida';
    this.comida = {
      nombre: '',
      descripcion: '',
      precio: 0,
      imagen: '/images/default-placeholder.png', // recuerda en el HTML usar: [src]="'assets' + comida.imagen"
      disponible: true
    };
  }
}

  onImagenChange(value: string): void {
  if (this.comida) {
    // Reemplaza espacios por %20 para que no fallen las URLs
    this.comida.imagen = value ? value.replace(/ /g, '%20') : '';
  }
}


  guardarComida(): void {
  if (!this.comida) return;

  if (this.isEditMode && this.comida.id != null) {
    // UPDATE
    this.comidaService.updateComida(this.comida.id, this.comida).subscribe({
      next: () => this.router.navigate(['/dashboard/comidas']),
      error: (err) => {
        console.error('❌ Error actualizando comida:', err);
        alert('No se pudo actualizar la comida.');
      }
    });
  } else {
    // CREATE
    this.comidaService.createComida(this.comida).subscribe({
      next: () => this.router.navigate(['/dashboard/comidas']),
      error: (err) => {
        console.error('❌ Error creando comida:', err);
        alert('No se pudo crear la comida.');
      }
    });
  }
}

  encodeImageUrl(url: string): string {
  return url ? encodeURI(url) : '';
}

  cancelar(): void {
    this.router.navigate(['/dashboard/comidas']);
  }
}