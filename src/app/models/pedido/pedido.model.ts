import { Comida } from '../comida/comida.model';
import { User } from '../user/user.model';
import { Domiciliario } from '../domiciliario/domiciliario.model';
import { Adicional } from '../adicional/adicional.model';

// NUEVA INTERFAZ: Representa una línea del pedido
export interface PedidoComida {
  id: number;
  cantidad: number;
  comida: Comida;
  adicionales: Adicional[];
}

// INTERFAZ ACTUALIZADA: Pedido ahora tiene una lista de 'items'
export interface Pedido {
  id: number;
  cliente: User; // Ahora es un objeto User completo
  items: PedidoComida[]; // Antes se llamaba 'comidas' y era una lista simple
  total: number;
  estado: 'recibido' | 'cocinando' | 'enviado' | 'entregado';
  domiciliarioAsignado?: Domiciliario;
  fechaCreacion: string; // Las fechas vienen como string desde el JSON
  fechaEntrega?: string;
}