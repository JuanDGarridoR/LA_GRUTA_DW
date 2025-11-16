import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/usuarios/user/user.model';
import { Cliente } from '../models/usuarios/cliente/cliente.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  // 🔹 GET ALL
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // 🔹 GET BY ID
  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // 🔹 CREATE (solo User simple)
  add(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  // 🔹 REGISTER CLIENTE (User + Cliente)
  registerCliente(cliente: Cliente): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register-cliente`, cliente);
  }

  // 🔹 UPDATE USER
  update(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  // 🔹 DELETE USER
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
