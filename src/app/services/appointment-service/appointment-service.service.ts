import { Injectable, OnInit } from '@angular/core';
import { Appointment } from '../../modules/modules.module';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
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
  
  // getAppointmentById(id: number): Observable<Appointment> {
  //   return this.getAll().pipe(
  //     map((appointments: Appointment[]) => 
  //       appointments.find(app => app.id === id) || new Appointment()
  //     )
  //   );
  // }
  getAppointmentById(id: number): Observable<Appointment> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Appointment>(url).pipe(
      tap(appointment => console.log('Datos del Appointment en el servicio:', appointment)),
      catchError(error => {
        console.error('Error al obtener el Appointment:', error);
        return of(new Appointment()); // Devuelve un Appointment vacío si hay un error
      })
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
  deleteAppointment(id: number): Observable<Appointment> {
    const url = `${this.apiUrl}/${id}`; // Usar id como identificador
    return this.getAppointmentById(id).pipe(
      switchMap((appointment: any) =>
        this.http.delete<Appointment>(url).pipe(
          tap(() => this.updateAppointmentList()),
          catchError((error) => {
            console.error('Error al eliminar el paciente:', error);
            // Devolver el appointment original en caso de error
            return of(appointment);
          })
        )
      ),
      catchError((error) => {
        console.error('Error al obtener el paciente:', error);
        // Devolver un observable vacío o algún valor manejable
        return throwError(() => new error(('No se pudo obtener el appointment')));
      })
    );
  }
  

  updateAppointmentList(): void {
    this.getAll().subscribe((appointment: Appointment[]) => {
      this.appointmentSubjectList.next(appointment); 
    });
  }
} 