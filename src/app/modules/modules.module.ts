export class Medic {
  id: String | undefined;
  matricula: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: number = 0;
  password: string = '';
}
export class Attendance
{
  id: number | undefined;
  medicId: String = "";
  medicName: String = "";
  patientDni: number = 0;
  patientName: String = "";
  appointmentId: number = 0;
  date: Date = new Date();
  hour: Number = 0;
  report: string = '';
}

export class Patient {
  id: number | undefined;
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
  id: number | undefined;
  creationDate: Date = new Date();
  patientDni: number = 0;
  medicId: String = '';
  appointmentDate : Date = new Date();
  State: AppointmentState = AppointmentState.Pending;
  hour: Number = 0;
  patientName?: string;  
  medicName?: string;
}
export enum AppointmentState
{
  Confirm = 'Confirmado',
  Pending = 'Pendiente',
  Cancel = 'Cancelado',
  Done = 'Realizado'
}

export class Admin
{
  adminId: string = '';
  password: string = '';
}