import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { AppointmentServiceService } from '../services/appointment-service.service';
import { Appointment, AppointmentState, Medic, Patient } from '../modules/modules.module';
import { MedicServiceService } from '../service/medic-service.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {

  medicList: Array<Medic> = [];
  patientList: Array<Patient> = [];
  appointmentList: Array<Appointment> = [];
  abilableHour: Array<Number> = []

  calendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
  };

  constructor(
    private medicService: MedicServiceService,
    private patientService: PatientService,
    private appointmentService: AppointmentServiceService
  ) { }

  ngOnInit(): void {
    this.medicList = this.medicService.getAll();
    this.patientService.getAll().subscribe((patients: Patient[]) => {
      this.patientList = patients;
    });
    this.appointmentList = this.appointmentService.getAll();
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
  }

  hourFilter(matricula : String, date: Date)
  {
   this.appointmentList.forEach(element => 
    {
      if(element.medicId === matricula)
      {
        if(element.appointmentDate === date)
        {
          
        }
      }
    
   });
  }


}
