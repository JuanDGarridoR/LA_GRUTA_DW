// src/app/models/user/user.model.ts

import { Comida } from '../comida/comida.model';

export interface User {
  id?: number;
  username: string;
  password: string;
  role?: string;
  direccion?: string;
  telefono?: string;
  comidas?: Comida[];
}
