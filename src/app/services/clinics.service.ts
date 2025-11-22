import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Clinic } from '../models';

@Injectable({ providedIn: 'root' })
export class ClinicsService {
  private api = inject(ApiService);

  /** Devuelve la lista de consultorios. */
  getAll(): Observable<Clinic[]> {
    // Actualmente carga el JSON local; en producción apuntar a '/clinics' o similar.
    return this.api.get<Clinic[]>('/assets/data/clinics.json');
  }
}
