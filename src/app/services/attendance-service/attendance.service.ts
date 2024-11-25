import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendance } from '../../modules/modules.module';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = 'http://localhost:3003/attendances';

  constructor(private http: HttpClient) {}

  // Obtener todas las atenciones
  getAll(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(this.apiUrl);
  }

  // Agregar una nueva atención
  add(attendance: Attendance): Observable<Attendance> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<Attendance>(this.apiUrl, attendance, httpOptions);
  }
}
