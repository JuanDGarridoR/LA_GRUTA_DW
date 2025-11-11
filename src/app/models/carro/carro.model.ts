// src/app/models/carro/carro.model.ts
import { Adicional } from '../adicional/adicional.model';

// ---------------------------------------
// Tipos reutilizables
// ---------------------------------------
export type PedidoEstado =
  | 'EN_PROCESO'
  | 'recibido'
  | 'cocinando'
  | 'enviado'
  | 'entregado'
  | string; // permite valores futuros sin romper el tipado

// ---------------------------------------
// Carrito (front)
// ---------------------------------------
export interface CartItem {
  comidaId: number;   // ID de la comida seleccionada
  nombre: string;     // Nombre de la comida
  precio: number;     // Precio base de la comida
  cantidad: number;   // Cantidad seleccionada
  image?: string;     // Imagen opcional de la comida

  // Adicionales u opciones extra del plato
  adicionalIds?: number[];
  adicionales?: Adicional[];
}

// ---------------------------------------
// Crear pedido (request al backend)
// ---------------------------------------
export interface CreatePedidoItem {
  comidaId: number;
  cantidad: number;
  adicionalIds?: number[];
}

export interface CreatePedidoRequest {
  clienteId: number;   // antes: userId
  direccion?: string;
  notas?: string;
  items: CreatePedidoItem[];
}

// ---------------------------------------
// Respuestas del backend (DTOs)
// ---------------------------------------
export interface PedidoItemResponse {
  pedidoComidaId: number;
  comidaId: number;
  comidaNombre: string;
  cantidad: number;
  adicionales: Adicional[];
  subtotal: number; // subtotal del ítem (incluye adicionales)
}

export interface PedidoResponse {
  id: number;                 // ID del pedido generado
  estado: PedidoEstado;       // Estado actual
  total: number;              // Total calculado del pedido
  creadoEn: string;           // ISO string de fecha de creación
  fechaEntrega?: string;      // ISO string (si ya fue entregado)
  items: PedidoItemResponse[]; // Detalle de los ítems
}
