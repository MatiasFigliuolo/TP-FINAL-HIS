import { Injectable } from '@angular/core';
import { Patient } from '../modules/modules.module';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private patientList = new Array<Patient>();
  constructor() { }

  add(patient : Patient)
  {
    this.patientList.push(patient);
  }

  getAll()
  {
    return this.patientList;
  }
}

