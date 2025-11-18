import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Domiciliario } from '../models/domiciliario/domiciliario.model';

@Injectable({
  providedIn: 'root'
})
export class DomiciliarioService {

  private apiUrl = 'http://localhost:8080/api/domiciliarios';

  constructor(private http: HttpClient) {}

  // Obtener todos los domiciliarios
  getAll(): Observable<Domiciliario[]> {
    return this.http.get<Domiciliario[]>(this.apiUrl);
  }

  // Obtener domiciliario por ID
  getById(id: number): Observable<Domiciliario> {
    return this.http.get<Domiciliario>(`${this.apiUrl}/${id}`);
  }

  // Agregar domiciliario
  add(domiciliario: Domiciliario): Observable<{ mensaje: string }> {
    return this.http.post<{ mensaje: string }>(this.apiUrl, domiciliario);
  }

  // Actualizar domiciliario
  update(domiciliario: Domiciliario): Observable<{ mensaje: string }> {
    return this.http.put<{ mensaje: string }>(`${this.apiUrl}/${domiciliario.id}`, domiciliario);
  }

  // Eliminar domiciliario
  delete(id: number): Observable<{ mensaje: string }> {
    return this.http.delete<{ mensaje: string }>(`${this.apiUrl}/${id}`);
  }
}
