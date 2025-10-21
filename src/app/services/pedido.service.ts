import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido/pedido.model';
import { CreatePedidoRequest, PedidoResponse } from '../models/carro/carro.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private readonly apiUrl = 'http://localhost:8080/api/pedidos';

  constructor(private http: HttpClient) {}

  // ========================================================
  // Crear un nuevo pedido (carrito)
  // ========================================================
  crearPedido(req: CreatePedidoRequest): Observable<PedidoResponse> {
    return this.http.post<PedidoResponse>(this.apiUrl, req);
  }

  // ========================================================
  // Obtener los pedidos activos
  // ========================================================
  getPedidosActivos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  // ========================================================
  // Obtener todos los pedidos (activos + completados)
  // ========================================================
  getTodosPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  // ========================================================
  // Obtener todos los pedidos incluyendo los finalizados (para admin)
  // ========================================================
  getPedidosAdmin(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/todos`);
  }

  // ========================================================
  // Obtener el carrito actual de un usuario específico
  // ========================================================
  getCarritoUsuario(userId: number): Observable<PedidoResponse> {
    return this.http.get<PedidoResponse>(`${this.apiUrl}/carrito/${userId}`);
  }

  // ========================================================
  // Actualizar el estado de un pedido
  // ========================================================
  actualizarEstado(id: number, nuevoEstado: string): Observable<any> {
    const url = `${this.apiUrl}/${id}/estado`;
    const body = { estado: nuevoEstado };
    return this.http.put(url, body);
  }

  // ========================================================
  // Obtener pedidos por USUARIO (reemplaza al viejo '/cliente/{id}')
  // ========================================================
  getPedidosPorUsuario(userId: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/usuario/${userId}`);
  }
}
