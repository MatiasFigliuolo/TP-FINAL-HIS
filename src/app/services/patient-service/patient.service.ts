import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable,of,Subject } from 'rxjs';
import { Patient } from '../../modules/modules.module';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://localhost:3000/pacientes';
  private patientListSubject = new Subject<Patient[]>();
  public patientList$ = this.patientListSubject.asObservable();

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
        console.log('Respuesta de getByDni:', dni);  // Log para verificar la respuesta
        return dni.length > 0;  // Si el array tiene al menos un médico con esa matrícula, retorna true
      }),
      catchError(() => {
        return of(false);  // Si ocurre un error, asumimos que no existe
      })
    );
  }

}


