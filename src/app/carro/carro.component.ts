import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { CartService } from '../services/cart.service';
import { PedidoService } from '../services/pedido.service';
import { AutenticacionService } from '../services/autenticacion.service';
import { CartItem, CreatePedidoRequest, PedidoResponse } from '../models/carro/carro.model';

type Adicional = NonNullable<CartItem['adicionales']>[number];

@Component({
  selector: 'app-carro',
  templateUrl: './carro.component.html',
  styleUrls: ['./carro.component.css'],
})
export class CarroComponent implements OnInit {
  loading = false;
  error?: string;
  direccion?: string;
  notas?: string;
  pedidoActual?: PedidoResponse;

  constructor(
    private cart: CartService,
    private pedidoService: PedidoService,
    private router: Router,
    private authService: AutenticacionService
  ) {}

  ngOnInit() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.pedidoService.getCarritoUsuario(userId).subscribe({
        next: (pedido) => {
          if (pedido && (pedido as any).id) {
            this.pedidoActual = pedido;
          } else {
            this.pedidoActual = undefined;
          }
        },
        error: (err) => console.error('Error al obtener carrito:', err),
      });
    }
  }

  get items$() {
    return this.cart.items$;
  }

  inc(i: CartItem) {
    this.cart.updateCantidad(i.comidaId, i.adicionalIds, i.cantidad + 1);
  }

  dec(i: CartItem) {
    this.cart.updateCantidad(i.comidaId, i.adicionalIds, i.cantidad - 1);
  }

  remove(i: CartItem) {
    this.cart.remove(i.comidaId, i.adicionalIds);
  }

  total(): number {
    return this.cart.total();
  }

  count(): number {
    return this.cart.count();
  }

  adNames(it: CartItem): string {
    const ads: ReadonlyArray<Adicional> = it.adicionales ?? [];
    return ads.map(a => a?.nombre ?? '').filter(Boolean).join(', ');
  }

  adTotal(it: CartItem): number {
    const ads: ReadonlyArray<Adicional> = it.adicionales ?? [];
    return ads.reduce((s, a) => s + (a?.precio ?? 0), 0);
  }

  subtotal(it: CartItem): number {
    return (Number(it.precio) + this.adTotal(it)) * Number(it.cantidad ?? 0);
  }

  crearPedido() {
    this.error = undefined;
    this.loading = true;

    const userId = this.authService.getUserId();
    if (!userId) {
      this.error = 'No se encontró sesión activa.';
      this.loading = false;
      return;
    }

    this.cart.items$.pipe(take(1)).subscribe((itemsSnapshot: CartItem[]) => {
      const items = (itemsSnapshot ?? []).map((i) => ({
        comidaId: i.comidaId,
        cantidad: i.cantidad,
        adicionalIds: (i.adicionalIds ?? i.adicionales?.map((a) => a.id) ?? [])
          .filter((id): id is number => id !== undefined),
      }));

      if (items.length === 0) {
        this.error = 'Tu carrito está vacío.';
        this.loading = false;
        return;
      }

      const req: CreatePedidoRequest = {
        clienteId: userId,
        direccion: this.direccion ?? '',
        notas: this.notas ?? '',
        items,
      };

      this.pedidoService.crearPedido(req).subscribe({
        next: (resp: PedidoResponse) => {
          this.loading = false;
          this.pedidoActual = resp;
          alert(`🛒 Pedido #${resp.id} creado. Puedes confirmarlo cuando estés listo.`);
        },
        error: (err) => {
          console.error('Error al crear pedido:', err, err?.error);
          this.loading = false;
          this.error = err?.error?.error || 'No se pudo crear el pedido. Intenta de nuevo.';
        },
      });
    });
  }

  confirmarPedido() {
    this.error = undefined;
    this.loading = true;

    const userId = this.authService.getUserId();
    if (!userId) {
      this.loading = false;
      this.error = 'No se encontró sesión activa.';
      return;
    }

    if (!this.pedidoActual) {
      this.cart.items$.pipe(take(1)).subscribe((itemsSnapshot) => {
        const items = (itemsSnapshot ?? []).map((i) => ({
          comidaId: i.comidaId,
          cantidad: i.cantidad,
          adicionalIds: (i.adicionalIds ?? i.adicionales?.map((a) => a.id) ?? [])
            .filter((id): id is number => id !== undefined),
        }));

        if (items.length === 0) {
          this.loading = false;
          this.error = 'Tu carrito está vacío.';
          return;
        }

        const req: CreatePedidoRequest = {
          clienteId: userId,
          items,
        };

        this.pedidoService.crearPedido(req).subscribe({
          next: (pedido) => {
            this.pedidoActual = pedido;
            this.pedidoService.confirmarPedido(pedido.id).subscribe({
              next: () => {
                this.loading = false;
                alert('✅ Pedido confirmado correctamente.');
                this.cart.clear();
                this.router.navigate(['/mis-pedidos']);
              },
              error: (err) => {
                console.error(err);
                this.loading = false;
                this.error = 'No se pudo confirmar el pedido.';
              },
            });
          },
          error: (err) => {
            console.error('Error creando pedido:', err);
            this.loading = false;
            this.error = 'No se pudo crear el pedido.';
          },
        });
      });
      return;
    }

    this.pedidoService.confirmarPedido(this.pedidoActual.id).subscribe({
      next: () => {
        this.loading = false;
        alert('✅ Pedido confirmado correctamente.');
        this.cart.clear();
        this.router.navigate(['/mis-pedidos']);
      },
      error: (err) => {
        console.error('Error confirmando pedido:', err);
        this.loading = false;
        this.error = 'No se pudo confirmar el pedido.';
      },
    });
  }

  volverAlMenu() {
    this.router.navigate(['/menu']);
  }
}
