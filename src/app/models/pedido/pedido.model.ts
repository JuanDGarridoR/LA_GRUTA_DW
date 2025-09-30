import { Comida } from '../comida/comida.model';
import { Domiciliario } from '../domiciliario/domiciliario.model';

export interface Pedido {
  id: number;
  cliente: string;
  comidas: Comida[];
  total: number;
  estado: 'recibido' | 'cocinando' | 'enviado' | 'entregado';
  domiciliarioAsignado?: Domiciliario; 
}