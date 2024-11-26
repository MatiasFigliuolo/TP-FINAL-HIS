import { Component } from '@angular/core';
import { Attendance } from '../../modules/modules.module';
import { AttendanceService } from '../../services/attendance-service/attendance.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-attendance-view',
  templateUrl: './attendance-view.component.html',
  styleUrl: './attendance-view.component.css'
})
export class AttendanceViewComponent {
  AttendanceList: Array<Attendance> = [];
  SelectedAttendance: Attendance | null = null;
  filteredAttendances: Attendance[] = [];
  searchTerm: string = '';
  AttendanceSerivce: any;
  medicMatricula = '';

  constructor(private attendanceService: AttendanceService,
  private route: ActivatedRoute) { }

  ngOnInit() {
    this.attendanceService.attendanceList$.subscribe((updatedAttendances: Attendance[]) => {
      this.AttendanceList = updatedAttendances;
      this.filteredAttendances = [...updatedAttendances];
      this.medicMatricula = String(this.route.snapshot.paramMap.get('matricula'));
      this.listFilter();
    });
  
    this.attendanceService.updateAttendanceList();
  }

  selectAttendance(Attendance: Attendance): void {
    this.SelectedAttendance = Attendance;
  }
  listFilter()
  {
    this.attendanceService.getAll().subscribe((attendances: Attendance[]) => {
      this.filteredAttendances = attendances.filter(attendance => attendance.medicId === this.medicMatricula);
  });
}
  onSearchEnter() {
    this.filterAttendances();
  }

  filterAttendances(): void {
    const term = this.searchTerm.toLowerCase();
    if (term === '') {
      this.filteredAttendances = [...this.AttendanceList];
    } else {
      this.filteredAttendances = this.AttendanceList.filter(Attendance =>
        Attendance.patientDni.toString().toLowerCase().includes(term)
      );
    }
  }

  updateAttendences(): void {
    if (this.SelectedAttendance) {
      this.attendanceService.update(this.SelectedAttendance).subscribe(() => {
        console.log('Atencion actualizada con éxito');
        this.SelectedAttendance = null;  
      });
    }
  }

  deleteAttendance(): void {
    Swal.fire({
      title: "Estás seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar"
    }).then((result: any) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminado!",
          text: "La atencion fue eliminada.",
          icon: "success"
        });
        if (this.SelectedAttendance) {
          this.attendanceService.delete(this.SelectedAttendance).subscribe(() => {
            console.log('Atencion eliminada con éxito');
            this.SelectedAttendance = null;  
          });
        }
      }
    });
  }


  closeDetails() {
    this.SelectedAttendance = null;
  }
}

