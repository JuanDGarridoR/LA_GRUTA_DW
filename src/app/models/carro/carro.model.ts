// src/app/models/carro.model.ts

// Ítem que el usuario añade al carrito
export interface CartItem {
  comidaId: number;                     // ID de la comida seleccionada
  nombre: string;                       // Nombre de la comida
  precio: number;                       // Precio base de la comida
  cantidad: number;                     // Cantidad seleccionada
  image?: string;                       // Imagen opcional de la comida

  // Adicionales u opciones extra del plato
  adicionalIds?: number[];              
  adicionales?: Array<{                 
    id: number;
    nombre: string;
    precio?: number;                    
  }>;
}

// Payload para crear un pedido en el backend
export interface CreatePedidoRequest {
  userId: number; // debe coincidir con el backend
  direccion?: string;
  notas?: string;
  items: Array<{
    comidaId: number;
    cantidad: number;
    adicionalIds?: number[];
  }>;
}



// Respuesta estándar del backend al crear o consultar un pedido
export interface PedidoResponse {
  id: number;                           // ID del pedido generado
  estado: string;                       // Estado actual del pedido (Ej: "EN_PROCESO", "ENTREGADO")
  total: number;                        // Total calculado del pedido
  creadoEn: string;                     // Fecha de creación del pedido
  items: Array<{                        // Detalle de los ítems del pedido
    pedidoComidaId: number;
    comidaId: number;
    comidaNombre: string;
    cantidad: number;
    adicionales: Array<{                // Adicionales elegidos
      id: number;
      nombre: string;
      precio?: number;
    }>;
    subtotal: number;                   // Subtotal de ese ítem
  }>;
}
