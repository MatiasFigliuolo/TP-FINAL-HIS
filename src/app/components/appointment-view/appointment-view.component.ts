import { Component, OnInit } from '@angular/core';
import { Appointment, Medic, Patient } from '../../modules/modules.module';
import { ActivatedRoute } from '@angular/router';
import { AppointmentServiceService } from '../../services/appointment-service/appointment-service.service';
import { MedicServiceService } from '../../services/medic-service/medic-service.service';
import { PatientService } from '../../services/patient-service/patient.service';

@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrl: './appointment-view.component.css'
})
export class AppointmentViewComponent implements OnInit {

  appointment = new Appointment();
  appointmentId = 0;

  constructor(private route : ActivatedRoute,
    private appointmentService: AppointmentServiceService,
)
{}

  ngOnInit(): void
  {
    this.appointmentId = Number(this.route.snapshot.paramMap.get('appId'));

    this.appointmentService.getAppointmentById(this.appointmentId).subscribe((appointment) => {
      this.appointment = appointment;
      console.log(appointment);
    });

  }

  uploadComment()
  {
  
  }

}
