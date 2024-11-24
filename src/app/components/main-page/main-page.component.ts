import { Component, OnInit } from '@angular/core';
import { Appointment, Medic, Patient } from '../../modules/modules.module';
import { AppointmentServiceService } from '../../services/appointment-service/appointment-service.service';
import { MedicServiceService } from '../../services/medic-service/medic-service.service';
import { PatientService} from '../../services/patient-service/patient.service';
import { forkJoin } from 'rxjs';
import { AppointmentUpdatesService } from '../../services/appointment-update-service/appointment-update.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  appointmentList: Array<Appointment> = [];
  filteredAppointments: Appointment[] = [];
  patientList: Patient[] = [];
  medicList: Medic[] = [];
  searchTerm: string = '';

  constructor(
    private appointmentService: AppointmentServiceService,
    private medicService: MedicServiceService,
    private patientService: PatientService,
    private appointmentUpdateService : AppointmentUpdatesService
  ) {}

  ngOnInit() {
    forkJoin([
      this.patientService.getAll(),
      this.medicService.getAll(),
      this.appointmentService.getAll()
    ]).subscribe(([patients, medics, appointments]) => {
      this.patientList = patients;
      this.medicList = medics;
      this.appointmentList = appointments.sort((a, b) => {
        const dateA = new Date(a.appointmentDate);
        const dateB = new Date(b.appointmentDate);

        if (dateA.getTime() !== dateB.getTime()) {
          return dateA.getTime() - dateB.getTime();
        }

        const hourA = +a.hour;
        const hourB = +b.hour;

        return hourA - hourB;
      });

      this.filteredAppointments = [...this.appointmentList];
    });

    this.appointmentUpdateService.appointmentAdded$.subscribe((newAppointment) => {
      this.appointmentList.push(newAppointment);  
      this.filterAppointments();  
    });
  }

  filterAppointments(): void {
    const term = this.searchTerm ? this.searchTerm.toLowerCase().trim() : '';

    if (term === '') {
      this.filteredAppointments = [...this.appointmentList];
    } else {
      this.filteredAppointments = this.appointmentList.filter(appointment =>
        appointment.patientDni.toString().toLowerCase().includes(term) ||
        appointment.medicId.toString().toLowerCase().includes(term)
      );
    }
  }

  onSearchEnter() {
    this.filterAppointments();
  }

  formatHour(hour: any): string {
    const hourNumber = Number(hour);
    return `${hourNumber}:00`;
  }

  formatMedicId(medicId: String): String {
    if (!medicId.startsWith('M')) {
      return 'M' + medicId;  
    }
    return medicId;  
  }
}
