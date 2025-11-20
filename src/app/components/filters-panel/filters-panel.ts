import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filters-panel',
  standalone: true,
  templateUrl: './filters-panel.html',
  styleUrls: ['./filters-panel.css']
})
export class FiltersPanelComponent {
  private state: Record<string, boolean> = {};
  @Output() filtersChange = new EventEmitter<Record<string, boolean>>();

  toggle(key: string, value: boolean) {
    this.state[key] = value;
    this.filtersChange.emit({ ...this.state });
  }
}
