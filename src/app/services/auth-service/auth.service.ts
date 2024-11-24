import { Injectable } from '@angular/core';
import { Admin, Medic } from '../../modules/modules.module';
import { Observable, of } from 'rxjs';
import { MedicServiceService } from '../medic-service/medic-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private adminCredentials = {id : '' , password : ''};
  private adminLogInId = 'admin123';
  private adminLogInPassword = '1234';
  admin = false;
  private medicCredentials = {matricula: '', password : ''};
  private medicList: Medic[] = [];

  constructor(private medicService : MedicServiceService) {
    this.medicService.getAll().subscribe((medic : Medic[]) =>{
      this.medicList = medic;
    });
  }

  getAdmin()
  {
    return this.admin;
  }

  setAdminCredentials(admin : Admin)
  {
    this.adminCredentials.id = admin.adminId;
    this.adminCredentials.password = admin.password;
  }

  setMedicCredentials(medic : Medic)
  {
    this.medicCredentials.matricula = medic.matricula;
    this.medicCredentials.password = medic.password;
  }

  checkAdminCredentials() : Observable<Boolean>
  {
    if(this.adminCredentials.id === this.adminLogInId && this.adminCredentials.password === this.adminLogInPassword)
    {
      this.admin = true;
      return of (true);
    }else
    {
      return of (false);
    }
    
  }
  checkMedicCredentials(): Observable<boolean> {
    for (const element of this.medicList) {
      if (element.matricula === this.medicCredentials.matricula) {
        return of(element.password === this.medicCredentials.password);
      }
    }
    return of(false);
  }
}
