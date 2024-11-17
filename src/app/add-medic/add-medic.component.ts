import { Component, inject, OnInit } from '@angular/core';
import { MedicServiceService } from '../service/medic-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Medic } from '../modules/modules.module';
import { CustomValidators } from '../validators/custom-validators';
import swal from 'sweetalert';


@Component({
  selector: 'app-add-medic',
  templateUrl: './add-medic.component.html',
  styleUrl: './add-medic.component.css'
})
export class AddMedicComponent implements OnInit {
  medicForm = new FormGroup ({
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    matricula: new FormControl('',[Validators.required],[CustomValidators.medicExist(inject(MedicServiceService))]),
    email: new FormControl('', [Validators.email]),
    phone: new FormControl(''),
    password: new FormControl('',[Validators.required])
  });

  constructor(private medicService : MedicServiceService) {}

  get firstName(){return this.medicForm.get('firstName')};
  get lastName(){return this.medicForm.get('lastName')};
  get matricula(){return this.medicForm.get('matricula')};
  get email(){return this.medicForm.get('email')};
  get phone(){return Number(this.medicForm.get('phone'))};
  get password(){return this.medicForm.get('password')};



  ngOnInit(): void {
  }

  onSumbit()
  {
    let medic = new Medic();
    medic.firstName = this.firstName?.value!;
    medic.lastName = this.lastName?.value!;
    medic.email = this.email?.value!;
    medic.matricula = this.matricula?.value!;
    medic.phone = this.phone;
    medic.password = this.password?.value!;

    this.medicService.add(medic).subscribe({
      next: (newMedic: Medic) => {
        console.log('Medico agregado:', newMedic);
        this.medicService.updateMedicList();
        this.medicForm.reset(); 
      },
      error: (err: any) => {
        console.error('Error al agregar el medico:', err);
      }
    });

    swal("Medico Agregado Exitosamente!",'',"success");
  }

}


