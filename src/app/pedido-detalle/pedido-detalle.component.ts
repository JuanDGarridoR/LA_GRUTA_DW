import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from '../services/pedido.service';
import { PedidoResponse } from '../models/carro/carro.model';

@Component({
  selector: 'app-pedido-detalle',
  templateUrl: './pedido-detalle.component.html',
  styleUrls: ['./pedido-detalle.component.css']
})
export class PedidoDetalleComponent implements OnInit {
  loading = true;
  error?: string;
  pedido?: PedidoResponse;
  justCreated = false; // para mostrar “pedido confirmado” cuando vienes del carrito

  constructor(
    private route: ActivatedRoute,
    private pedidoSvc: PedidoService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = Number(idParam);
    if (!id) {
      this.loading = false;
      this.error = 'ID de pedido inválido.';
      return;
    }

    // si venimos del carrito con { state: { ok: true } }
    this.justCreated = !!(history.state && history.state.ok);

    this.pedidoSvc.getPedidoPorId(id).subscribe({
      next: (p) => { this.pedido = p; this.loading = false; },
      error: (err) => {
        console.error('Error cargando pedido', err, err?.error);
        this.error = err?.error?.error || 'No encontramos el pedido.';
        this.loading = false;
      }
    });
  }

  totalItems(): number {
    return (this.pedido?.items ?? []).reduce((n, it) => n + (it.cantidad ?? 0), 0);
  }

  adNames(it: PedidoResponse['items'][number]): string {
    return (it.adicionales ?? [])
      .map(a => a?.nombre ?? '')
      .filter(Boolean)
      .join(', ');
  }

  subtotalFmt(it: PedidoResponse['items'][number]): number {
    return Number(it.subtotal ?? 0);
  }

  estadoClass(e: string | undefined) {
  const k = (e || '').toLowerCase();
  return {
    'pill-gray': k === 'en_proceso' || k === 'recibido',
    'pill-amber': k === 'cocinando',
    'pill-blue' : k === 'enviado',
    'pill-green': k === 'entregado'
  };
}


}
