import { Component, OnInit } from '@angular/core';
import { Pedido } from './../models/pedido/pedido.model';
import { PedidoService } from './../services/pedido.service';

@Component({
  selector: 'app-portal-operador',
  templateUrl: './portal-operador.component.html',
  styleUrls: ['./portal-operador.component.css']
})
export class PortalOperadorComponent implements OnInit {

  pedidos: Pedido[] = [];

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.pedidoService.getPedidosActivos().subscribe(data => {
      this.pedidos = data;
      console.log('Pedidos cargados desde el backend:', data);
    });
  }

  marcarCocinando(pedidoId: number): void {
    this.pedidoService.actualizarEstado(pedidoId, 'cocinando').subscribe(() => {
      this.cargarPedidos(); // Recargamos la lista para ver el cambio
    });
  }

  marcarEnviado(pedidoId: number): void {
    this.pedidoService.actualizarEstado(pedidoId, 'enviado').subscribe({
      next: () => {
        this.cargarPedidos(); // Recargamos la lista si todo sale bien
      },
      error: (err) => {
        alert(err.error); // Muestra el mensaje de error del backend (ej: "No hay domiciliarios")
      }
    });
  }

  marcarEntregado(pedidoId: number): void {
    this.pedidoService.actualizarEstado(pedidoId, 'entregado').subscribe(() => {
      this.cargarPedidos(); // Recargamos la lista (el pedido entregado desaparecerá)
    });
  }
}