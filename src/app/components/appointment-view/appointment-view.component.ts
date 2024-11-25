import { Component, OnInit } from '@angular/core';
import { Appointment, Attendance, Medic, Patient } from '../../modules/modules.module';
import { ActivatedRoute } from '@angular/router';
import { AppointmentServiceService } from '../../services/appointment-service/appointment-service.service';
import { MedicServiceService } from '../../services/medic-service/medic-service.service';
import { PatientService } from '../../services/patient-service/patient.service';
import { AttendanceService } from '../../services/attendance-service/attendance.service';

@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrl: './appointment-view.component.css'
})
export class AppointmentViewComponent implements OnInit {

  appointment = new Appointment();
  appointmentId = 0;
  selectedAppointment: Appointment | null = null;
  newAttendance: Attendance = new Attendance();
  report: string = ''; // Campo para el informe del médico


  constructor(private route : ActivatedRoute,
    private appointmentService: AppointmentServiceService,
    private attendanceService: AttendanceService
)
{}
  
  /*ngOnInit(): void
  {
    this.appointmentId = Number(this.route.snapshot.paramMap.get('appId'));

    this.appointmentService.getAppointmentById(this.appointmentId).subscribe((appointment) => {
      this.appointment = appointment;
      console.log(appointment);
    });

  }*/

    ngOnInit(): void {
      this.appointmentId = Number(this.route.snapshot.paramMap.get('appId'));
  
      this.appointmentService.getAppointmentById(this.appointmentId).subscribe((appointment) => {
        this.appointment = appointment;
        this.prefillAttendance();
      });
    }
  
    // Prellenar la atención con datos del turno seleccionado
    prefillAttendance(): void {
      this.newAttendance = {
        id: 0,
        appointmentId: this.appointment.id!,
        medicId: Number(this.appointment.medicId),
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
      });
    }


  uploadComment()
  {
  
  }

}
