import { Component } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patient } from '../modules/modules.module';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrl: './add-patient.component.css'
})
export class AddPatientComponent {
  patientForm = new FormGroup ({
    dni: new FormControl('',[Validators.required]),
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    birthDate : new FormControl('', [Validators.required]),
    address: new FormControl(''),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('')
  });

  constructor(private patientService : PatientService) {}

  onSumbit()
  {
    let patient = new Patient();
    patient.dni = Number(this.patientForm.get('dni')?.value) || 0;
    patient.firstName = this.patientForm.get('firstName')?.value || '';
    patient.lastName = this.patientForm.get('lastName')?.value || '';
    patient.birthDate = this.patientForm.get('birthDate')?.value || '';
    patient.address = this.patientForm.get('address')?.value || '';
    patient.email = this.patientForm.get('emil')?.value || '';
    patient.phone = Number(this.patientForm.get('phone')?.value) || 0;

    this.patientService.add(patient);

  }
}
