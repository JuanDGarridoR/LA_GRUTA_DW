import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido/pedido.model'; // Asegúrate que la ruta a tu modelo sea correcta

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost:8080/api/pedidos';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los pedidos activos desde el backend.
   * Llama a: GET /api/pedidos
   */
  getPedidosActivos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  /**
   * Actualiza el estado de un pedido específico.
   * Llama a: PUT /api/pedidos/{id}/estado
   */
  actualizarEstado(id: number, nuevoEstado: string): Observable<any> {
    const url = `${this.apiUrl}/${id}/estado`;
    const body = { estado: nuevoEstado };
    return this.http.put(url, body);
  }
}