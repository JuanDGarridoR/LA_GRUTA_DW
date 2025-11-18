import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Operador } from '../models/usuarios/operador/operador.model';

@Injectable({
  providedIn: 'root',
})
export class OperadorService {

  private apiUrl = 'http://localhost:8080/api/operadores';

  constructor(private http: HttpClient) {}

  // 🔹 GET ALL
  getAll(): Observable<Operador[]> {
    return this.http.get<Operador[]>(this.apiUrl);
  }

  // 🔹 GET BY ID
  getById(id: number): Observable<Operador> {
    return this.http.get<Operador>(`${this.apiUrl}/${id}`);
  }

  // 🔹 CREATE
  create(operador: Operador): Observable<Operador> {
    return this.http.post<Operador>(this.apiUrl, operador);
  }

  // 🔹 UPDATE
  update(operador: Operador): Observable<Operador> {
    return this.http.put<Operador>(`${this.apiUrl}/${operador.id}`, operador);
  }

  // 🔹 DELETE
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
