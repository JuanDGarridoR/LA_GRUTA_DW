import { Component, OnInit } from '@angular/core';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/pedido/pedido.model';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  cargando = true;

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.pedidoService.getPedidosAdmin().subscribe({
      next: (data) => {
        this.pedidos = data; // ✅ muestra todos los pedidos
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar pedidos:', err);
        this.cargando = false;
      }
    });
  }
  

  actualizarEstado(id: number, nuevoEstado: string): void {
    this.pedidoService.actualizarEstado(id, nuevoEstado).subscribe(() => {
      this.cargarPedidos();
    });
  }
}
