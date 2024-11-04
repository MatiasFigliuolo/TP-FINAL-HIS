import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { Patient } from '../modules/modules.module';

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrl: './list-patient.component.css'
})

export class ListPatientComponent implements OnInit {
  patientList: Array<Patient>= [];
  selectedPatient: Patient | null = null;

  constructor(private patientService : PatientService){};
  
  ngOnInit(): void {
    this.patientList= this.patientService.getAll();
  }

  selectPatient(patient: Patient): void {
    this.selectedPatient = patient;
  }
}
