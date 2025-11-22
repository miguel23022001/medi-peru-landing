export interface Clinic {
  id: string;
  name: string;
  description?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  location?: { lat: number; lng: number };
  doctors?: Array<{ name: string; specialty?: string; phone?: string }>;
  services?: string[];
  specialties?: string[];
  openingHours?: Record<string, string>; // e.g. { mon: '09:00-18:00' }
  createdAt?: string;
  updatedAt?: string;
}
