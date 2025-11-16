import { User } from "../user/user.model";

export interface Cliente {
  id?: number;
  
  user: User;

  nombre: string;
  apellido: string;
  correo: string;
  telefono?: string;
  direccion?: string;
}
