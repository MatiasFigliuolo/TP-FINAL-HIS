import { Component, inject, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient-service/patient.service';
import { AppointmentServiceService } from '../../services/appointment-service/appointment-service.service';
import { Appointment, AppointmentState, Medic, Patient } from '../../modules/modules.module';
import { MedicServiceService } from '../../services/medic-service/medic-service.service';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from '../../validators/custom-validators';

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {

  medicList: Array<Medic> = [];
  patientList: Array<Patient> = [];
  appointmentList: Array<Appointment> = [];
  availableHours: Array<Number> = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  updatedHours: Array<Number> = [];
  private patientNam = '';
  private medicNam = '';


  calendarOptions: any = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
  };

  constructor(
    private medicService: MedicServiceService,
    private patientService: PatientService,
    private appointmentService: AppointmentServiceService,
  ) { }

  ngOnInit(): void {
    this.medicService.getAll().subscribe((medics: Medic[]) => {
      this.medicList = medics;
    });
    this.patientService.getAll().subscribe((patients: Patient[]) => {
      this.patientList = patients;
    });

    this.appointmentForm.get('matricula')?.valueChanges.subscribe(medic => {
      this.refrescarLista();
      this.updateHours();
      this.loadEventsForMedic(String(medic));
      this.medicService.getNameByMatricula(this.matricula?.value!).subscribe((medic) => {
        this.medicNam = 'Dr. ' + medic.lastName;
      });
    });

    this.appointmentForm.get('date')?.valueChanges.subscribe(date => {
      this.refrescarLista();
      this.updateHours();
    });

    this.appointmentForm.get('dni')?.valueChanges.subscribe((dni) => {
      if (dni) {
        this.patientService.getNameByDni(Number(dni)).subscribe((patient) => {
          this.patientNam = patient?.lastName + ' '+ patient?.firstName;
        }, (error) => {
          console.error("Error al obtener el nombre del paciente", error);
          this.patientNam = '';
        });
      } else {
        this.patientNam = '';
      }
    });

    this.appointmentService.getAll().subscribe((appointment: Appointment[]) => {
      this.appointmentList = appointment;
    });

  }

  refrescarLista() {
    this.appointmentService.getAll().subscribe((appointment: Appointment[]) => {
      this.appointmentList = appointment;
    });
  }

  appointmentForm = new FormGroup({
    matricula: new FormControl('', [Validators.required]),
    dni: new FormControl('', [Validators.required]),
    date: new FormControl(new Date(), [Validators.required], [CustomValidators.checkDate(inject(AppointmentServiceService))]),
    hour: new FormControl('', [Validators.required])
  });


  get matricula() { return this.appointmentForm.get('matricula') };
  get dni() { return this.appointmentForm.get('dni') };
  get date() { return this.appointmentForm.get('date') };
  get hour() { return this.appointmentForm.get('hour') };
  get patientName() { return this.patientNam };
  get medicName() { return this.medicNam };

  onSubmit() {
    let appointment = new Appointment;
    appointment.State = AppointmentState.Confirm;
    appointment.creationDate = new Date();
    appointment.appointmentDate = this.date?.value!;
    appointment.patientName = this.patientNam;
    appointment.medicName = this.medicNam;
    appointment.medicId = this.matricula?.value!;
    appointment.patientDni = Number(this.dni?.value!);
    appointment.hour = Number(this.hour?.value!);
    this.appointmentService.add(appointment).subscribe({
      next: () => {

        this.appointmentForm.reset();
        swal("Turno agregado exitosamente!", '', "success");
      },
      error: (err: any) => {
        console.error('Error al agregar el Turno:', err);
      }
    });;
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
