import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Admin, Medic } from '../../modules/modules.module';
import { AuthService } from '../../services/auth-service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  isActive: boolean = false;

  constructor(private authService : AuthService, private router : Router){}

  activateContainer() {
    this.isActive = true;
  }

  deactivateContainer() {
    this.isActive = false;
  }

  adminLogInForm = new FormGroup(
  {
    adminId : new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  });

  get adminId() {return this.adminLogInForm.get('adminId')};
  get adminPassword() {return this.adminLogInForm.get('password')};

  medicLogInForm = new FormGroup({
    matricula: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required])
  })

  get matricula() {return this.medicLogInForm.get('matricula')}
  get medicPassword() {return this.medicLogInForm.get('password')}

  onSubmitAdmin()
  {
    let admin = new Admin;
    admin.password = this.adminPassword?.value!;
    admin.adminId = this.adminId?.value!;
    this.authService.setAdminCredentials(admin);
    this.router.navigate(['/main-page']);
    swal("! Inicio de sesion exitoso !",'',"success");
  }

  onSubmitMedic()
  {
    let medic = new Medic;
    medic.matricula = this.matricula?.value!;
    medic.password = this.medicPassword?.value!;
    this.authService.setMedicCredentials(medic);
    this.router.navigate(['/medic-page/'+ medic.matricula]);
    swal("! Inicio de sesion exitoso !",'',"success");
  }
}