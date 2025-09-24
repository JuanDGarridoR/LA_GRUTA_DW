// src/app/models/adicional/adicional.model.ts

import { Categoria } from '../categoria/categoria.model';
import { Comida } from '../comida/comida.model';

export interface Adicional {
  id?: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  imagen?: string;
  disponible?: boolean;
  tipo?: string;
  categorias?: Categoria[];
  comidas?: Comida[];
}
