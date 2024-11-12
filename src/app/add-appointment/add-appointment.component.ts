import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { Medic, Patient } from '../modules/modules.module';
import { MedicServiceService } from '../service/medic-service.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import {MatDatepickerModule} from '@angular/material/datepicker';






@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {
  medicList: Array<Medic> = [];
  patientList: Array<Patient> = [];

  calendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
  };


  constructor(
    private medicService: MedicServiceService,
    private patientService: PatientService
  ) { }

  ngOnInit(): void {
    this.medicList = this.medicService.getAll();
    this.patientService.getAll().subscribe((patients: Patient[]) => {
      this.patientList = patients;
    });

  }
  // Configuración del calendario

}
