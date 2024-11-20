import { Component, inject, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { AppointmentServiceService } from '../services/appointment-service.service';
import { Appointment, AppointmentState, Medic, Patient } from '../modules/modules.module';
import { MedicServiceService } from '../service/medic-service.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../validators/custom-validators';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})

export class AddAppointmentComponent implements OnInit {
  medicList: Array<Medic> = [];
  patientList: Array<Patient> = [];
  appointmentList: Array<Appointment> = [];
  availableHours: Array<Number> = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  updatedHours: Array<Number> = [];

  calendarOptions: any = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
  };

  appointmentForm = new FormGroup({
    matricula: new FormControl('', [Validators.required]),
    dni: new FormControl('', [Validators.required]),
    date: new FormControl(new Date(), [Validators.required], [CustomValidators.checkDate(inject(AppointmentServiceService))]),
    hour: new FormControl('', [Validators.required])
  });

  constructor(
    private medicService: MedicServiceService,
    private patientService: PatientService,
    private appointmentService: AppointmentServiceService
  ) { }

  ngOnInit(): void {
    this.medicService.getAll().subscribe((medics: Medic[]) => {
      this.medicList = medics;
    });

    this.patientService.getAll().subscribe((patients: Patient[]) => {
      this.patientList = patients;
    });

    this.appointmentService.getAll().subscribe((appointments: Appointment[]) => {
      this.appointmentList = appointments;
    });

    this.appointmentForm.get('matricula')?.valueChanges.subscribe((medic) => {
      this.updateHours();
      this.loadEventsForMedic(String(medic));
    });

    this.appointmentForm.get('date')?.valueChanges.subscribe(() => {
      this.updateHours();
    });
  }


  get matricula() { return this.appointmentForm.get('matricula') }
  get dni() { return this.appointmentForm.get('dni') }
  get date() { return this.appointmentForm.get('date') }
  get hour() { return this.appointmentForm.get('hour') }

  onSubmit(): void {
    const appointment = new Appointment();
    appointment.State = AppointmentState.Confirm;
    appointment.creationDate = new Date();
    appointment.appointmentDate = this.date?.value!;
    appointment.medicId = this.matricula?.value!;
    appointment.patientDni = this.dni?.value!;
    appointment.hour = Number(this.hour?.value!);
  
    this.appointmentService.add(appointment).subscribe(
      (newAppointment) => {
        console.log('Appointment added:', newAppointment);
        this.appointmentList.push(newAppointment); // Actualiza la lista local con la nueva cita
        this.appointmentForm.reset();
        swal('Turno generado exitosamente!', '', 'success');
      },
      (error) => {
        console.error('Error adding appointment:', error);
      }
    );
  }

  updateHours(): void {
    const medicId = this.appointmentForm.get('matricula')?.value || '';
    const date = this.appointmentForm.get('date')?.value || new Date();
    this.hourFilter(medicId, date);
  }

  hourFilter(matricula: string, date: Date): void {

    this.updatedHours = [...this.availableHours];

    this.appointmentList.forEach(element => {
      if (element.medicId === matricula) {

        const elementDate = new Date(element.appointmentDate);
        const selectedDate = new Date(date);

        if (
          elementDate.getFullYear() === selectedDate.getFullYear() &&
          elementDate.getMonth() === selectedDate.getMonth() &&
          elementDate.getDate() === selectedDate.getDate()
        ) {

          this.updatedHours = this.updatedHours.filter(hour => hour !== element.hour);
        }
      }
    });
  }

  getEventsForMedic(medicoId: string): any[] {

    let medicAppointments = this.appointmentList.filter(appointment => medicoId === appointment.medicId);

    // Mapea cada cita a un formato que FullCalendar pueda entender
    return medicAppointments.map(appointment => ({
      title: appointment.State,       // Título del evento (ajusta esto según los datos en appointment)
      date: appointment.appointmentDate // Fecha del evento (asegúrate de que appointmentDate sea una cadena o una instancia de Date)
    }));
  }

  loadEventsForMedic(medicoId: string): void {
    const medicEvents = this.getEventsForMedic(medicoId);

    this.calendarOptions = {
      ...this.calendarOptions,
      events: medicEvents
    };
  }


}
