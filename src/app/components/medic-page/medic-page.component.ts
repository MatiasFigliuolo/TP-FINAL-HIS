import { Component, OnInit } from '@angular/core';
import { Appointment } from '../../modules/modules.module';
import { AppointmentServiceService } from '../../services/appointment-service/appointment-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medic-page',
  templateUrl: './medic-page.component.html',
  styleUrls: ['./medic-page.component.css'] // Corregido el nombre de la propiedad
})
export class MedicPageComponent implements OnInit {
  private appointmentList: Appointment[] = [];
  private medicMatricula = '';
  appointmentFilterList: Appointment[] = [];

  constructor(
    private appointmentService: AppointmentServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.medicMatricula = String(this.route.snapshot.paramMap.get('matricula'));

    // Obtener todas las citas y filtrar dentro del subscribe
    this.appointmentService.getAll().subscribe((appointments: Appointment[]) => {
      this.appointmentList = appointments; // Asignar las citas completas
      this.appointmentFilterList = this.appointmentList.filter(
        appointment => appointment.medicId === this.medicMatricula
      ); // Filtrar por matrícula del médico
    });
  }

  formatHour(hour: any): string {
    const hourNumber = Number(hour);
    return `${hourNumber}:00`;
  }
}
