import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comida } from '../models/comida/comida.model';

@Injectable({
  providedIn: 'root'
})
export class ComidaService {

  
  private apiUrl = 'http://localhost:8080/api/comidas';

  constructor(private http: HttpClient) {}

  // --------- GET ALL ---------
  getComidas(): Observable<Comida[]> {
    return this.http.get<Comida[]>(this.apiUrl);
  }

  // --------- GET BY ID ---------
  getComidaById(id: number): Observable<Comida> {
  return this.http.get<Comida>(`${this.apiUrl}/${id}`);
  }

  getByCategoria(id: number): Observable<Comida[]> {
  return this.http.get<Comida[]>(`${this.apiUrl}/categoria/${id}`);
}


  // --------- CREATE ---------
  createComida(comida: Comida): Observable<Comida> {
    return this.http.post<Comida>(this.apiUrl, comida);
  }

  // --------- UPDATE ---------
  updateComida(id: number, comida: Comida): Observable<Comida> {
    return this.http.put<Comida>(`${this.apiUrl}/${id}`, comida);
  }

  // --------- DELETE ---------
  deleteComida(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
