import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { Medic, Patient } from '../modules/modules.module';
import { MedicServiceService } from '../service/medic-service.service';
import { CalendarEvent } from 'angular-calendar';


@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrl: './add-appointment.component.css'
})
export class AddAppointmentComponent implements OnInit  {
  medicList : Array<Medic> = [];
  patientList : Array<Patient> = [];


  constructor(private medicService : MedicServiceService, private patientService: PatientService){}

  ngOnInit(): void {
    this.medicList = this.medicService.getAll()
    this.patientService.getAll().subscribe((patients: Patient[]) => {
      this.patientList = patients;
    });
  }

  viewDate: Date = new Date(); // Fecha de visualización inicial

  // Lista de eventos en el calendario
  events: CalendarEvent[] = [
    {
      start: new Date(), // Fecha de inicio
      end: new Date(), // Fecha de fin (opcional)
      title: 'Evento de prueba', // Título del evento
      color: { // Color del evento
        primary: '#1e90ff',
        secondary: '#D1E8FF'
      },
      allDay: true // Si el evento ocupa todo el día
    }
  ];


  handleEvent(action: string, event: CalendarEvent): void {
    console.log('Evento seleccionado:', action, event);
  }
}
