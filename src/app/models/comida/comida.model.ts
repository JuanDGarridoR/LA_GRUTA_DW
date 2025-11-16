import { Categoria } from '../categoria/categoria.model';
import { Adicional } from '../adicional/adicional.model';
import { User } from '../usuarios/user/user.model';

// Interfaz Comida (alineada con el backend Spring Boot)
export interface Comida {
  id?: number;                // ID autogenerado en la BD
  nombre: string;             // Nombre de la comida
  descripcion?: string;       // Descripción larga (opcional)
  precio: number;             // Precio de la comida
  imagen?: string;            // URL o path de imagen
  categoria?: Categoria;      // Relación con categoría
  disponible?: boolean;       // true / false
  tiempoPreparacion?: number; // en minutos
  esEspecialidad?: boolean;   // true / false
  ingredientes?: string;      // Ingredientes
  user?: User;                // Relación con usuario
  adicionales?: Adicional[];  // ManyToMany con adicionales
  cantidad?: number;          // ⚡ solo frontend (ej. carrito)
}
