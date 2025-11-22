import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Clinic } from '../../models';

@Component({
  selector: 'app-clinic-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clinic-popup.html',
  styleUrls: ['./clinic-popup.css'],
})
export class ClinicPopupComponent {
  @Input() clinic?: Clinic;
}
