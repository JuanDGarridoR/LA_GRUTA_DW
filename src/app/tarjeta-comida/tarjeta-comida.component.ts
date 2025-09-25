import { Component, Input } from '@angular/core';
import { Comida } from '../models/comida/comida.model';

@Component({
  selector: 'app-tarjeta-comida',
  templateUrl: './tarjeta-comida.component.html',
  styleUrls: ['./tarjeta-comida.component.css']
})
export class TarjetaComidaComponent {
  @Input() comida!: Comida;

  sumarCantidad() {
    this.comida.cantidad = (this.comida.cantidad || 0) + 1;
  }

  restarCantidad() {
    if ((this.comida.cantidad || 0) > 0) {
      this.comida.cantidad!--;
    }
  }

  agregarPedido() {
    console.log('Agregar al pedido:', this.comida.nombre);
  }

  verAdicionales() {
    console.log('Ver adicionales de:', this.comida.nombre);
  }
}
