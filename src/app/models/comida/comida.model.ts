import { Categoria, CATEGORIAS } from '../categoria/categoria.model';
import { Adicional } from '../adicional/adicional.model';
import { User } from '../user/user.model';

export interface Comida {
  id?: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  imagen?: string;
  categoria?: Categoria;
  disponible?: boolean;
  tiempoPreparacion?: number;
  esEspecialidad?: boolean;
  ingredientes?: string;
  user?: User;
  adicionales?: Adicional[];
  cantidad?: number; // Para UI
}

// Datos quemados: comidas
export const COMIDAS: Comida[] = [
  // ANTIPASTOS
  { id: 1, nombre: 'Bruschetta Italiana', descripcion: 'Pan tostado con tomate fresco, albahaca, ajo y aceite de oliva extra virgen', precio: 15900, categoria: CATEGORIAS[0], imagen: 'assets/images/Bruschetta.jpg', tiempoPreparacion: 10, ingredientes: 'Pan, tomate, albahaca, ajo, aceite de oliva' },
  { id: 2, nombre: 'Carpaccio di Manzo', descripcion: 'Finas láminas de carne de res con rúcula, parmesano y aceite de oliva', precio: 28900, categoria: CATEGORIAS[0], imagen: 'assets/images/carpaccio-di-manzo.jpg', tiempoPreparacion: 15, esEspecialidad: true },
  { id: 3, nombre: 'Aceitunas Italianas', descripcion: 'Mezcla de aceitunas verdes y negras marinadas con hierbas', precio: 13900, categoria: CATEGORIAS[0], imagen: 'assets/images/aceitunas.jpg', tiempoPreparacion: 8 },
  { id: 4, nombre: 'Funghi Trifolati', descripcion: 'Champiñones salteados con ajo, aceite de oliva y perejil', precio: 25900, categoria: CATEGORIAS[0], imagen: 'assets/images/funghi-trifolati.jpg', tiempoPreparacion: 15 },

  // PIZZAS
  { id: 5, nombre: 'Pizza Margherita', descripcion: 'Salsa de tomate, mozzarella fresca, albahaca y aceite de oliva', precio: 24900, categoria: CATEGORIAS[1], imagen: 'assets/images/Margherita-Pizza-093.webp', tiempoPreparacion: 20 },
  { id: 6, nombre: 'Pizza Nera', descripcion: 'Masa negra con calamares, gamberi y salsa especial', precio: 35900, categoria: CATEGORIAS[1], imagen: 'assets/images/pizzaNera.webp', tiempoPreparacion: 25, esEspecialidad: true },
  { id: 7, nombre: 'Pizza Pepperoni', descripcion: 'Salsa de tomate, mozzarella y pepperoni italiano', precio: 27900, categoria: CATEGORIAS[1], imagen: 'assets/images/Pizza Pepperoni.jpg', tiempoPreparacion: 20 },
  { id: 8, nombre: 'Pizza Vegetariana', descripcion: 'Mozzarella, pimientos, champiñones y aceitunas', precio: 31900, categoria: CATEGORIAS[1], imagen: 'assets/images/pizzavegetariana.jpeg', tiempoPreparacion: 22 },
  { id: 9, nombre: 'Quattro Formaggi', descripcion: 'Pizza con mozzarella, gorgonzola, parmesano y provolone', precio: 32900, categoria: CATEGORIAS[1], imagen: 'assets/images/quattroformaggi.jpeg', tiempoPreparacion: 22 },
  { id: 10, nombre: 'Pizza Diavola', descripcion: 'Salsa de tomate, mozzarella y salami picante', precio: 27900, categoria: CATEGORIAS[1], imagen: 'assets/images/pizzadiavola.webp', tiempoPreparacion: 20 },

  // PASTAS
  { id: 11, nombre: 'Pasta Carbonara', descripcion: 'Espaguetis con panceta, huevo, parmesano y pimienta negra', precio: 26900, categoria: CATEGORIAS[2], imagen: 'assets/images/pasta_carbonara.jpg', tiempoPreparacion: 18 },
  { id: 12, nombre: 'Pasta Bolognesa', descripcion: 'Tagliatelle con salsa bolognesa tradicional de carne', precio: 24900, categoria: CATEGORIAS[2], imagen: 'assets/images/PastaBolognesa.jpg', tiempoPreparacion: 22 },
  { id: 13, nombre: 'Fettuccine Alfredo', descripcion: 'Fettuccine con salsa cremosa de mantequilla y parmesano', precio: 23900, categoria: CATEGORIAS[2], imagen: 'assets/images/1504715566-delish-fettuccine-alfredo.jpg', tiempoPreparacion: 16 },
  { id: 14, nombre: 'Ravioli Ricotta', descripcion: 'Ravioli rellenos de ricotta con salsa de mantequilla y salvia', precio: 21900, categoria: CATEGORIAS[2], imagen: 'assets/images/48a7694be18e-rollo-espaguetis-age-z.avif', tiempoPreparacion: 17 },
  { id: 15, nombre: 'Penne Arrabbiata', descripcion: 'Penne con salsa picante de tomate y ajo', precio: 25900, categoria: CATEGORIAS[2], imagen: 'assets/images/pasta_carbonara.jpg', tiempoPreparacion: 20 },
  { id: 16, nombre: 'Pasta Pesto', descripcion: 'Pasta con salsa pesto de albahaca y piñones', precio: 29900, categoria: CATEGORIAS[2], imagen: 'assets/images/pasta pesto.webp', tiempoPreparacion: 25 },

  // RISOTTOS
  { id: 17, nombre: 'Risotto al Tartufo', descripcion: 'Risotto cremoso con trufa negra y parmesano', precio: 38900, categoria: CATEGORIAS[3], imagen: 'assets/images/risotoAlTartufo.avif', tiempoPreparacion: 25, esEspecialidad: true },
  { id: 18, nombre: 'Risotto ai Funghi', descripcion: 'Risotto con mezcla de hongos porcini y champiñones', precio: 29900, categoria: CATEGORIAS[3], imagen: 'assets/images/risotofungui.png', tiempoPreparacion: 22 },
  { id: 19, nombre: 'Risotto di Zucca', descripcion: 'Risotto cremoso con calabaza asada y parmesano', precio: 31900, categoria: CATEGORIAS[3], imagen: 'assets/images/risoto calabaza.jpeg', tiempoPreparacion: 24 },
  { id: 20, nombre: 'Risotto al Limone', descripcion: 'Risotto con limón y hierbas frescas', precio: 36900, categoria: CATEGORIAS[3], imagen: 'assets/images/risoto limone.jpeg', tiempoPreparacion: 26 },
  { id: 21, nombre: 'Risotto di Mare', descripcion: 'Risotto con mariscos frescos y salsa ligera', precio: 30900, categoria: CATEGORIAS[3], imagen: 'assets/images/risoto mar.jpeg', tiempoPreparacion: 22 },
  { id: 22, nombre: 'Risotto al Pesto', descripcion: 'Risotto con salsa pesto y queso parmesano', precio: 28900, categoria: CATEGORIAS[3], imagen: 'assets/images/risoto pesto.jpeg', tiempoPreparacion: 20 },

  // POSTRES
  { id: 23, nombre: 'Tiramisu', descripcion: 'Postre tradicional italiano con café, mascarpone y cacao', precio: 16900, categoria: CATEGORIAS[4], imagen: 'assets/images/tiramisu.jpg', tiempoPreparacion: 5 },
  { id: 24, nombre: 'Cannoli Siciliani', descripcion: 'Tubitos crujientes rellenos de ricotta y pistachos', precio: 14900, categoria: CATEGORIAS[4], imagen: 'assets/images/Cannoli Siciliani.jpg', tiempoPreparacion: 8 },
  { id: 25, nombre: 'Panna Cotta', descripcion: 'Postre cremoso de vainilla con coulis de frutos rojos', precio: 12900, categoria: CATEGORIAS[4], imagen: 'assets/images/canoli.webp', tiempoPreparacion: 6 },
  { id: 26, nombre: 'Profiteroles', descripcion: 'Bollitos rellenos de crema y bañados en chocolate', precio: 11900, categoria: CATEGORIAS[4], imagen: 'assets/images/profiteroles.webp', tiempoPreparacion: 5 },
  { id: 27, nombre: 'Panna Cotta Vegana', descripcion: 'Postre ligero y cremoso, sin lácteos', precio: 14900, categoria: CATEGORIAS[4], imagen: 'assets/images/creamy-vegan-panna-cotta-dairy-free-fresh-and-light-dessert-thumb-12.jpg', tiempoPreparacion: 7 },
  { id: 28, nombre: 'Torta della Nonna', descripcion: 'Tarta con crema pastelera y piñones', precio: 13900, categoria: CATEGORIAS[4], imagen: 'assets/images/torta della nonna.webp', tiempoPreparacion: 10 },
  { id: 29, nombre: 'Focaccia Dulce', descripcion: 'Pan dulce italiano con azúcar y frutas', precio: 5900, categoria: CATEGORIAS[4], imagen: 'assets/images/focatia.jpeg', tiempoPreparacion: 1 },

  // BEBIDAS
  { id: 30, nombre: 'Vino Tinto Reservado', descripcion: 'Vino tinto italiano de la casa', precio: 45900, categoria: CATEGORIAS[5], imagen: 'assets/images/5435_Vino_Tinto_Reservado0.jpg', tiempoPreparacion: 2 },
  { id: 31, nombre: 'Agua con Gas', descripcion: 'Agua mineral con gas San Pellegrino', precio: 6900, categoria: CATEGORIAS[5], imagen: 'assets/images/agua con gas.jpg', tiempoPreparacion: 1 },
  { id: 32, nombre: 'Agua sin Gas', descripcion: 'Agua mineral natural', precio: 4300, categoria: CATEGORIAS[5], imagen: 'assets/images/agua sin gas.webp', tiempoPreparacion: 2 },
  { id: 33, nombre: 'Café Espresso', descripcion: 'Café italiano intenso', precio: 5900, categoria: CATEGORIAS[5], imagen: 'assets/images/cafe expresso.webp', tiempoPreparacion: 3 },
  { id: 34, nombre: 'Cerveza Artesanal', descripcion: 'Cerveza artesanal espumosa y refrescante', precio: 8900, categoria: CATEGORIAS[5], imagen: 'assets/images/cerveza artesanala.webp', tiempoPreparacion: 4 },
  { id: 35, nombre: 'Coctel Frutos Rojos', descripcion: 'Cóctel con frutos rojos y limón', precio: 11900, categoria: CATEGORIAS[5], imagen: 'assets/images/Bebidas.png', tiempoPreparacion: 3 },
  { id: 36, nombre: 'Vino Blanco', descripcion: 'Vino blanco italiano, fresco y afrutado', precio: 45900, categoria: CATEGORIAS[5], imagen: 'assets/images/vino blanco.webp', tiempoPreparacion: 2 },
];
