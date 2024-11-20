import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Admin } from '../modules/modules.module';
import { AuthService } from '../services/auth-service/auth.service';
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

  onSubmitAdmin()
  {
    let admin = new Admin;
    admin.password = this.adminPassword?.value!;
    admin.adminId = this.adminId?.value!;
    this.authService.setAdminCredentials(admin);
    this.router.navigate(['/main-page']);
  }
}