export class Medic {
  matricula: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: number = 0;
  password: string = '';
}

export class Patient {
  dni: number = 0;
  firstName: string = '';
  lastName: string = '';
  birthDate: string = '';
  address: string = '';
  email: string = '';
  phone: number = 0;
  insurance: string = '';
}

export class Appointment
{
  creationDate: Date = new Date();
  patientDni: String = '';
  medicId: String = '';
  appointmentDate : Date = new Date();
  State: AppointmentState = AppointmentState.Pending;
}

export enum AppointmentState
{
  Confirm = 'Confirmado',
  Pending = 'Pendiente',
  Cancel = 'Cancelado',
  Done = 'Realizado'
}