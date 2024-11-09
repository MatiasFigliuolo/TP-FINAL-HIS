import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import { Patient } from '../modules/modules.module';

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
  
}


