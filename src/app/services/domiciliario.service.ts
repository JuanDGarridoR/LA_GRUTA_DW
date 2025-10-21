import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Domiciliario } from '../models/domiciliario/domiciliario.model';

@Injectable({
  providedIn: 'root',
})
export class DomiciliarioService {
  private apiUrl = 'http://localhost:8080/api/domiciliarios'; // tu endpoint del back

  constructor(private http: HttpClient) {}

  getAll(): Observable<Domiciliario[]> {
    return this.http.get<Domiciliario[]>(this.apiUrl);
  }

  getById(id: number): Observable<Domiciliario> {
    return this.http.get<Domiciliario>(`${this.apiUrl}/${id}`);
  }

  add(domiciliario: Domiciliario): Observable<Domiciliario> {
    return this.http.post<Domiciliario>(this.apiUrl, domiciliario);
  }

  update(domiciliario: Domiciliario): Observable<Domiciliario> {
    return this.http.put<Domiciliario>(
      `${this.apiUrl}/${domiciliario.id}`,
      domiciliario
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
