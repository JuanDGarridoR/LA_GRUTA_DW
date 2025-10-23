// src/app/mis-pedidos/mis-pedidos.component.ts
import { Component, OnInit } from '@angular/core';
import { finalize, map } from 'rxjs/operators';
import { PedidoService } from '../services/pedido.service';
import { PedidoResponse } from '../models/carro/carro.model';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.css']
})
export class MisPedidosComponent implements OnInit {

  pedidos: PedidoResponse[] = [];
  loading = false;
  error: string | null = null;

  // Resaltar el último pedido si llegamos desde el carrito
  highlightId?: number;
  justCreated = false;

  constructor(private pedidoSvc: PedidoService) {}

  ngOnInit(): void {
    // Si venimos desde el carrito (router.navigate con { state: { highlight, ok } })
    this.justCreated = !!history.state?.ok;
    const h = Number(history.state?.highlight);
    this.highlightId = Number.isFinite(h) ? h : undefined;

    // Cargar pedidos
    this.cargarMisPedidos();
  }

  /** Carga los pedidos del usuario autenticado */
  cargarMisPedidos(): void {
    this.loading = true;
    this.error = null;

    // Extraer userId desde localStorage (definido en AutenticacionService)
    const userIdRaw = localStorage.getItem('userId');
    const userId = userIdRaw ? Number(userIdRaw) : NaN;

    if (Number.isNaN(userId)) {
      this.error = 'No se encontró el usuario autenticado.';
      this.loading = false;
      return;
    }

    this.pedidoSvc.getPedidosPorUsuario(userId)
      .pipe(
        map((list) =>
          (list ?? []).sort(
            (a, b) => new Date(b.creadoEn).getTime() - new Date(a.creadoEn).getTime()
          )
        ),
        finalize(() => (this.loading = false))
      )
      .subscribe({
        next: (data: PedidoResponse[]) => {
          this.pedidos = data ?? [];
        },
        error: (err) => {
          console.error('Error cargando pedidos', err);
          this.error = 'No se pudieron cargar tus pedidos.';
        }
      });
  }

  // ---------- Helpers usados por la plantilla ----------

  /** Ítems del pedido */
  itemsDe(pedido: PedidoResponse): PedidoResponse['items'] {
    return pedido?.items ?? [];
  }

  /** Subtotal mostrado por ítem (usa el subtotal del DTO y hace fallback si no viniera) */
  subtotalItem(item: PedidoResponse['items'][number]): number {
    const fallback = Number((item as any)?.precio ?? 0) * Number(item?.cantidad ?? 1);
    return Number(item?.subtotal ?? fallback);
  }

  /** Total calculado (usa el total del DTO y hace fallback a la suma de subtotales) */
  calcularTotalDesdeItems(pedido: PedidoResponse): number {
    if (typeof pedido?.total === 'number') return pedido.total;
    return this.itemsDe(pedido).reduce((acc, it) => acc + this.subtotalItem(it), 0);
  }

  /** trackBy para *ngFor */
  trackByPedidoId = (_: number, p: PedidoResponse) => p.id;
}
