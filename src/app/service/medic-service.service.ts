import { Injectable } from '@angular/core';
import { Medic } from '../modules/modules.module';

@Injectable({
  providedIn: 'root'
})
export class MedicServiceService {
  private doctorList = new Array<Medic>();

  constructor() { }

  add(doctor: Medic): void {
    this.doctorList.push(doctor);
  }

  updateMedic(doctor: Medic): void {
    const index = this.doctorList.findIndex(m => m.matricula === doctor.matricula);
    if (index !== -1) {
      this.doctorList[index] = doctor;
    }
  }

  deleteMedic(matricula: string): void {
    this.doctorList = this.doctorList.filter(m => m.matricula !== matricula);
  }

  getAll(): Medic[] {
    return this.doctorList;
  }
}