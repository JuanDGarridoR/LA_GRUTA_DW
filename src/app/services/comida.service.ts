import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comida } from '../models/comida/comida.model';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {

  private apiUrl = 'http://localhost:8080/api/comidas';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
  }

  // GET ALL (si deben ser públicos, usa this.http.get sin headers)
  getComidas(): Observable<Comida[]> {
    return this.http.get<Comida[]>(this.apiUrl);
  }

  getComidaById(id: number): Observable<Comida> {
    return this.http.get<Comida>(`${this.apiUrl}/${id}`);
  }

  getByCategoria(id: number): Observable<Comida[]> {
    return this.http.get<Comida[]>(`${this.apiUrl}/categoria/${id}`);
  }

  // CREATE
  createComida(comida: Comida): Observable<Comida> {
    return this.http.post<Comida>(this.apiUrl, comida, this.getAuthHeaders());
  }

  // UPDATE
  updateComida(id: number, comida: Comida): Observable<Comida> {
    return this.http.put<Comida>(`${this.apiUrl}/${id}`, comida, this.getAuthHeaders());
  }

  // DELETE
  deleteComida(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }
}
