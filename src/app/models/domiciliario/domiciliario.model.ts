export interface Domiciliario {
  id?: number;
  nombre: string;
  correo: string;
  telefono: string;
  vehiculo: string;
  placa?: string;
  disponible: boolean;
  zonaCobertura?: string;
}
