import { Component, inject } from '@angular/core';
import { PatientService } from '../services/patient-service/patient.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Patient } from '../modules/modules.module';
import { CustomValidators } from '../validators/custom-validators';

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.css']
})
export class AddPatientComponent {
  patientForm = new FormGroup({
    dni: new FormControl('', [Validators.required, CustomValidators.dniLenght()],[CustomValidators.dniExist(inject(PatientService))]),
    firstName: new FormControl('', [Validators.required]), 
    lastName: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    address: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]), 
    phone: new FormControl(''),
    insurance: new FormControl('')
  });

  constructor(private patientService: PatientService) {}

  get dni() {return this.patientForm.get('dni')}
  get firstName() {return this.patientForm.get('firstName')}
  get lastName() {return this.patientForm.get('lastName')}
  get birthDate() {return this.patientForm.get('birthDate')}
  get address() {return this.patientForm.get('address')}
  get email() {return this.patientForm.get('email')}
  get phone() {return Number(this.patientForm.get('phone'))}
  get insurance() {return this.patientForm.get('insurance')}

  onSubmit() {
    let patient = new Patient();
    patient.dni = Number(this.dni);
    patient.firstName = this.firstName?.value!;
    patient.lastName = this.lastName?.value!;
    patient.birthDate = this.birthDate?.value!;
    patient.address = this.birthDate?.value!;
    patient.email = this.email?.value!; 
    patient.phone = this.phone;
    patient.insurance = this.insurance?.value!;

    this.patientService.add(patient).subscribe({
      next: (newPatient: Patient) => {
        console.log('Paciente agregado:', newPatient);
        this.patientService.updatePatientList();
        this.patientForm.reset();
        swal("Paciente agregado exitosamente!",'',"success");
      },
      error: (err: any) => {
        console.error('Error al agregar el paciente:', err);
      }
    });

    
  }
}
