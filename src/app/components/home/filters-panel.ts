import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filters-panel',
  standalone: true,
  template: `
    <div class="filters">
      <label><input type="checkbox" (change)="toggle('teleconsulta', $event.target.checked)" /> Teleconsulta</label>
      <label><input type="checkbox" (change)="toggle('presencial', $event.target.checked)" /> Presencial</label>
      <label><input type="checkbox" (change)="toggle('24h', $event.target.checked)" /> 24/7</label>
    </div>
  `,
  styles: [
    `:host{display:block}
    .filters{display:flex;gap:0.75rem;align-items:center}
    .filters label{font-size:.95rem;color:#374151}
    input[type="checkbox"]{margin-right:.35rem}
    `
  ]
})
export class FiltersPanelComponent {
  private state: Record<string, boolean> = {};
  @Output() filtersChange = new EventEmitter<Record<string, boolean>>();

  toggle(key: string, value: boolean) {
    this.state[key] = value;
    this.filtersChange.emit({ ...this.state });
  }
}
