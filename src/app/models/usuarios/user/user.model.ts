import { Role } from "../../role/role.model";

export interface User {
  id?: number;
  username: string;
  password?: string;
  // roles vienen como array de strings desde el backend (ej: ["ADMIN"])
  roles: Role[];
}
