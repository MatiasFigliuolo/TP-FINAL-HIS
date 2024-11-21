import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient-service/patient.service';
import { Patient } from '../../modules/modules.module';

@Component({
  selector: 'app-list-patient',
  templateUrl: './list-patient.component.html',
  styleUrl: './list-patient.component.css'
})

export class ListPatientComponent implements OnInit {
  patientList: Array<Patient>= [];
  selectedPatient: Patient | null = null;
  filteredPatients: Patient[] = [];  
  searchTerm: string = '';

  constructor(private patientService : PatientService){};
  
  ngOnInit(): void {
    this.patientService.getAll().subscribe((patients: Patient[]) => {
      this.patientList = patients;
      this.filteredPatients = patients; 
    });

    // Suscribirse al observable para recibir actualizaciones de la lista
    this.patientService.patientList$.subscribe((updatedPatients: Patient[]) => {
      this.patientList = updatedPatients;
      this.filteredPatients = updatedPatients; // Actualizar la lista filtrada si es necesario
    });
  }

  selectPatient(patient: Patient): void {
    this.selectedPatient = patient;
  }

  onSearchEnter() {
    this.filterPatients(); 
  }

  filterPatients(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredPatients = this.patientList.filter(patient =>
      patient.firstName.toLowerCase().includes(term) ||
      patient.lastName.toLowerCase().includes(term) ||
      patient.dni.toString().includes(term)
    );
  }

  updatePatient(): void {
    if (this.selectedPatient) {
      this.patientService.updatePatient(this.selectedPatient).subscribe(() => {
        console.log('Paciente actualizado con éxito');
        this.selectedPatient = null;  
      });
    }
  }

  deletePatient(): void {
    if (this.selectedPatient) {
      this.patientService.deletePatient(this.selectedPatient).subscribe(() => {
        console.log('Paciente eliminado con éxito');
        this.selectedPatient = null;  
      });
    }
  }

  closeDetails() {
    this.selectedPatient = null;
  }
}


