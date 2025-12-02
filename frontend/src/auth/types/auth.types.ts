export type UserRole = 'SDR' | 'Closer' | 'Sales Coordinator' | 'Sales Manager' | 'Owner' | 'Admin';

export interface User {
  id: number;
  email: string;
  nome: string;
  role: UserRole;
  organization_id: number;
  photo?: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}
