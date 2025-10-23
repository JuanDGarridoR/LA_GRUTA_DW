import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Pedido } from '../models/pedido/pedido.model';
// ⬇️ ojo con la ruta del modelo: está en src/app/models/carro.model.ts
import { CreatePedidoRequest, PedidoResponse } from '../models/carro/carro.model';

@Injectable({ providedIn: 'root' })
export class PedidoService {
  private readonly apiUrl = 'http://localhost:8080/api/pedidos';

  constructor(private http: HttpClient) {}

  // Crear un nuevo pedido (carrito) -> 201 + PedidoResponse
  crearPedido(req: CreatePedidoRequest): Observable<PedidoResponse> {
    return this.http.post<PedidoResponse>(this.apiUrl, req);
  }

  // Obtener pedido por ID (para la confirmación)
  getPedidoPorId(id: number): Observable<PedidoResponse> {
    return this.http.get<PedidoResponse>(`${this.apiUrl}/${id}`);
  }


  // Pedidos activos (admin) -> el back devuelve entidades
  getPedidosActivos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  // Todos los pedidos (admin) -> entidades
  getTodosPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  // Todos los pedidos (incluye finalizados) (admin) -> entidades
  getPedidosAdmin(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/todos`);
  }

  // Carrito activo del usuario -> DTO
  getCarritoUsuario(userId: number): Observable<PedidoResponse> {
    return this.http.get<PedidoResponse>(`${this.apiUrl}/carrito/${userId}`);
  }

  // Actualizar estado (admin) -> el back devuelve entidad actualizada
  actualizarEstado(id: number, nuevoEstado: string): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.apiUrl}/${id}/estado`, { estado: nuevoEstado });
  }

  // Pedidos por USUARIO -> DTOs (¡importante este tipo!)
  getPedidosPorUsuario(userId: number): Observable<PedidoResponse[]> {
    return this.http.get<PedidoResponse[]>(`${this.apiUrl}/usuario/${userId}`);
  }

  confirmarPedido(id: number) {
  return this.http.put(`${this.apiUrl}/${id}/confirmar`, {});
  }


}
