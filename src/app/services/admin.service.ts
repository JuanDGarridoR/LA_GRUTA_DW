import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../models/usuarios/admin/admin.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'http://localhost:8080/api/admins';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.apiUrl);
  }

  getById(id: number): Observable<Admin> {
    return this.http.get<Admin>(`${this.apiUrl}/${id}`);
  }

  create(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(this.apiUrl, admin);
  }

  update(id: number, admin: Admin): Observable<Admin> {
    return this.http.put<Admin>(`${this.apiUrl}/${id}`, admin);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
