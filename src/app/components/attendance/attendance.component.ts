import { Component, OnInit } from '@angular/core';
import { Appointment, Attendance } from '../../modules/modules.module';
import { AppointmentServiceService } from '../../services/appointment-service/appointment-service.service';
import { AttendanceService } from '../../services/attendance-service/attendance.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  appointments: Appointment[] = [];
  selectedAppointment: Appointment | null = null;
  newAttendance: Attendance = new Attendance();

  constructor(
    private appointmentService: AppointmentServiceService,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit(): void {
    this.appointmentService.getAll().subscribe((appointments) => {
      this.appointments = appointments;
    });
  }

  saveAttendance(): void {
    if (this.newAttendance && this.selectedAppointment) {
      this.attendanceService.add(this.newAttendance).subscribe(() => {
        console.log('Atención guardada con éxito');
        this.selectedAppointment = null; // Limpia la selección
      });
    }
  }
}
