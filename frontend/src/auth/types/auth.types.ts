export type UserRole = 'SDR' | 'Closer' | 'Sales Coordinator' | 'Sales Manager' | 'Owner' | 'Admin';

export interface User {
  id: number;
  email: string;
  nome: string;
  role: UserRole;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
