import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp-fab',
  standalone: true,
  templateUrl: './whatsapp-fab.html',
  styleUrls: ['./whatsapp-fab.css'],
})
export class WhatsappFabComponent {
  // Puedes parametrizar el número si lo deseas en el futuro
  readonly waUrl = 'https://wa.me/51954045686?text=Hola,%20quiero%20consultar%20sobre%20servicios%20médicos';
}
