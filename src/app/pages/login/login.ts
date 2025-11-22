import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  email = signal('');
  password = signal('');
  loading = signal(false);
  error = signal<string | null>(null);

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    this.error.set(null);
    this.loading.set(true);
    this.auth
      .login({ email: this.email(), password: this.password() })
      .subscribe({
        next: () => {
          this.loading.set(false);
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.loading.set(false);
          try {
            const msg = err?.error?.message ?? err?.message ?? 'Error de autenticación';
            this.error.set(msg);
          } catch {
            this.error.set('Error de autenticación');
          }
        },
      });
  }
}
