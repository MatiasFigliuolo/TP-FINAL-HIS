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
  patient: Patient = new Patient();
  medicId: number = 0;
  appointmentDate : Date = new Date();
  Estado: AppointmentState = AppointmentState.Pendiente;
}

export enum AppointmentState
{
  Confirmado = 'Confirmado',
  Pendiente = 'Pendiente',
  Cancelado = 'Cancelado',
  Realizado = 'Realizado'
}