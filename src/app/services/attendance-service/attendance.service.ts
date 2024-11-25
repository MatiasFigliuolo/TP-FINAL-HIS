import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, Observable, of, Subject } from 'rxjs';
import { Attendance } from '../../modules/modules.module';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = 'http://localhost:3003/attendances';
  private attendanceListSubject = new Subject<Attendance[]>();
  public attendanceList$ = this.attendanceListSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Obtener todas las atenciones
  getAll(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(this.apiUrl).pipe(
      catchError(this.handleError<Attendance[]>('getAll', []))
    );
  }

  // Agregar una nueva atención
  add(attendance: Attendance): Observable<Attendance> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post<Attendance>(this.apiUrl, attendance, httpOptions).pipe(
      tap(() => this.updateAttendanceList()),
      catchError(this.handleError<Attendance>('add'))
    );
  }

  // Actualizar una atención
  update(attendance: Attendance): Observable<Attendance> {
    const url = `${this.apiUrl}/${attendance.id}`;
    return this.http.put<Attendance>(url, attendance, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      tap(() => this.updateAttendanceList()),
      catchError(this.handleError<Attendance>('update'))
    );
  }

  // Eliminar una atención
  delete(attendance: Attendance): Observable<Attendance> {
    const url = `${this.apiUrl}/${attendance.id}`;
    return this.http.delete<Attendance>(url).pipe(
      tap(() => this.updateAttendanceList()),
      catchError(this.handleError<Attendance>('delete'))
    );
  }

  // Actualizar la lista de atenciones
  updateAttendanceList(): void {
    this.getAll().subscribe((attendances: Attendance[]) => {
      this.attendanceListSubject.next(attendances);
    });
  }

  // Manejo de errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
