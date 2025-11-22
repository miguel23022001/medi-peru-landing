import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Clinic } from '../../models';

@Component({
  selector: 'app-clinic-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clinic-list.html',
  styleUrls: ['./clinic-list.css'],
})
export class ClinicListComponent {
  @Input() clinics: Clinic[] = [];
  @Output() selectClinic = new EventEmitter<string>();

  onSelect(id: string) {
    this.selectClinic.emit(id);
  }
}
