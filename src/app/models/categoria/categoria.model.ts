import { Comida } from '../comida/comida.model';
import { Adicional } from '../adicional/adicional.model';

export interface Categoria {
  id?: number;
  nombre: string;
  slug: string;
  descripcion?: string;
  imagen?: string;
  orden?: number;
  activa?: boolean;
  comidas?: Comida[];
  adicionales?: Adicional[];
}

// Datos quemados: categorías
export const CATEGORIAS: Categoria[] = [
  { id: 1, nombre: 'Antipastos', slug: 'antipastos', activa: true, imagen: 'assets/images/Bruschetta.jpg' },
  { id: 2, nombre: 'Pizzas', slug: 'pizzas', activa: true, imagen: 'assets/images/pizzaNera.webp'},
  { id: 3, nombre: 'Pastas', slug: 'pastas', activa: true, imagen: 'assets/images/pasta_carbonara.jpg'},
  { id: 4, nombre: 'Risottos', slug: 'risottos', activa: true, imagen: 'assets/images/pizzaNera.webp' },
  { id: 5, nombre: 'Postres', slug: 'postres', activa: true, imagen: 'assets/images/risotoAlTartufo.avif' },
  { id: 6, nombre: 'Bebidas', slug: 'bebidas', activa: true, imagen: 'assets/images/Bebidas.png' },
];
