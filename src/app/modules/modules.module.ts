export class Medic {
  id: number | undefined;
  matricula: string = '';
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  phone: number = 0;
  password: string = '';
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

export class Attendance {
  id: number = 0;
  report: string = '';
  creationDate: Date = new Date();
  patientDni: number = 0;
  medicId: string = '';
  appointmentDate: Date = new Date();
  State: string = 'Pending'; // Asegúrate de tener un estado para la atención
  hour: number = 0;
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