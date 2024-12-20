import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map, Observable,of,Subject, throwError } from 'rxjs';
import { Patient } from '../../modules/modules.module';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://localhost:3000/pacientes';
  private patientListSubject = new Subject<Patient[]>();
  public patientList$ = this.patientListSubject.asObservable();
  private patientSerch = new Patient(); 

  constructor(private http: HttpClient) { }

  getAll(): Observable<Patient[]> {   //devuelve un observable con la lista de pacientes 
    return this.http.get<Patient[]>(this.apiUrl);
  }

  add(patient: Patient): Observable<Patient> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Patient>(this.apiUrl, patient, httpOptions);
  }

  updatePatientList(): void {
    this.getAll().subscribe((patients: Patient[]) => {
      this.patientListSubject.next(patients); 
    });
  }

  getByDni(dni: Number): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}?dni=${dni}`).pipe(
      map(dni => {
        console.log('Respuesta de getByDni:', dni);  
        return dni.length > 0;  
      }),
      catchError(() => {
        return of(false);  
      })
    );
  }

  getNameByDni(dni: number): Observable<Patient> {
    return this.getAll().pipe(
      map((patient: Patient[]) => 
        patient.find(patient => patient.dni = dni) || new Patient()
      )
    );
  }

  updatePatient(patient: Patient): Observable<Patient> {
    const url = `${this.apiUrl}/${patient.id}`; // Comenzamos a usar id como identificador por problemas con el dni
    return this.http.put<Patient>(url, patient, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      tap(() => this.updatePatientList()),
      catchError((error) => {
        console.error('Error al actualizar el paciente:', error);
        return of(patient);
      })
    );
  }
  

  deletePatient(patient: Patient): Observable<Patient> {
    const url = `${this.apiUrl}/${patient.id}`; // Comenzamos a usar id como identificador por problemas con el dni
    return this.http.delete<Patient>(url).pipe(
      tap(() => this.updatePatientList()),
      catchError((error) => {
        console.error('Error al eliminar el paciente:', error);
        return of(patient);
      })
    );
  }
  

}


