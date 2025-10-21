import { Component, OnInit } from '@angular/core';
import { PedidoService } from './../services/pedido.service';
import { Pedido, PedidoComida } from './../models/pedido/pedido.model';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.css']
})
export class MisPedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  clienteId: number = 0;
  cargando: boolean = true;
  error: string = '';

  expanded: Record<number, boolean> = {};

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    const stored = localStorage.getItem('id');
    if (!stored) {
      this.error = 'No se encontró sesión activa.';
      this.cargando = false;
      return;
    }

    this.clienteId = Number(stored);
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.cargando = true;
    this.error = '';
    this.pedidoService.getPedidosPorCliente(this.clienteId).subscribe({
      next: (data) => {
        this.pedidos = data || [];
        this.pedidos.forEach(p => (this.expanded[p.id] = false));
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar pedidos', err);
        this.error = 'No se pudieron cargar los pedidos.';
        this.cargando = false;
      }
    });
  }

  obtenerResumenPedido(pedido: Pedido): string {
    if (!pedido.items || pedido.items.length === 0) return '— Sin items —';
    return pedido.items.map(item => {
      const nombre = item.comida?.nombre ?? 'Comida desconocida';
      const adicionales = this.obtenerNombresAdicionales(item);
      const extras = adicionales.length ? `(${adicionales})` : '';
      return `${nombre} ${extras} x${item.cantidad}`;
    }).join(' · ');
  }

  obtenerNombresAdicionales(item: PedidoComida): string {
    if (!item.adicionales || item.adicionales.length === 0) return '';
    return item.adicionales
      .filter(a => !!a && !!a.nombre)
      .map(a => a.nombre)
      .join(', ');
  }

  toggleExpand(pedidoId: number): void {
    this.expanded[pedidoId] = !this.expanded[pedidoId];
  }

  subtotalItem(item: PedidoComida): number {
    const precioComida = Number(item.comida?.precio ?? 0);
    const totalAdicionales = (item.adicionales ?? []).reduce((s, a) => s + Number(a.precio ?? 0), 0);
    return (precioComida + totalAdicionales) * (Number(item.cantidad ?? 0));
  }

  calcularTotalDesdeItems(pedido: Pedido): number {
    if (!pedido.items) return 0;
    return pedido.items.reduce((s, it) => s + this.subtotalItem(it), 0);
  }
}
