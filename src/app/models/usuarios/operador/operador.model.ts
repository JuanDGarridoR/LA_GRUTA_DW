import { User } from "../user/user.model";

export interface Operador {
  id?: number;
  
  user?: User; // si en el futuro conectas operador con user

  nombre: string;
  usuario: string;
  password: string;
}
