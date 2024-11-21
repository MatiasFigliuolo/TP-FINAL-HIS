import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Appointment } from '../../modules/modules.module';

@Injectable({
  providedIn: 'root'
})
export class AppointmentUpdatesService {

  private appointmentAddedSource = new Subject<Appointment>();
  appointmentAdded$ = this.appointmentAddedSource.asObservable();

  constructor() { }

  notifyAppointmentAdded(appointment: Appointment): void {
    this.appointmentAddedSource.next(appointment);
  }
}