import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form class="search-bar" (submit)="$event.preventDefault(); onSearch()">
      <input type="text" placeholder="Busca por especialidad, doctor o distrito" [(ngModel)]="query" name="q" />
      <button class="btn" type="submit">Buscar</button>
    </form>
  `,
  styles: [
    `
    :host{display:block}
    .search-bar{display:flex;gap:.5rem;align-items:center}
    .search-bar input{flex:1;padding:.6rem;border-radius:8px;border:1px solid rgba(15,23,42,0.08)}
    .search-bar .btn{background:linear-gradient(90deg,#10b981,#06b6d4);color:#fff;border:none;padding:.6rem 1rem;border-radius:8px}
    `
  ]
})
export class SearchBarComponent {
  query = '';
  @Output() search = new EventEmitter<string>();

  onSearch() {
    this.search.emit(this.query);
  }
}
