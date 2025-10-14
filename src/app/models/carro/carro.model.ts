// src/app/models/carro.model.ts

// Ítem que el usuario añade al carro (carrito)
export interface CartItem {
  comidaId: number;                     
  nombre: string;                       
  precio: number;                       
  cantidad: number;                     
  image?: string;                       

  // Si manejas adicionales/opciones
  adicionalIds?: number[];              
  adicionales?: Array<{                 
    id: number;
    nombre: string;
    precio?: number;                    
  }>;
}

// Payload para crear un pedido en el backend desde el carro
export interface CreatePedidoRequest {
  clienteId?: number;
  direccion?: string;
  notas?: string;
  items: Array<{
    comidaId: number;
    cantidad: number;
    adicionalIds?: number[];
  }>;
}

// Respuesta estándar del backend al crear/consultar un pedido
export interface PedidoResponse {
  id: number;
  estado: string;                       
  total: number;
  creadoEn: string;                     
  items: Array<{
    pedidoComidaId: number;
    comidaId: number;
    comidaNombre: string;
    cantidad: number;
    adicionales: Array<{
      id: number;
      nombre: string;
      precio?: number;
    }>;
    subtotal: number;
  }>;
}
