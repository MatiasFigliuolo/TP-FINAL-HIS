import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { AppointmentServiceService } from '../services/appointment-service.service';
import { Appointment, AppointmentState, Medic, Patient } from '../modules/modules.module';
import { MedicServiceService } from '../service/medic-service.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {

  medicList: Array<Medic> = [];
  patientList: Array<Patient> = [];
  appointmentList: Array<Appointment> = [];
  availableHours: Array<Number>= [12,1,2,3,4,5,6,7,8,9];
  updatedHours: Array<Number> = [];

  calendarOptions : any = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
  };

  constructor(
    private medicService: MedicServiceService,
    private patientService: PatientService,
    private appointmentService: AppointmentServiceService
  ) { }

  ngOnInit(): void {
    /* this.medicList = this.medicService.getAll(); */
    this.patientService.getAll().subscribe((patients: Patient[]) => {
      this.patientList = patients;
    });
    this.appointmentList = this.appointmentService.getAll();

    this.appointmentForm.get('matricula')?.valueChanges.subscribe(medic => {
      this.updateHours();
      this.loadEventsForMedic(String(medic));
    });
    

    this.appointmentForm.get('date')?.valueChanges.subscribe(date => {
      this.updateHours();
    });


  }

  appointmentForm = new FormGroup({
    matricula: new FormControl('',Validators.required),
    dni: new FormControl('',Validators.required),
    date: new FormControl(new Date(),Validators.required),
    hour: new FormControl('',Validators.required)
  });
  
  onSubmit()
  {
    let appointment = new Appointment;
    appointment.State = AppointmentState.Confirm;
    appointment.creationDate = new Date();
    appointment.appointmentDate = this.appointmentForm.get('date')?.value || new Date();
    appointment.medicId = this.appointmentForm.get('matricula')?.value || '';
    appointment.patientDni = this.appointmentForm.get('dni')?.value || '';
    appointment.hour = Number(this.appointmentForm.get('hour')?.value);
    this.appointmentService.add(appointment);
    console.log(appointment);
    this.appointmentForm.reset();
  }

  updateHours(): void {
    const medicId = this.appointmentForm.get('matricula')?.value || '';
    const date = this.appointmentForm.get('date')?.value || new Date();
    this.hourFilter(medicId, date);
  }

  hourFilter(matricula: string, date: Date): void {

    this.updatedHours = [...this.availableHours];
    
    this.appointmentList.forEach(element => {
      if (element.medicId === matricula) {
       
        const elementDate = new Date(element.appointmentDate);
        const selectedDate = new Date(date);
        
        if (
          elementDate.getFullYear() === selectedDate.getFullYear() &&
          elementDate.getMonth() === selectedDate.getMonth() &&
          elementDate.getDate() === selectedDate.getDate()
        ) {
    
          this.updatedHours = this.updatedHours.filter(hour => hour !== element.hour);
        }
      }
    });
  }

  getEventsForMedic(medicoId: string): any[] {
   
    let medicAppointments = this.appointmentList.filter(appointment => medicoId === appointment.medicId);
    
    // Mapea cada cita a un formato que FullCalendar pueda entender
    return medicAppointments.map(appointment => ({
      title: appointment.State,       // Título del evento (ajusta esto según los datos en appointment)
      date: appointment.appointmentDate // Fecha del evento (asegúrate de que appointmentDate sea una cadena o una instancia de Date)
    }));
  }

  loadEventsForMedic(medicoId: string): void {
    const medicEvents = this.getEventsForMedic(medicoId);
    
    this.calendarOptions = {
      ...this.calendarOptions,
      events: medicEvents
    };
  }
  
  
}
