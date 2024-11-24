import { Component, OnInit } from '@angular/core';
import { Medic } from '../../modules/modules.module';
import { MedicServiceService } from '../../services/medic-service/medic-service.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-medic-list',
  templateUrl: './medic-list.component.html',
  styleUrls: ['./medic-list.component.css']
})
export class MedicListComponent implements OnInit {
  medicList: Array<Medic> = [];
  selectedMedic: Medic | null = null;
  filteredMedics: Medic[] = [];
  searchTerm: string = '';

  constructor(private medicService: MedicServiceService) { }

  ngOnInit(): void {
    this.medicService.getAll().subscribe((medics: Medic[]) => {
      this.medicList = medics;
      this.filteredMedics = [...medics];  
      this.filterMedics();  
    });

    this.medicService.medicList$.subscribe((updatedMedics: Medic[]) => {
      console.log('Updated medics received ngonInit:', updatedMedics);
      this.medicList = updatedMedics;
      this.filteredMedics = updatedMedics;
    });

    this.medicService.updateMedicList();
  }

  selectMedic(medic: Medic): void {
    this.selectedMedic = medic;
  }

  onSearchEnter() {
    this.filterMedics();
  }

  filterMedics(): void {
    const term = this.searchTerm.toLowerCase();
    if (term === '') {
      this.filteredMedics = [...this.medicList];  
    } else {
      this.filteredMedics = this.medicList.filter(medic =>
        medic.firstName.toLowerCase().includes(term) ||
        medic.lastName.toLowerCase().includes(term) ||
        medic.matricula.toString().includes(term)
      );
    }
  }

  updateMedic(): void {
    if (this.selectedMedic) {
      this.medicService.updateMedic(this.selectedMedic).subscribe(() => {
        console.log('Médico actualizado con éxito');
        this.selectedMedic = null;  // Limpia el formulario después de actualizar
      });
    }
  }
  
  deleteMedic(): void {
      Swal.fire({
        title: "Estás seguro?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
             title: "Eliminado!",
            text: "El paciente fue eliminado.",
            icon: "success"
          });
          if (this.selectedMedic){
            this.medicService.deleteMedic(this.selectedMedic).subscribe(() => {
              console.log('Médico eliminado con éxito');
              this.selectedMedic = null;  // Limpia el formulario después de eliminar
           });      
          }
        }
      });
    }
  

  closeDetails() {
    this.selectedMedic = null;
  }
}
