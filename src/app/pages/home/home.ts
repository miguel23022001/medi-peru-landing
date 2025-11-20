import { Component, signal } from '@angular/core';
import { SearchBarComponent } from '../../components/search-bar/search-bar';
import { FiltersPanelComponent } from '../../components/filters-panel/filters-panel';
import { ClinicsMapComponent } from '../../components/clinics-map/clinics-map';
import { WhatsappFabComponent } from '../../components/whatsapp-fab/whatsapp-fab';

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