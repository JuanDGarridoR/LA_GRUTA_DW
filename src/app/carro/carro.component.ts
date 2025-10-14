import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

// ⛳ Usa la ruta que corresponda a tu proyecto:
// import { CreatePedidoRequest, PedidoResponse } from '../models/carro.model';
import { CreatePedidoRequest, PedidoResponse } from '../models/carro/carro.model';

@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.css']
})
export class CarroComponent {
  loading = false;
  error?: string;

  constructor(
    private cart: CartService,
    private http: HttpClient,
    private router: Router
  ) {}

  // ===== Datos del carro =====
  get items$() { return this.cart.items$; }
  inc(i: any)    { this.cart.updateCantidad(i.comidaId, i.adicionalIds, i.cantidad + 1); }
  dec(i: any)    { this.cart.updateCantidad(i.comidaId, i.adicionalIds, i.cantidad - 1); }
  remove(i: any) { this.cart.remove(i.comidaId, i.adicionalIds); }
  total(): number { return this.cart.total(); }
  count(): number { return this.cart.count(); }

  // ===== Helpers para el HTML =====
  adNames(it: any): string {
    return (it.adicionales ?? [])
      .map((a: any) => a?.nombre ?? '')
      .filter(Boolean)
      .join(', ');
  }
  adTotal(it: any): number {
    return (it.adicionales ?? []).reduce(
      (s: number, a: any) => s + (a?.precio ?? 0), 0
    );
  }
  subtotal(it: any): number {
    return (Number(it.precio) + this.adTotal(it)) * Number(it.cantidad ?? 0);
  }
  
  // ===== Confirmar pedido: POST al backend y navegar al detalle =====
  confirmarPedido() {
    this.error = undefined;
    this.loading = true;

    const items = this.cart.items.map(i => ({
      comidaId: i.comidaId,
      cantidad: i.cantidad,
      adicionalIds: i.adicionalIds ?? []
    }));

    const req: CreatePedidoRequest = { items };

    this.http.post<PedidoResponse>('/api/pedidos', req).subscribe({
      next: (resp) => {
        this.loading = false;
        this.cart.clear();
        this.router.navigate(['/pedido', resp.id]);
      },
      error: (e) => {
        this.loading = false;
        this.error = 'No se pudo crear el pedido. Intenta de nuevo.';
        console.error(e);
      }
    });
  }
}
