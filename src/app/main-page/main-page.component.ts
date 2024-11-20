import { Component, OnInit } from '@angular/core';
import { Appointment, Patient } from '../modules/modules.module';
import { AppointmentServiceService } from '../services/appointment-service/appointment-service.service';
import { MedicServiceService } from '../services/medic-service/medic-service.service';
import { PatientService } from '../services/patient-service/patient.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent implements OnInit {
  appointmentList: Array<Appointment> = [];
  filteredAppointments: Appointment[] = [];
  searchTerm: string = '';

  constructor(
    private appointmentService: AppointmentServiceService,
    private medicService : MedicServiceService, 
    private patientService : PatientService
  ) {}

  ngOnInit() { 
    this.appointmentService.getAll().subscribe((appointments: Appointment[]) => 
      { this.appointmentList = appointments.sort((a, b) => { 
        const dateA = new Date(a.appointmentDate); 
        const dateB = new Date(b.appointmentDate);
        
        // Ordenar primero por fecha 
        if (dateA.getTime() !== dateB.getTime()) { 
          return dateA.getTime() - dateB.getTime(); } 
          
          // Si las fechas son iguales, ordenar por hora 
          const hourA = +a.hour; 
          const hourB = +b.hour; 
          
          return hourA - hourB; }); 
          
          this.filteredAppointments = [...this.appointmentList]; 
        }); 
  }
  

  filterAppointments(): void { 
    const term = this.searchTerm ? this.searchTerm.toLowerCase() : ''; 
    
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
}
  
