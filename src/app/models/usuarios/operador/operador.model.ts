import { User } from '../user/user.model';

export interface Operador {
  id?: number;
  nombre: string;

  // CAMPOS QUE FALTABAN
  apellido: string;
  correo: string;
  telefono?: string;

  // Relación con User
  user: User;
}
