import { User } from "../user/user.model";

export interface Operador {
  id?: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono?: string;
  user: User;  // Relación con User
}
