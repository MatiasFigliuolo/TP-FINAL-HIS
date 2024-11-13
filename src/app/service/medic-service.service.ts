import { Injectable } from '@angular/core';
import { Medic } from '../modules/modules.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,Subject, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators'; // Importa los operadores
import { of } from 'rxjs'; // Importa 'of' para retornar un observable con valor predeterminado

@Injectable({
  providedIn: 'root'
})
export class MedicServiceService {
  private apiUrl = 'http://localhost:3001/medicos';
  private medicListSubject = new BehaviorSubject<Medic[]>([]);
  medicList$ = this.medicListSubject.asObservable();

  private doctorList = new Array<Medic>();

  constructor(private http: HttpClient) { }

  getAll(): Observable<Medic[]>{
    return this.http.get<Medic[]>(this.apiUrl);
  }
  
  add(medic: Medic): Observable<Medic>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Medic>(this.apiUrl, medic, httpOptions);
  }

  updateMedicList(): void {
    this.getAll().subscribe((medics: Medic[]) => {
      console.log('Emitting updated medic list updateMedicService:', medics);
      this.medicListSubject.next(medics);  // Emite la lista actualizada
    });
  }
}

