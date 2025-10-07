import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AdicionalCategoria {
  id?: number;
  adicional: { id: number };
  categoria: { id: number };
  activa: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AdicionalCategoriaService {
  private apiUrl = 'http://localhost:8080/api/adicional-categoria';

  constructor(private http: HttpClient) {}

  getAll(): Observable<AdicionalCategoria[]> {
    return this.http.get<AdicionalCategoria[]>(this.apiUrl);
  }

  getByAdicional(id: number): Observable<AdicionalCategoria[]> {
    return this.http.get<AdicionalCategoria[]>(`${this.apiUrl}/adicional/${id}`);
  }

  create(relacion: AdicionalCategoria): Observable<AdicionalCategoria> {
    return this.http.post<AdicionalCategoria>(this.apiUrl, relacion);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
}
