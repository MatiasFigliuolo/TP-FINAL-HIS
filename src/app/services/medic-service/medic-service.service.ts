import { Injectable, OnInit } from '@angular/core';
import { Medic } from '../../modules/modules.module';
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
  private medicName = '';
  private medicSerch = new Medic();

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

  getNameByMatricula(matricula: string): Observable<Medic> {
    return this.getAll().pipe(
      map((medic: Medic[]) => 
        medic.find(medic => medic.matricula === matricula) || new Medic()
      )
    );
  }


  updateMedicList(): void {
    this.getAll().subscribe((medics: Medic[]) => {
      console.log('Emitting updated medic list updateMedicService:', medics);
      this.medicListSubject.next(medics);  // Emite la lista actualizada
    });
  }

  updateMedic(medic: Medic): Observable<Medic> {
    const url = `${this.apiUrl}/${medic.id}`;  // Asegúrate de que 'matricula' sea el identificador en el servidor
    return this.http.put<Medic>(url, medic, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      tap(() => this.updateMedicList()),  // Actualiza la lista tras la modificación
      catchError((error) => {
        console.error('Error al actualizar el médico:', error);
        return of(medic);  // Retorna el médico original en caso de error
      })
    );
  }
  
  deleteMedic(medic: Medic): Observable<Medic> {
    const url = `${this.apiUrl}/${medic.id}`;
    return this.http.delete<Medic>(url).pipe(
      tap(() => this.updateMedicList()),  // Actualiza la lista tras la eliminación
      catchError((error) => {
        console.error('Error al eliminar el médico:', error);
        return of(medic);  // Retorna el médico eliminado en caso de error
      })
    );
  }
  
}

