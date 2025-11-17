export interface Operador {
  id?: number;
  nombre: string;
  user?: {
    id?: number;
    username?: string;
    password?: string;
    roles?: string[];
  };
}
