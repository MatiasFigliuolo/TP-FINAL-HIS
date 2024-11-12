import { Component, OnInit } from '@angular/core';
import { Medic } from '../modules/modules.module';
import { MedicServiceService } from '../service/medic-service.service';

@Component({
  selector: 'app-medic-list',
  templateUrl: './medic-list.component.html',
  styleUrls: ['./medic-list.component.css']
})
export class MedicListComponent implements OnInit{
  medicList: Array<Medic> = [];
  selectedMedic: Medic | null = null;
  filteredMedics: Medic[] = [];  
  searchTerm: string = '';

  constructor(private medicService : MedicServiceService){}
  
  ngOnInit(): void {
    this.medicList =this.medicService.getAll();
  }

  selectMedic(medic: Medic): void {
    this.selectedMedic = medic;
  }

  onSearchEnter() {
    this.filterMedics(); 
  }

  filterMedics(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredMedics = this.medicList.filter(medic =>
      medic.firstName.toLowerCase().includes(term) ||
      medic.lastName.toLowerCase().includes(term) ||
      medic.matricula.toString().includes(term)
    );
  }

  updateMedic(): void {
    if (this.selectedMedic) {
      const index = this.medicList.findIndex(m => m.matricula === this.selectedMedic?.matricula);
      if (index !== -1) {
        this.medicList[index] = { ...this.selectedMedic };
      }
      this.selectedMedic = null;
    }
  }

  deleteMedic(): void {
    if (this.selectedMedic) {
      this.medicList = this.medicList.filter(m => m.matricula !== this.selectedMedic?.matricula);
      this.selectedMedic = null;
    }
  }
}

