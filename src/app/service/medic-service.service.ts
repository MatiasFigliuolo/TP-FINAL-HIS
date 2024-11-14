import { Injectable, OnInit } from '@angular/core';
import { Medic } from '../modules/modules.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,Subject, BehaviorSubject } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators'; // Importa los operadores
import { of } from 'rxjs'; // Importa 'of' para retornar un observable con valor predeterminado

@Injectable({
  providedIn: 'root'
})
export class MedicServiceService implements OnInit {
  private apiUrl = 'http://localhost:3001/medicos';
  private medicListSubject = new BehaviorSubject<Medic[]>([]);
  medicList$ = this.medicListSubject.asObservable();

  private medicList = new Array<Medic>();

  constructor(private http: HttpClient) { }
  
  ngOnInit(): void {
    this.getAll().subscribe((medics: Medic[]) => {
      this.medicList = medics;
    });
  }

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

  getByMatricula(matricula: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}?matricula=${matricula}`).pipe(
      map(medics => {
        console.log('Respuesta de getByMatricula:', medics);  // Log para verificar la respuesta
        return medics.length > 0;  // Si el array tiene al menos un médico con esa matrícula, retorna true
      }),
      catchError(() => {
        return of(false);  // Si ocurre un error, asumimos que no existe
      })
    );
  }

  updateMedicList(): void {
    this.getAll().subscribe((medics: Medic[]) => {
      console.log('Emitting updated medic list updateMedicService:', medics);
      this.medicListSubject.next(medics);  // Emite la lista actualizada
    });
  }
}

