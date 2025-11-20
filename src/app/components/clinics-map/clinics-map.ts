import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import * as L from 'leaflet';

type Clinic = {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  doctors: Array<{ name: string; specialty: string; phone: string }>;
};

@Component({
  selector: 'app-clinics-map',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './clinics-map.html',
  styleUrls: ['./clinics-map.css']
})
export class ClinicsMapComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapRef', { static: true }) mapRef!: ElementRef<HTMLDivElement>;

  clinics: Clinic[] = [];
  private map?: L.Map;
  private markersLayer?: L.LayerGroup;

  constructor(private http: HttpClient) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.loadClinics();
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
      const marker = L.circleMarker([c.lat, c.lng], {
        radius: 8,
        color: '#0ea5e9',
        fillColor: '#0ea5e9',
        fillOpacity: 0.9
      });

      const html = this.popupHtmlForClinic(c);
      marker.bindPopup(html, { maxWidth: 320 });
      marker.addTo(this.markersLayer!);
    });
  }

  private popupHtmlForClinic(c: Clinic) {
    const doctorsHtml = c.doctors.map(d => `<li><strong>${d.name}</strong> — ${d.specialty}<br/><small>${d.phone}</small></li>`).join('');
    return `
      <div class="clinic-popup">
        <h3>${c.name}</h3>
        <div class="addr">${c.address}</div>
        <div class="doctors"><strong>Médicos:</strong><ul>${doctorsHtml}</ul></div>
      </div>`;
  }

  // Método público para que la vista (o un listado) pueda centrar un consultorio y abrir su popup
  public focusClinic(clinicId: string) {
    const c = this.clinics.find(x => x.id === clinicId);
    if (!c || !this.map) return;
    this.map.setView([c.lat, c.lng], 14, { animate: true });
    // intentar abrir popup: buscar layer con esa lat/lng
    this.markersLayer?.eachLayer((layer: any) => {
      if (layer.getLatLng && layer.getLatLng().lat === c.lat && layer.getLatLng().lng === c.lng) {
        layer.openPopup();
      }
    });
  }
}
