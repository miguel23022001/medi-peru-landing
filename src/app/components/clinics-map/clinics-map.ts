import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, Input, OnChanges, SimpleChanges, createComponent, EnvironmentInjector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import * as L from 'leaflet';
import { Clinic } from '../../models';
import { ClinicPopupComponent } from '../clinic-popup/clinic-popup';

@Component({
  selector: 'app-clinics-map',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './clinics-map.html',
  styleUrls: ['./clinics-map.css']
})
export class ClinicsMapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapRef', { static: true }) mapRef!: ElementRef<HTMLDivElement>;
  @Input() clinics: Clinic[] = [];
  private map?: L.Map;
  private markersLayer?: L.LayerGroup;

  constructor(private http: HttpClient, private envInjector: EnvironmentInjector) {}

  ngAfterViewInit(): void {
    this.initMap();
    // Si no se pasaron `clinics` desde el padre, cargar desde el JSON local (backward compatibility)
    if (!this.clinics || this.clinics.length === 0) {
      this.loadClinics();
    } else {
      this.renderMarkers();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clinics'] && this.map) {
      this.renderMarkers();
    }
  }

  ngOnDestroy(): void {
    if (this.map) this.map.remove();
  }

  private initMap() {
    this.map = L.map(this.mapRef.nativeElement, { zoomControl: true }).setView([-9.189967, -75.015152], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.markersLayer = L.layerGroup().addTo(this.map);
  }

  private loadClinics() {
    this.http.get<Clinic[]>('assets/data/clinics.json').subscribe({
      next: (data) => {
        this.clinics = data;
        this.renderMarkers();
      },
      error: (err) => {
        console.error('Error cargando clinics.json', err);
      }
    });
  }

  private renderMarkers() {
    if (!this.markersLayer) return;
    this.markersLayer.clearLayers();
    this.clinics.forEach((c) => {
      const lat = c.location?.lat ?? (c as any).lat ?? null;
      const lng = c.location?.lng ?? (c as any).lng ?? null;
      if (lat === null || lng === null || Number.isNaN(Number(lat)) || Number.isNaN(Number(lng))) return;

      const marker = L.circleMarker([Number(lat), Number(lng)], {
        radius: 8,
        color: '#0ea5e9',
        fillColor: '#0ea5e9',
        fillOpacity: 0.9,
      });

      // Render Angular component for popup into a detached element and use it as popup content
      const container = document.createElement('div');
      const compRef = createComponent(ClinicPopupComponent, { hostElement: container, environmentInjector: this.envInjector });
      compRef.instance.clinic = c;
      compRef.changeDetectorRef.detectChanges();
      marker.bindPopup(container, { maxWidth: 320 });
      marker.addTo(this.markersLayer!);
    });
  }

  private popupHtmlForClinic(c: Clinic) {
    const doctors = c.doctors ?? [];
    const doctorsHtml = doctors
      .map((d) => `<li><strong>${d.name}</strong>${d.specialty ? ' — ' + d.specialty : ''}<br/><small>${d.phone ?? ''}</small></li>`)
      .join('');
    return `
      <div class="clinic-popup">
        <h3>${c.name}</h3>
        <div class="addr">${c.address ?? ''}</div>
        <div class="doctors"><strong>Médicos:</strong><ul>${doctorsHtml}</ul></div>
      </div>`;
  }

  // Método público para que la vista (o un listado) pueda centrar un consultorio y abrir su popup
  public focusClinic(clinicId: string) {
    const c = this.clinics.find((x) => x.id === clinicId);
    if (!c || !this.map) return;
    const lat = c.location?.lat ?? (c as any).lat ?? null;
    const lng = c.location?.lng ?? (c as any).lng ?? null;
    if (lat === null || lng === null) return;
    this.map.setView([Number(lat), Number(lng)], 14, { animate: true });
    // intentar abrir popup: buscar layer con esa lat/lng
    this.markersLayer?.eachLayer((layer: any) => {
      if (
        layer.getLatLng &&
        Math.abs(layer.getLatLng().lat - Number(lat)) < 1e-6 &&
        Math.abs(layer.getLatLng().lng - Number(lng)) < 1e-6
      ) {
        layer.openPopup();
      }
    });
  }
}
