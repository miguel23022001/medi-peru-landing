import { Component, signal } from '@angular/core';
import { SearchBarComponent } from './search-bar';
import { FiltersPanelComponent } from './filters-panel';
import { MapViewComponent } from './map-view';
import { ClinicsMapComponent } from '../clinics-map/clinics-map';
import { WhatsappFabComponent } from './whatsapp-fab';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchBarComponent, FiltersPanelComponent, ClinicsMapComponent, WhatsappFabComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent {
  query = signal('');
  filters = signal<Record<string, boolean> | null>(null);

  onSearch(q: string) {
    this.query.set(q);
  }

  onFiltersChange(f: Record<string, boolean>) {
    this.filters.set(f);
  }
}
