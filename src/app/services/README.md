Uso del servicio `ApiService`

- `setBaseUrl(url: string)`: establece la URL base para las peticiones.
- `setAuthToken(token: string | null)`: guarda o elimina el token (se persiste en `localStorage`).
- `get<T>(path, params?, headers?)`: petición GET que devuelve `Observable<T>`.
- `post`, `put`, `delete`: métodos equivalentes para POST/PUT/DELETE.

Ejemplo rápido (en un componente):

```
import { ApiService } from '../services/api.service';

constructor(private api: ApiService) {
  this.api.setBaseUrl('https://api.example.com');
  this.api.get('/clinics').subscribe(data => console.log(data));
}
```

Notas:
- Si `path` es una URL absoluta (`https://...`), se usará tal cual.
- El servicio añade `Accept: application/json` y `Authorization: Bearer <token>` si existe.

Autenticación con `AuthService`:

- `login(credentials, endpoint?)`: intenta autenticar en `endpoint` (por defecto `/auth/login`). Si la respuesta contiene `token` o `access_token` lo guarda.
- `logout()`: elimina el token local.
- `getToken()`: devuelve el token actual (o `null`).

Ejemplo de uso de `AuthService` en un componente:

```
import { AuthService } from '../services/auth.service';

constructor(private auth: AuthService) {
  // opcional: establecer base url para el ApiService heredado
  this.auth.setBaseUrl('https://api.example.com');
}

onLogin() {
  this.auth.login({ email: 'a@b.com', password: 'secreto' })
    .subscribe({ next: res => console.log('logged', res), error: err => console.error(err) });
}
```

