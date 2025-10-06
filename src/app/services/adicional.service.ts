
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Adicional } from '../models/adicional/adicional.model';

@Injectable({
  providedIn: 'root'
})
export class AdicionalService {
  private apiUrl = 'http://localhost:8080/api/adicionales'; // Cambia según tu backend

  constructor(private http: HttpClient) {}

  // Obtener todos los adicionales
  getAll(): Observable<Adicional[]> {
    return this.http.get<Adicional[]>(this.apiUrl);
  }

  // Obtener un adicional por ID
  obtenerAdicionalPorId(id: number): Observable<Adicional> {
    return this.http.get<Adicional>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo adicional
  crearAdicional(adicional: Adicional): Observable<Adicional> {
    return this.http.post<Adicional>(this.apiUrl, adicional);
  }

  // Actualizar un adicional existente
  actualizarAdicional(id: number, adicional: Adicional): Observable<Adicional> {
    return this.http.put<Adicional>(`${this.apiUrl}/${id}`, adicional);
  }

  // Eliminar un adicional
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Alias (si el componente usa eliminarAdicional)
  eliminarAdicional(id: number): Observable<void> {
    return this.delete(id);
  }
}

