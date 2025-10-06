// src/app/models/user/user.model.ts

import { Comida } from '../comida/comida.model';

export class User {
  id: number | undefined;
  username: string | undefined;
  password: string | undefined;
  role: string | undefined;
  direccion?: string;
  telefono?: string;
  comidas?: Comida[];
}
