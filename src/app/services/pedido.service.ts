import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido/pedido.model'; // Asegúrate de que la ruta a tu modelo sea correcta

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  // La URL base de tu API de Spring Boot
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
   * @param id El ID del pedido a actualizar.
   * @param nuevoEstado El nuevo estado ('cocinando', 'enviado', etc.).
   */
  actualizarEstado(id: number, nuevoEstado: string): Observable<any> {
    const url = `${this.apiUrl}/${id}/estado`;
    const body = { estado: nuevoEstado };
    return this.http.put(url, body);
  }
}