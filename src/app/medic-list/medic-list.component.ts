import { Component, OnInit } from '@angular/core';
import { Doctor } from '../modules/modules.module';
import { MedicServiceService } from '../service/medic-service.service';

@Component({
  selector: 'app-medic-list',
  templateUrl: './medic-list.component.html',
  styleUrl: './medic-list.component.css'
})
export class MedicListComponent implements OnInit{
  
  medicList: Array<Doctor> = [];

  constructor(private medicService : MedicServiceService){}
  
  ngOnInit(): void {
    this.medicList =this.medicService.getAll()
  }

}
