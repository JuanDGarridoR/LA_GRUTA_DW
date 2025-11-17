import { User } from "../user/user.model";

export interface Admin {
  id?: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono?: string;
  direccion?: string;
  user: User;   // Relación
}
