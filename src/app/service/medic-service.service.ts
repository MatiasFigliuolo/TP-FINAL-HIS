import { Injectable } from '@angular/core';
import { Medic } from '../modules/modules.module';

@Injectable({
  providedIn: 'root'
})


export class MedicServiceService {

  private doctorList = new Array<Medic>();
  constructor() { }



  add(doctor : Medic)
  {
    this.doctorList.push(doctor);
  }

  getAll()
  {
    return this.doctorList;
  }

}
