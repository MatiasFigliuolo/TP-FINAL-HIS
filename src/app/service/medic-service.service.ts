import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Medic } from '../modules/modules.module';

@Injectable({
  providedIn: 'root'
})
export class MedicServiceService {
  private apiUrl = 'http://localhost:3001/medicos';
  private medicListSubject = new Subject<Medic[]>();
  public medicList$ = this.medicListSubject.asObservable();

  constructor(private http: HttpClient) { }

  getAll(): Observable<Medic[]> {
    console.log("Llamando a la API de medicos...");
    return this.http.get<Medic[]>(this.apiUrl);
  }
  

  add(medic: Medic): Observable<Medic> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Medic>(this.apiUrl, medic, httpOptions);
  }

  updateMedicList(): void {
    this.getAll().subscribe((medics: Medic[]) => {
      this.medicListSubject.next(medics);
    });
  }

  deleteMedic(medic: Medic): Observable<Medic> {
    return this.http.delete<Medic>(`${this.apiUrl}/${medic.matricula}`);
  }

  updateMedic(medic: Medic): Observable<Medic> {
    const url = `${this.apiUrl}/${medic.matricula}`;
    return this.http.put<Medic>(url, medic);
  }



  /*private doctorList = new Array<Medic>();

  constructor() { }

  add(doctor: Medic): void {
    this.doctorList.push(doctor);
  }

  updateMedic(doctor: Medic): void {
    const index = this.doctorList.findIndex(m => m.matricula === doctor.matricula);
    if (index !== -1) {
      this.doctorList[index] = doctor;
    }
  }

  deleteMedic(matricula: string): void {
    this.doctorList = this.doctorList.filter(m => m.matricula !== matricula);
  }

  getAll(): Medic[] {
    return this.doctorList;
  }*/
}
