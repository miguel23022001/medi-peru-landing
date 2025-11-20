import { Component, Input, ElementRef, ViewChild, AfterViewInit, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="map-shell">
      <div #mapContainer class="map-canvas"></div>
    </div>
  `,
  styles: [
    `:host{display:block}
    .map-shell{width:100%;border-radius:12px;overflow:hidden}
    .map-canvas{height:360px}
    `]
})
export class MapViewComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() query = '';
  @Input() filters: Record<string, boolean> | null = null;
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLDivElement>;

  private map?: L.Map;
  private markerLayer?: L.LayerGroup;

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.map && (changes['query'] || changes['filters'])) {
      this.updateMarkers();
    }
  }

  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }

  private initMap() {
    const container = this.mapContainer.nativeElement;
    this.map = L.map(container).setView([-12.0464, -77.0428], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.markerLayer = L.layerGroup().addTo(this.map);
    this.updateMarkers();
  }

  private updateMarkers() {
    if (!this.markerLayer) return;
    this.markerLayer.clearLayers();

    const items = this.markers;
    items.forEach((m, i) => {
      const lat = -12.0464 + ((i + 1) * 0.01);
      const lng = -77.0428 + ((i + 1) * 0.01);
      const circle = L.circle([lat, lng], {
        radius: 300,
        color: '#0ea5e9',
        fillColor: '#0ea5e9',
        fillOpacity: 0.8
      }).bindPopup(m.title);
      this.markerLayer!.addLayer(circle);
    });
  }

  get markers() {
    const base = 3 + (this.query ? Math.min(this.query.length, 5) : 0);
    const extra = this.filters ? Object.values(this.filters).filter(Boolean).length : 0;
    return new Array(base + extra).fill(0).map((_, i) => ({ id: i + 1, title: `Profesional ${i + 1}` }));
  }
}
