import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../services/pedido.service';          // ajusta la ruta si tu services/ está en otro lugar
import { Pedido } from '../models/pedido/pedido.model';              // si tu modelo difiere, puedes cambiar a any[]

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.component.html',
  styleUrls: ['./mis-pedidos.component.css']
})
export class MisPedidosComponent implements OnInit {

  pedidos: Pedido[] = [];           // <- lo usa el HTML
  loading = false;
  error: string | null = null;

  constructor(private pedidoSvc: PedidoService) {}

  ngOnInit(): void {
    this.cargarMisPedidos();
  }

  cargarMisPedidos(): void {
    this.loading = true;

    // Obtén el id del usuario desde donde lo tengas (AuthService/localStorage/route params, etc.)
    const userIdRaw = localStorage.getItem('userId');
    const userId = userIdRaw ? Number(userIdRaw) : NaN;

    if (Number.isNaN(userId)) {
      this.error = 'No se encontró el usuario autenticado.';
      this.loading = false;
      return;
    }

    this.pedidoSvc.getPedidosPorUsuario(userId).subscribe({
      next: (data) => {
        this.pedidos = data ?? [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando pedidos', err);
        this.error = 'No se pudieron cargar tus pedidos.';
        this.loading = false;
      }
    });
  }

  // --- helpers usados por la plantilla ---

  /** Devuelve el arreglo de ítems del pedido sin importar cómo vengan nombrados en el modelo */
  itemsDe(pedido: any): any[] {
    return (
      pedido?.items ??
      pedido?.detalle ??
      pedido?.detalles ??
      pedido?.lineas ??
      []
    );
  }

  /** Subtotal de un ítem = precio unitario * cantidad (con llaves tolerantes a distintos nombres) */
  subtotalItem(item: any): number {
    const precio = Number(item?.precio ?? item?.precioUnitario ?? item?.valorUnitario ?? 0);
    const cantidad = Number(item?.cantidad ?? item?.qty ?? item?.cant ?? 1);
    return precio * cantidad;
  }

  /** Total del pedido sumando subtotales de sus ítems */
  calcularTotalDesdeItems(pedido: any): number {
    return this.itemsDe(pedido).reduce(
      (acc: number, it: any) => acc + this.subtotalItem(it),
      0
    );
  }

  /** Para *ngFor trackBy (opcional, mejora rendimiento) */
  trackByPedidoId = (_: number, p: any) => p?.id ?? p?.pedidoId ?? _;
}
