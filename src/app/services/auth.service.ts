import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({ providedIn: 'root' })
export class AuthService extends ApiService {
  /**
   * Realiza el login contra el endpoint especificado (por defecto '/auth/login').
   * Espera un objeto de respuesta que contenga `token` o `access_token`.
   * Guarda el token usando `setAuthToken` y devuelve el observable completo.
   */
  login(credentials: Record<string, any>, endpoint = '/auth/login'): Observable<any> {
    return this.post<any>(endpoint, credentials).pipe(
      tap((res) => {
        const token = res?.token ?? res?.access_token ?? null;
        if (token) this.setAuthToken(token);
      })
    );
  }

  /** Elimina el token local (logout). */
  logout() {
    this.setAuthToken(null);
  }

  /** Devuelve el token actual (si existe). */
  getToken(): string | null {
    return this.getAuthToken();
  }
}
