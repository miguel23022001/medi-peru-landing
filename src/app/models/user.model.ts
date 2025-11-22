export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role?: 'admin' | 'user' | 'doctor' | 'clinic';
  avatarUrl?: string;
  createdAt?: string; // ISO date
  updatedAt?: string; // ISO date
}
