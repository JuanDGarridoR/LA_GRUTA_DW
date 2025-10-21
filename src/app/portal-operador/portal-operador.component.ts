import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Pedido } from './../models/pedido/pedido.model';
import { PedidoService } from './../services/pedido.service';

@Component({
  selector: 'app-portal-operador',
  templateUrl: './portal-operador.component.html',
  styleUrls: ['./portal-operador.component.css']
})
export class PortalOperadorComponent implements OnInit, OnDestroy {

  pedidos: Pedido[] = [];
  cargando = false;
  error?: string;

  private subs: Subscription[] = [];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
  }

  cargarPedidos(): void {
    this.cargando = true;
    this.error = undefined;

    const s = this.pedidoService.getPedidosActivos().subscribe({
      next: (data) => {
        this.pedidos = data ?? [];
        this.cargando = false;
        // console.log('Pedidos cargados desde el backend:', data);
      },
      error: (err) => {
        console.error('Error al cargar pedidos', err);
        this.error = 'No se pudieron cargar los pedidos.';
        this.cargando = false;
      }
    });

    this.subs.push(s);
  }

  private actualizarEstado(pedidoId: number, estado: 'cocinando' | 'enviado' | 'entregado'): void {
    const s = this.pedidoService.actualizarEstado(pedidoId, estado).subscribe({
      next: () => this.cargarPedidos(),
      error: (err) => {
        console.error(`Error al marcar ${estado}`, err);
        // Si el backend devuelve string (p.ej. "No hay domiciliarios disponibles")
        alert(typeof err?.error === 'string' ? err.error : 'No se pudo actualizar el pedido.');
      }
    });
    this.subs.push(s);
  }

  marcarCocinando(pedidoId: number): void {
    this.actualizarEstado(pedidoId, 'cocinando');
  }

  marcarEnviado(pedidoId: number): void {
    this.actualizarEstado(pedidoId, 'enviado');
  }

  marcarEntregado(pedidoId: number): void {
    this.actualizarEstado(pedidoId, 'entregado');
  }

  // ===== Helpers para plantilla =====

  /** Para *ngFor="let p of pedidos; trackBy: trackByPedido" */
  trackByPedido = (_: number, p: Pedido) => p.id;

  /** Map de clases para [ngClass] según estado */
  badgeMap(estado: string) {
    return {
      'bg-primary':            estado === 'recibido',
      'bg-warning text-dark':  estado === 'cocinando',
      'bg-info text-dark':     estado === 'enviado',
      'bg-success':            estado === 'entregado'
    };
  }

  /** Formatea COP sin depender del pipe currency (útil si el módulo no importa CommonModule) */
  formatCOP(value: number | null | undefined): string {
    const n = Number(value ?? 0);
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      maximumFractionDigits: 0
    }).format(n);
  }
}
