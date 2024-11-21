import { Component, OnInit } from '@angular/core';
import { Appointment, Medic } from '../../modules/modules.module';
import { AppointmentServiceService } from '../../services/appointment-service/appointment-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medic-page',
  templateUrl: './medic-page.component.html',
  styleUrl: './medic-page.component.css'
})
export class MedicPageComponent implements OnInit {
  private appointmentList: Appointment[] = [];
  private medicMatricula = '';
  appointmentFilterList: Appointment[] = [];


  constructor(private appointmentService: AppointmentServiceService, private route: ActivatedRoute) {}
  
  
  ngOnInit(): void {

    this.medicMatricula = String(this.route.snapshot.paramMap.get('matricula'));

    this.appointmentService.getAll().subscribe((appointment: Appointment[]) => {
      this.appointmentList = appointment; 
    })
    console.log(this.appointmentList);
    this.appointmentFilterList = this.appointmentList.filter(appointment => appointment.medicId === this.medicMatricula);
    

  }
  
  formatHour(hour: any): string {
    const hourNumber = Number(hour);
    return `${hourNumber}:00`;
  }



}
