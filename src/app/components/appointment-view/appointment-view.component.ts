import { Component, OnInit } from '@angular/core';
import { Appointment, Attendance } from '../../modules/modules.module';
import { ActivatedRoute } from '@angular/router';
import { AppointmentServiceService } from '../../services/appointment-service/appointment-service.service';
import { AttendanceService } from '../../services/attendance-service/attendance.service';

@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.css'] // Corregido el nombre
})
export class AppointmentViewComponent implements OnInit {

  appointment = new Appointment();
  appointmentId = 0;
  appointmentDate: string = ''; // Cambiado a string para formateo
  newAttendance: Attendance = new Attendance();
  report: string = ''; // Campo para el informe del médico

  constructor(
    private route: ActivatedRoute,
    private appointmentService: AppointmentServiceService,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit(): void {
    this.appointmentId = Number(this.route.snapshot.paramMap.get('appId'));

    this.appointmentService.getAppointmentById(this.appointmentId).subscribe((appointment) => {
      this.appointment = appointment;
      this.prefillAttendance();

      // Validar y formatear la fecha del turno
      if (appointment.appointmentDate) {
        this.appointmentDate = this.formatDate(appointment.appointmentDate);
      } else {
        console.error('Fecha inválida en el turno:', appointment.appointmentDate);
      }
    });
  }

  // Método para formatear la fecha en formato DD/MM/YYYY
  formatDate(dateInput: string | Date): string {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      console.error('Fecha inválida:', dateInput);
      return 'Fecha inválida';
    }

    const day = date.getDate().toString().padStart(2, '0'); // Asegura dos dígitos
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mes (0-based)
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  // Prellenar la atención con datos del turno seleccionado
  prefillAttendance(): void {
    this.newAttendance = {
      id: 0,
      appointmentId: this.appointment.id!,
      medicId: this.appointment.medicId || '',
      medicName: this.appointment.medicName || '',
      patientDni: this.appointment.patientDni,
      patientName: this.appointment.patientName || '',
      date: this.appointment.appointmentDate,
      hour: this.appointment.hour,
      report: ''
    };
  }

  // Guardar la atención
  saveAttendance(): void {
    this.newAttendance.report = this.report; // Asigna el informe al campo correspondiente

    this.attendanceService.add(this.newAttendance).subscribe(() => {
      console.log('Atención guardada con éxito');
    }, error => {
      console.error('Error al guardar la atención:', error);
    });
  }
}
