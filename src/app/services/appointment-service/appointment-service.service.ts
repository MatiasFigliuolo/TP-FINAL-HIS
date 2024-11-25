import { Injectable, OnInit } from '@angular/core';
import { Appointment } from '../../modules/modules.module';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { ValidationErrors } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentServiceService implements OnInit {
  private apiUrl = 'http://localhost:3002/appointments';
  private appointmentSubjectList = new BehaviorSubject<Appointment[]>([]);
  private appointmentList = new Array<Appointment>(); 
  private appointmentSerch = new Appointment();

  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    this.getAll().subscribe((appointment: Appointment[]) =>
      {
        this.appointmentList = appointment;
      }); 
   
  }
  
  getAppointmentById(id: number): Observable<Appointment> {
    return this.getAll().pipe(
      map((appointments: Appointment[]) => 
        appointments.find(app => app.id === id) || new Appointment()
      )
    );
  }
  
  getAll(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(this.apiUrl);
  }

  add(appointment: Appointment): Observable<Appointment> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Appointment>(this.apiUrl, appointment, httpOptions);
  }

  fechaNoPasada(date: Date): Observable<ValidationErrors | null> {
    const fechaActual = new Date();
    const fechaActualDia = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate());
    const fechaDadaDia = new Date(date.getFullYear(), date.getMonth(), date.getDate());

    if (fechaDadaDia < fechaActualDia) {
      return of({ checkDate: true }); // Error si la fecha es del pasado
    } else {
      return of(null); // Válido si la fecha es correcta
    }
  }

  updateAppointmentList(): void {
    this.getAll().subscribe((appointment: Appointment[]) => {
      console.log('Emitting updated medic list updateMedicService:', appointment);
      this.appointmentSubjectList.next(appointment);  // Emite la lista actualizada
    });
  }

  updateAppointment(appointment: Appointment): Observable<Appointment> {
    const url = `${this.apiUrl}/${appointment.id}`;  // Asegúrate de que 'matricula' sea el identificador en el servidor
    return this.http.put<Appointment>(url, appointment, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      tap(() => this.updateAppointmentList()),  // Actualiza la lista tras la modificación
      catchError((error) => {
        console.error('Error al actualizar el médico:', error);
        return of(appointment);  // Retorna el médico original en caso de error
      })
    );
  }
} 