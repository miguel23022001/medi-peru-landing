import { Component, signal, ViewChild } from '@angular/core';
import { SearchBarComponent } from '../../components/search-bar/search-bar';
import { FiltersPanelComponent } from '../../components/filters-panel/filters-panel';
import { ClinicsMapComponent } from '../../components/clinics-map/clinics-map';
import { ClinicListComponent } from '../../components/clinic-list/clinic-list';
import { WhatsappFabComponent } from '../../components/whatsapp-fab/whatsapp-fab';
import { ClinicsService } from '../../services/clinics.service';
import { Clinic } from '../../models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchBarComponent, FiltersPanelComponent, ClinicsMapComponent, ClinicListComponent, WhatsappFabComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class HomeComponent {
  query = signal('');
  filters = signal<Record<string, boolean> | null>(null);
  clinics = signal<Clinic[] | null>(null);
  loading = signal(false);
  error = signal<any | null>(null);

  constructor(private clinicsService: ClinicsService) {
    this.loadClinics();
  }

  @ViewChild('clinicsMap') private clinicsMapRef?: ClinicsMapComponent;

  

  onSearch(q: string) {
    this.query.set(q);
  }

  onFiltersChange(f: Record<string, boolean>) {
    this.filters.set(f);
  }

  private loadClinics() {
    this.loading.set(true);
    // Carga el JSON local de ejemplo. Ajustar ruta si tu servidor lo sirve distinto.
    this.clinicsService.getAll().subscribe({
      next: (data) => {
        // Normalizar/asegurar tipos mínimos (ej. location lat/lng numéricos)
        const normalized: Clinic[] = (data || []).map((c) => ({
          ...c,
          location: c.location
            ? { lat: Number((c.location as any).lat), lng: Number((c.location as any).lng) }
            : undefined,
        }));

        this.clinics.set(normalized);
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set(err);
        this.loading.set(false);
        // para depuración
        // console.error('Error cargando clinics.json', err);
      },
    });
  }

  onClinicSelect(id: string) {
    this.clinicsMapRef?.focusClinic(id);
  }
}