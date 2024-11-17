import { Injectable } from '@angular/core';
import { Appointment } from '../modules/modules.module';
import { Observable, of } from 'rxjs';
import { ValidationErrors } from '@angular/forms';

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

  fechaNoPasada(date: Date): Observable<ValidationErrors | null> {
    const fechaActual = new Date();
    const fechaActualDia = new Date(fechaActual.getFullYear(),fechaActual.getMonth(),fechaActual.getDate());
    const fechaDadaDia = new Date(date.getFullYear(), date.getMonth(),date.getDate());
   
    if (fechaDadaDia < fechaActualDia) {
      return of({ checkDate: true }); // Retorna un error si la fecha es del pasado
    } else {
      return of(null); // Retorna null si la fecha es válida
    }
  }

}
