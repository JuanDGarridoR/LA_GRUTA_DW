import { Comida } from '../comida/comida.model';
import { User } from '../user/user.model';
import { Domiciliario } from '../domiciliario/domiciliario.model';
import { Adicional } from '../adicional/adicional.model';

// ===============================================================
// ENTIDADES PRINCIPALES
// ===============================================================

// Representa una línea del pedido (detalle del carrito o pedido)
export interface PedidoComida {
  id: number;
  cantidad: number;
  comida: Comida;
  adicionales: Adicional[];
}

// Pedido completo, con cliente, estado y detalles
export interface Pedido {
  id: number;
  user: User; // ✅ coincide con backend
  items: PedidoComida[];
  total: number;
  estado: string; // ⚡ ahora flexible
  domiciliarioAsignado?: Domiciliario;
  creadoEn: string; // ✅ coincide con backend
  fechaEntrega?: string;
}

// ===============================================================
// DTOs usados para comunicación con el backend
// ===============================================================

// Solicitud para crear un nuevo pedido (carrito)
export interface CreatePedidoRequest {
  userId: number; // ✅ igual que backend
  direccion?: string;
  notas?: string;
  items: {
    comidaId: number;
    cantidad: number;
    adicionalIds?: number[];
  }[];
}

// Respuesta devuelta por el backend después de crear o consultar pedido
export interface PedidoResponse {
  id: number;
  estado: string;
  total: number;
  creadoEn: string;
  items: {
    pedidoComidaId: number;
    comidaId: number;
    comidaNombre: string;
    cantidad: number;
    adicionales: {
      id: number;
      nombre: string;
      precio: number;
    }[];
    subtotal: number;
  }[];
}
