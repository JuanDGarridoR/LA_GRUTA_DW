import { Component, OnInit } from '@angular/core';
import { Pedido } from './../models/pedido/pedido.model';
import { PedidoService } from './../services/pedido.service'; // 1. IMPORTA EL SERVICIO

@Component({
  selector: 'app-portal-operador',
  templateUrl: './portal-operador.component.html',
  styleUrls: ['./portal-operador.component.css']
})
export class PortalOperadorComponent implements OnInit {

  // El arreglo ahora se inicializa vacío. El servicio lo llenará con datos del backend.
  pedidos: Pedido[] = [];

  // 2. INYECTA EL SERVICIO EN EL CONSTRUCTOR
  constructor(private pedidoService: PedidoService) { }

  // 3. Cuando el componente se inicia, se cargan los pedidos desde el backend.
  ngOnInit(): void {
    this.cargarPedidos();
  }

  /**
   * Llama al servicio para obtener la lista de pedidos activos y actualizar la tabla.
   */
  cargarPedidos(): void {
    this.pedidoService.getPedidosActivos().subscribe(data => {
      this.pedidos = data;
      console.log('Pedidos cargados desde el backend:', data);
    });
  }

  // --- FUNCIONES ACTUALIZADAS PARA USAR EL SERVICIO ---

  /**
   * Llama al servicio para cambiar el estado de un pedido a 'cocinando'.
   * @param pedidoId El ID del pedido a actualizar.
   */
  marcarCocinando(pedidoId: number): void {
    this.pedidoService.actualizarEstado(pedidoId, 'cocinando').subscribe(() => {
      console.log(`Pedido #${pedidoId} actualizado a 'cocinando'.`);
      this.cargarPedidos(); // Recargamos la lista para ver el cambio.
    });
  }

  /**
   * Llama al servicio para cambiar el estado de un pedido a 'enviado'.
   * @param pedidoId El ID del pedido a actualizar.
   */
  marcarEnviado(pedidoId: number): void {
    this.pedidoService.actualizarEstado(pedidoId, 'enviado').subscribe({
      next: () => {
        console.log(`Pedido #${pedidoId} actualizado a 'enviado'.`);
        this.cargarPedidos(); // Recargamos la lista si todo sale bien.
      },
      error: (err) => {
        // Manejamos el error si el backend responde que no hay domiciliarios.
        alert(err.error); 
        console.error(err);
      }
    });
  }

  /**
   * Llama al servicio para cambiar el estado de un pedido a 'entregado'.
   * @param pedidoId El ID del pedido a actualizar.
   */
  marcarEntregado(pedidoId: number): void {
    this.pedidoService.actualizarEstado(pedidoId, 'entregado').subscribe(() => {
      console.log(`Pedido #${pedidoId} actualizado a 'entregado'.`);
      this.cargarPedidos(); // Recargamos la lista para que el pedido desaparezca de activos.
    });
  }
}