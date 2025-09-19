import { Component, OnInit } from '@angular/core';
import { Comida, COMIDAS } from '../models/comida/comida.model';
import { Categoria, CATEGORIAS } from '../models/categoria/categoria.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  comidas: Comida[] = [];
  categorias: Categoria[] = [];

  ngOnInit(): void {
    this.categorias = CATEGORIAS;
    this.comidas = COMIDAS;
  }

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
}
