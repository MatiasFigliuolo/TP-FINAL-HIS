import { Injectable } from '@angular/core';
import { Appointment } from '../modules/modules.module';

@Injectable({
  providedIn: 'root'
})
export class AppointmentServiceService {

  private appointmentList = new Array<Appointment>();

  constructor() { }

  add(appointment : Appointment)
  {
    this.appointmentList.push(appointment);
  }

  getAll() : Appointment[]
  {
    return this.appointmentList;
  }

}
