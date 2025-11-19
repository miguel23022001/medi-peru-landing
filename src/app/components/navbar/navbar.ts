import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class NavbarComponent {
  // simple client-side active state (works without router)
  selected = signal<'inicio' | 'servicios' | 'nosotros' | 'contacto'>('inicio');

  select(key: 'inicio' | 'servicios' | 'nosotros' | 'contacto') {
    this.selected.set(key);
  }

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
