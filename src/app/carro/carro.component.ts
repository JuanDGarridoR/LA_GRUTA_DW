import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { PedidoService } from '../services/pedido.service';
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
    private pedidoService: PedidoService,
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

  // ===== Confirmar pedido =====
  confirmarPedido() {
    this.error = undefined;
    this.loading = true;

    const storedId = localStorage.getItem('id');
    if (!storedId) {
      this.error = 'No se encontró sesión activa.';
      this.loading = false;
      return;
    }

    const clienteId = Number(storedId);

    const items = this.cart.items.map(i => ({
      comidaId: i.comidaId,
      cantidad: i.cantidad,
      adicionalIds: i.adicionalIds ?? []
    }));

    const req: CreatePedidoRequest = {
      clienteId,
      items
    };

    // 🚀 Ahora usamos el servicio con la URL correcta
    this.pedidoService.crearPedido(req).subscribe({
      next: (resp: PedidoResponse) => {
        this.loading = false;
        this.cart.clear();
        this.router.navigate(['/pedido', resp.id]);
      },
      error: (err) => {
        console.error('❌ Error al crear pedido:', err);
        this.loading = false;
        this.error = 'No se pudo crear el pedido. Intenta de nuevo.';
      }
    });
  }
}
