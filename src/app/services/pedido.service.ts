import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido/pedido.model';
import { CreatePedidoRequest, PedidoResponse } from '../models/carro/carro.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  // 🌐 URL base del backend
  private apiUrl = 'http://localhost:8080/api/pedidos';

  constructor(private http: HttpClient) {}

  /**
   * 🟢 Crear un nuevo pedido
   * POST /api/pedidos
   */
  crearPedido(req: CreatePedidoRequest): Observable<PedidoResponse> {
    return this.http.post<PedidoResponse>(this.apiUrl, req);
  }

  /**
   * 🟠 Obtener todos los pedidos activos
   * GET /api/pedidos
   */
  getPedidosActivos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  /**
   * 🟣 Actualizar el estado de un pedido
   * PUT /api/pedidos/{id}/estado
   */
  actualizarEstado(id: number, nuevoEstado: string): Observable<any> {
    const url = `${this.apiUrl}/${id}/estado`;
    const body = { estado: nuevoEstado };
    return this.http.put(url, body);
  }
}
