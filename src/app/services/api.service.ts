import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private baseUrl = '';
  private token: string | null = null;

  /** Establece la URL base para las peticiones (sin barra final). */
  setBaseUrl(url: string) {
    this.baseUrl = url ? url.replace(/\/+$/g, '') : '';
  }

  /** Guarda token para usar en Authorization header. */
  setAuthToken(token: string | null) {
    this.token = token;
    if (token) localStorage.setItem('auth_token', token);
    else localStorage.removeItem('auth_token');
  }

  getAuthToken(): string | null {
    return this.token ?? localStorage.getItem('auth_token');
  }

  private buildHeaders(headers?: Record<string, string>) {
    let h = new HttpHeaders(headers ?? {});
    const t = this.getAuthToken();
    if (t) h = h.set('Authorization', `Bearer ${t}`);
    h = h.set('Accept', 'application/json');
    return h;
  }

  private buildParams(params?: Record<string, any>) {
    if (!params) return undefined;
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([k, v]) => {
      if (v === null || v === undefined) return;
      httpParams = httpParams.set(k, String(v));
    });
    return httpParams;
  }

  private url(path: string) {
    if (!path) return this.baseUrl || '';
    if (/^https?:\/\//.test(path)) return path;
    const b = this.baseUrl || '';
    if (!b) return path;
    return `${b}/${path.replace(/^\/+/, '')}`;
  }

  get<T>(path: string, params?: Record<string, any>, headers?: Record<string, string>): Observable<T> {
    return this.http.get<T>(this.url(path), {
      headers: this.buildHeaders(headers),
      params: this.buildParams(params),
    });
  }

  post<T>(path: string, body: any, headers?: Record<string, string>): Observable<T> {
    return this.http.post<T>(this.url(path), body, { headers: this.buildHeaders(headers) });
  }

  put<T>(path: string, body: any, headers?: Record<string, string>): Observable<T> {
    return this.http.put<T>(this.url(path), body, { headers: this.buildHeaders(headers) });
  }

  delete<T>(path: string, headers?: Record<string, string>): Observable<T> {
    return this.http.delete<T>(this.url(path), { headers: this.buildHeaders(headers) });
  }
}
