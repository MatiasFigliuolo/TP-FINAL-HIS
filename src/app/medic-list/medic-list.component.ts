import { Component, OnInit } from '@angular/core';
import { Medic } from '../modules/modules.module';

@Component({
  selector: 'app-medic-list',
  templateUrl: './medic-list.component.html',
  styleUrls: ['./medic-list.component.css']
})
export class MedicListComponent implements OnInit {
  
  medicList: Array<Medic> = [
   
  ];
  selectedMedic: Medic | null = null;

  ngOnInit(): void {console.log(this.medicList);}

  selectMedic(medic: Medic): void {
    // Crear una copia del médico seleccionado para evitar modificar el original directamente
    this.selectedMedic = { ...medic };
  }

  updateMedic(): void {
    if (this.selectedMedic) {
      // Encuentra el índice del médico en el arreglo
      const index = this.medicList.findIndex(m => m.matricula === this.selectedMedic?.matricula);
      if (index !== -1) {
        // Actualiza los datos del médico en el arreglo
        this.medicList[index] = { ...this.selectedMedic };
      }
      // Limpia el formulario después de la actualización
      this.selectedMedic = null;
    }
  }

  deleteMedic(): void {
    if (this.selectedMedic) {
      // Filtra el arreglo para eliminar el médico seleccionado
      this.medicList = this.medicList.filter(m => m.matricula !== this.selectedMedic?.matricula);
      // Limpia el formulario después de la eliminación
      this.selectedMedic = null;
    }
  }
}
