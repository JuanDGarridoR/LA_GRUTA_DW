import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adicional } from '../models/adicional/adicional.model';

@Injectable({
  providedIn: 'root'
})
export class AdicionalService {
  private apiUrl = 'http://localhost:8080/api/adicionales';

  constructor(private http: HttpClient) { }

  // READ (Todos): Obtiene todos los adicionales
  getAdicionales(): Observable<Adicional[]> {
    return this.http.get<Adicional[]>(this.apiUrl);
  }

  // READ (Uno): Obtiene un adicional por su ID
  getAdicionalById(id: number): Observable<Adicional> {
    return this.http.get<Adicional>(`${this.apiUrl}/${id}`);
  }

  // CREATE: Crea un nuevo adicional
  crearAdicional(adicional: Adicional): Observable<Adicional> {
    return this.http.post<Adicional>(this.apiUrl, adicional);
  }

  // UPDATE: Actualiza un adicional existente
  actualizarAdicional(id: number, adicional: Adicional): Observable<Adicional> {
    return this.http.put<Adicional>(`${this.apiUrl}/${id}`, adicional);
  }

  // DELETE: Elimina un adicional
  eliminarAdicional(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}