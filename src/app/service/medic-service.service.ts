import { Injectable } from '@angular/core';
import { Doctor } from '../modules/modules.module';

@Injectable({
  providedIn: 'root'
})


export class MedicServiceService {

  private doctorList = new Array<Doctor>();
  constructor() { }



  add(doctor : Doctor)
  {
    this.doctorList.push(doctor);
  }

  getAll()
  {
    return this.doctorList;
  }

}
