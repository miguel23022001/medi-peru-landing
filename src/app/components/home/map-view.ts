import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="map-shell">
      <div class="map-canvas">
        <div class="marker" *ngFor="let m of markers" [title]="m.title"></div>
        <div class="map-overlay">Mapa (mock) — resultados: {{ markers.length }}</div>
      </div>
    </div>
  `,
  styles: [
    `:host{display:block}
    .map-shell{width:100%;border-radius:12px;overflow:hidden}
    .map-canvas{height:320px;background:linear-gradient(180deg,#e6f7ff,#d6f0ff);position:relative}
    .map-overlay{position:absolute;left:1rem;top:1rem;background:rgba(255,255,255,0.9);padding:.5rem 0.75rem;border-radius:8px;font-weight:600}
    .marker{width:12px;height:12px;border-radius:50%;background:#0ea5e9;position:absolute;box-shadow:0 3px 8px rgba(14,165,233,0.25)}
    .marker:nth-child(1){left:20%;top:40%}
    .marker:nth-child(2){left:45%;top:30%}
    .marker:nth-child(3){left:60%;top:55%}
    .marker:nth-child(4){left:75%;top:20%}
    `]
})
export class MapViewComponent {
  @Input() query = '';
  @Input() filters: Record<string, boolean> | null = null;

  get markers() {
    // Mock: return variable number based on query length and filters
    const base = 3 + (this.query ? Math.min(this.query.length, 5) : 0);
    const extra = this.filters ? Object.values(this.filters).filter(Boolean).length : 0;
    return new Array(base + extra).fill(0).map((_, i) => ({ id: i + 1, title: `Profesional ${i + 1}` }));
  }
}
