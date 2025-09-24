import { Component, OnInit } from '@angular/core';
// Importamos el modelo de datos. Ajusta la ruta si es necesario.
import { Adicional } from '../../models/adicional/adicional.model';
import { CATEGORIAS } from '../../models/categoria/categoria.model';

@Component({
  selector: 'app-adicionales',
  templateUrl: './adicionales.component.html',
  styleUrls: ['./adicionales.component.css']
})
export class AdicionalesComponent implements OnInit {

  // Arreglo de adicionales "quemados"
  adicionales: Adicional[] = [
    {
      id: 1,
      nombre: 'Queso Parmesano Extra',
      descripcion: 'Una porción generosa de queso parmesano rallado.',
      precio: 3500,
      categorias: [CATEGORIAS[1], CATEGORIAS[2], CATEGORIAS[3]] // Pizzas, Pastas, Risottos
    },
    {
      id: 2,
      nombre: 'Panceta Crujiente',
      descripcion: 'Tiras de panceta horneadas hasta quedar crujientes.',
      precio: 5000,
      categorias: [CATEGORIAS[2]] // Pastas
    },
    {
      id: 3,
      nombre: 'Salsa de la Casa',
      descripcion: 'Nuestra salsa pomodoro especial.',
      precio: 4000,
      categorias: [CATEGORIAS[0], CATEGORIAS[1], CATEGORIAS[2]] // Antipastos, Pizzas, Pastas
    },
    {
      id: 4,
      nombre: 'Porción de Pan de Ajo',
      descripcion: '2 unidades de pan artesanal con mantequilla de ajo.',
      precio: 6000,
      categorias: [CATEGORIAS[0], CATEGORIAS[2]] // Antipastos, Pastas
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  // Funciones para los botones de acción
  agregarAdicional(): void {
    console.log('Abriendo formulario para agregar nuevo adicional...');
  }

  editarAdicional(id: number | undefined): void {
    if (!id) return;
    console.log(`Editando adicional con ID: ${id}`);
  }

  eliminarAdicional(id: number | undefined): void {
    if (!id) return;
    console.log(`Eliminando adicional con ID: ${id}`);
  }
}