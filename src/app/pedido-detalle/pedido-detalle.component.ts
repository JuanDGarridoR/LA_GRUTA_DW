import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PedidoResponse } from '../models/carro/carro.model';

@Component({
  selector: 'app-pedido-detalle',
  templateUrl: './pedido-detalle.component.html',
})
export class PedidoDetalleComponent implements OnInit {
  loading = true;
  error?: string;
  pedido?: PedidoResponse;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.http.get<PedidoResponse>(`/api/pedidos/${id}`).subscribe({
      next: (p) => { this.pedido = p; this.loading = false; },
      error: (e) => { this.error = 'Tu pedido llegara en cualquier momento...'; this.loading = false; console.error(e); }
    });
  }

  totalItems(): number {
    return (this.pedido?.items ?? []).reduce((n, it) => n + (it.cantidad ?? 0), 0);
  }

  // 👉 Helpers para usar en el HTML
  adNames(it: PedidoResponse['items'][number]): string {
    return (it.adicionales ?? [])
      .map(a => a?.nombre ?? '')
      .filter(Boolean)
      .join(', ');
  }

  subtotalFmt(it: PedidoResponse['items'][number]): number {
    return Number(it.subtotal ?? 0);
  }
}
