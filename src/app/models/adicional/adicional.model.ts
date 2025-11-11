// src/app/models/adicional/adicional.model.ts
import { Categoria } from '../categoria/categoria.model';
import { Comida } from '../comida/comida.model';

export interface Adicional {
  id?: number;               // opcional para nuevos registros
  nombre: string;
  descripcion?: string;
  precio?: number | null;    // el back puede enviarlo null u omitirlo
  imagen?: string;
  disponible?: boolean;
  tipo?: string;
  categorias?: Categoria[];
  comidas?: Comida[];
}
