import { Component, OnInit } from '@angular/core';
import { MedicServiceService } from '../service/medic-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Doctor } from '../modules/modules.module';

@Component({
  selector: 'app-add-medic',
  templateUrl: './add-medic.component.html',
  styleUrl: './add-medic.component.css'
})
export class AddMedicComponent implements OnInit {

  medicForm = new FormGroup ({
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    matricula: new FormControl('',[Validators.required]),
    email: new FormControl(''),
    phone: new FormControl(''),
    password: new FormControl('',[Validators.required])
  });
  constructor(private medicService : MedicServiceService) {}


  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }



  onSumbit()
  {
    let medic = new Doctor();
    medic.firstName = this.medicForm.get('firstName')?.value || '';
    medic.lastName = this.medicForm.get('lastName')?.value || '';
    medic.email = this.medicForm.get('email')?.value || '';
    medic.matricula = this.medicForm.get('matricula')?.value || '';
    medic.phone = Number(this.medicForm.get('phone')?.value) || 0;
    medic.password = this.medicForm.get('password')?.value || '';

    this.medicService.add(medic);

  }


}
