import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido/pedido.model';
import { CreatePedidoRequest, PedidoResponse } from '../models/carro/carro.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost:8080/api/pedidos';

  constructor(private http: HttpClient) {}

  // 🟢 Crear un nuevo pedido
  crearPedido(req: CreatePedidoRequest): Observable<PedidoResponse> {
    return this.http.post<PedidoResponse>(this.apiUrl, req);
  }

  // 🟠 Obtener solo los pedidos activos
  getPedidosActivos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }
  

  // 🔵 Obtener todos los pedidos (activos + completados)
  getTodosPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }


// 🔵 Obtener todos los pedidos incluyendo los finalizados
getPedidosAdmin(): Observable<Pedido[]> {
  return this.http.get<Pedido[]>(`${this.apiUrl}/todos`);
}


  // 🟣 Actualizar el estado de un pedido


  actualizarEstado(id: number, nuevoEstado: string): Observable<any> {
    const url = `${this.apiUrl}/${id}/estado`;
    const body = { estado: nuevoEstado };
    return this.http.put(url, body); // ✅ devolver el Observable
  }
  
  
}
